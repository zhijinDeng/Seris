from __future__ import annotations

import csv
import json
import argparse
import hashlib
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


EVENT_REQUIRED_FIELDS = {
    "event_id", "event_time", "ingest_time", "source_system", "source_event_id",
    "sequence_no", "quality_code", "schema_version", "asset_id", "station_id",
    "tag_id", "calibration_id", "calibration_valid_until", "object_binding", "line",
    "station", "equipment", "parameter", "value", "unit", "lower", "upper", "alarm",
    "quality_risk", "vin_scope",
}
ALLOWED_UNITS = {"N·m", "kA", "℃"}


def validate_event(event: dict, seen_keys: set[tuple[str, str]]) -> dict:
    missing = sorted(EVENT_REQUIRED_FIELDS - set(event))
    if missing or any(not event.get(field) for field in EVENT_REQUIRED_FIELDS):
        raise ValueError(f"{event.get('event_id', 'UNKNOWN')} 数据契约缺字段: {', '.join(missing) or '存在空值'}")
    if event["schema_version"] != "2.1":
        raise ValueError(f"{event['event_id']} 不支持的数据契约版本: {event['schema_version']}")
    source_key = (event["source_system"], event["source_event_id"])
    if source_key in seen_keys:
        raise ValueError(f"{event['event_id']} 重复源事件: {source_key}")
    seen_keys.add(source_key)
    event_time = datetime.fromisoformat(event["event_time"])
    ingest_time = datetime.fromisoformat(event["ingest_time"])
    calibration_until = datetime.fromisoformat(event["calibration_valid_until"])
    if (ingest_time - event_time).total_seconds() > 30:
        raise ValueError(f"{event['event_id']} 事件水位超过30秒")
    if calibration_until <= event_time:
        raise ValueError(f"{event['event_id']} 量具/设备校准已失效")
    if event["unit"] not in ALLOWED_UNITS:
        raise ValueError(f"{event['event_id']} 单位未进入白名单: {event['unit']}")
    if float(event["lower"]) >= float(event["upper"]):
        raise ValueError(f"{event['event_id']} 工艺窗口上下限无效")
    if event["quality_code"] != "GOOD":
        raise ValueError(f"{event['event_id']} 进入QUARANTINED分支: {event['quality_code']}")
    event["raw_sample_hash"] = hashlib.sha256(
        "|".join(event[field] for field in sorted(EVENT_REQUIRED_FIELDS)).encode("utf-8")
    ).hexdigest()
    return event


def load_events():
    with (ROOT / "data" / "factory_events.csv").open(encoding="utf-8-sig") as f:
        events = list(csv.DictReader(f))
    seen_keys: set[tuple[str, str]] = set()
    return [validate_event(event, seen_keys) for event in events]


def load_cases():
    return json.loads((ROOT / "data" / "quality_cases.json").read_text(encoding="utf-8"))


def load_graph():
    return json.loads((ROOT / "data" / "quality_graph.json").read_text(encoding="utf-8"))


def load_assurance_profiles():
    payload = json.loads((ROOT / "data" / "decision_assurance.json").read_text(encoding="utf-8"))
    return payload["profiles"], payload


def _minutes_between(start: str, end: str) -> int:
    start_time = datetime.strptime(start, "%H:%M")
    end_time = datetime.strptime(end, "%H:%M")
    return int((end_time - start_time).total_seconds() // 60)


def analyze_signal(profile: dict, parameters: dict) -> dict:
    signal = profile["signal"]
    mean = float(signal["baseline_mean"])
    std = float(signal["baseline_std"])
    ewma = mean
    upper_cusum = 0.0
    lower_cusum = 0.0
    first_weak = None
    actionable = None
    trace = []
    for time, raw_value, relation in signal["points"]:
        value = float(raw_value)
        ewma = parameters["ewma_lambda"] * value + (1 - parameters["ewma_lambda"]) * ewma
        k = parameters["cusum_k_sigma"] * std
        upper_cusum = max(0.0, upper_cusum + value - mean - k)
        lower_cusum = min(0.0, lower_cusum + value - mean + k)
        ewma_hit = abs(ewma - mean) >= parameters["ewma_sigma"] * std
        cusum_hit = max(upper_cusum, abs(lower_cusum)) >= parameters["cusum_h_sigma"] * std
        if first_weak is None and (ewma_hit or cusum_hit):
            first_weak = time
        if actionable is None and relation and (ewma_hit or cusum_hit):
            actionable = time
        trace.append({
            "time": time,
            "value": value,
            "relation_hit": bool(relation),
            "ewma": round(ewma, 4),
            "ewma_hit": ewma_hit,
            "cusum_positive": round(upper_cusum, 4),
            "cusum_negative": round(lower_cusum, 4),
            "cusum_hit": cusum_hit,
        })
    actionable = actionable or trace[-1]["time"]
    downstream = signal["downstream_time"]
    return {
        "first_weak_time": first_weak or trace[0]["time"],
        "actionable_time": actionable,
        "downstream_time": downstream,
        "lead_minutes": _minutes_between(actionable, downstream),
        "trace": trace,
    }


def apply_intervention(profile: dict, intervention_id: str | None) -> dict | None:
    if not intervention_id:
        return None
    intervention = next((item for item in profile.get("interventions", []) if item["id"] == intervention_id), None)
    if intervention is None:
        available = ", ".join(item["id"] for item in profile.get("interventions", []))
        raise SystemExit(f"未知干预动作 {intervention_id}，可选值：{available}")
    return intervention


def risk_score(event):
    value = float(event["value"])
    lower = float(event["lower"])
    upper = float(event["upper"])
    outside = value < lower or value > upper
    repeated = any(token in event["alarm"] for token in ["连续", "持续", "漂移", "波动"])
    critical = any(token in event["quality_risk"] + event["parameter"] for token in ["预紧力", "强度", "缩孔", "尺寸", "焊点", "热输入"])
    if outside and repeated and critical:
        return "P1"
    if outside:
        return "P2"
    return "P3"


def retrieve_case(event, cases, graph):
    nodes = {node["id"]: node for node in graph["nodes"]}
    adjacency: dict[str, list[dict]] = {}
    for edge in graph["edges"]:
        adjacency.setdefault(edge["source"], []).append(edge)
    start = f"event:{event['event_id']}"
    if start not in nodes:
        raise ValueError(f"知识图谱缺少事件节点: {start}")
    queue = [(start, 0)]
    visited = {start}
    trace = []
    matched_case_id = None
    while queue:
        source, depth = queue.pop(0)
        if depth >= 4:
            continue
        for edge in adjacency.get(source, []):
            target = edge["target"]
            target_node = nodes[target]
            trace.append({
                "source": nodes[source]["label"],
                "relation": edge["relation"],
                "target": target_node["label"],
                "source_ref": target_node["source_ref"],
            })
            if edge["relation"] == "matchedCase":
                matched_case_id = target.split(":", 1)[1]
            if target not in visited:
                visited.add(target)
                queue.append((target, depth + 1))
    case = next((item for item in cases if item["case_id"] == matched_case_id), None)
    if case is None:
        raise ValueError(f"事件 {event['event_id']} 未检索到受约束案例")
    return case, trace


def build_result(event, case, graph_trace, risk, profile, assurance_contract, intervention_id=None, mode="shadow"):
    detection = analyze_signal(profile, assurance_contract["detector_parameters"])
    intervention = apply_intervention(profile, intervention_id)
    hypotheses = [
        {
            **hypothesis,
            "hypothesis_id": f"H{hypothesis['rank']}",
            "original_rank": hypothesis["rank"],
            "posterior": intervention["posterior"][index] if intervention else hypothesis["confidence"],
        }
        for index, hypothesis in enumerate(profile["top_hypotheses"])
    ]
    hypotheses.sort(key=lambda item: item["posterior"], reverse=True)
    for rank, hypothesis in enumerate(hypotheses, 1):
        hypothesis["rank"] = rank
    evidence = [
        f"{event['parameter']}={event['value']}{event['unit']}，工艺窗口为{event['lower']}-{event['upper']}{event['unit']}",
        f"异常位置：{event['line']} / {event['station']} / {event['equipment']}",
        f"影响范围：{event['vin_scope']}",
        f"匹配案例：{case['case_id']}，根因为{case['root_cause']}",
    ] + case["evidence"]
    return {
        "event_id": event["event_id"],
        "risk": risk,
        "root_cause": case["root_cause"],
        "active_detection": {
            "weak_signal": profile["weak_signal"],
            "detectors": profile["detectors"],
            "detector_consensus": profile["detector_consensus"],
            "first_weak_time": detection["first_weak_time"],
            "actionable_time": detection["actionable_time"],
            "downstream_time": detection["downstream_time"],
            "lead_minutes": detection["lead_minutes"],
            "measurement_note": assurance_contract["measurement_note"],
            "trace": detection["trace"],
        },
        "top_hypotheses": hypotheses,
        "intervention": intervention,
        "causal_guardrails": [
            {"check": check, "status": "通过" if index != 3 or intervention else "待现场反证"}
            for index, check in enumerate(assurance_contract["causal_guardrails"])
        ],
        "deterministic_close_gate": [
            {"check": check, "status": "待完成"}
            for check in assurance_contract["deterministic_close_gate"]
        ],
        "evidence_chain": evidence,
        "graph_retrieval": {
            "mode": "bounded_relation_path",
            "knowledge_version": "KG-17.4",
            "query_trace": graph_trace,
            "source_fragments": sorted({step["source_ref"] for step in graph_trace}),
        },
        "actions": case["actions"],
        "feishu_record": {
            "事件ID": event["event_id"],
            "风险等级": risk,
            "设备": event["equipment"],
            "工位": event["station"],
            "影响范围": event["vin_scope"],
            "根因假设": case["root_cause"],
            "前置量": f"{detection['lead_minutes']}分钟（脱敏仿真计算）",
            "弱信号时刻": detection["first_weak_time"],
            "可行动时刻": detection["actionable_time"],
            "下游理论显性时刻": detection["downstream_time"],
            "检测共识": profile["detector_consensus"],
            "反证动作": profile["top_hypotheses"][0]["falsification"],
            "干预结果": intervention["result"] if intervention else "待执行",
            "运行模式": mode,
            "原始样本哈希": event["raw_sample_hash"],
            "任务状态": "处置中",
        },
        "governance": {
            "mode": mode,
            "mode_contract": assurance_contract["operating_modes"][mode],
            "versions": assurance_contract["governance_versions"],
            "fail_safe": assurance_contract["fail_safe"],
        },
    }


def main():
    parser = argparse.ArgumentParser(description="运行质量风险主动管控数字员工仿真")
    parser.add_argument("--event", help="只运行指定事件ID")
    parser.add_argument("--json", action="store_true", help="输出结构化JSON")
    parser.add_argument("--intervention", help="执行指定反事实干预并更新Top-3后验")
    parser.add_argument("--mode", choices=["shadow", "collaborative", "controlled"], default="shadow", help="运行权限模式")
    args = parser.parse_args()
    events = load_events()
    cases = load_cases()
    graph = load_graph()
    profiles, assurance_contract = load_assurance_profiles()
    if args.event:
        events = [event for event in events if event["event_id"] == args.event]
        if not events:
            raise SystemExit(f"未找到事件：{args.event}")
    results = []
    for event in events:
        risk = risk_score(event)
        case, graph_trace = retrieve_case(event, cases, graph)
        profile = profiles[event["event_id"]]
        results.append(build_result(event, case, graph_trace, risk, profile, assurance_contract, args.intervention, args.mode))
    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return
    print("知质·灵巡质量风险主动管控运行结果\n")
    for result in results:
        print("=" * 72)
        print(f"事件ID：{result['event_id']} | 风险等级：{result['risk']}")
        detection = result["active_detection"]
        print(f"主动发现：{detection['weak_signal']} | 弱信号 {detection['first_weak_time']} | 可行动 {detection['actionable_time']} | 前置 {detection['lead_minutes']} 分钟（仿真计算）")
        print("Top-3根因与反证动作：")
        for hypothesis in result["top_hypotheses"]:
            print(f"- {hypothesis['hypothesis_id']} | Rank {hypothesis['rank']} | {hypothesis['posterior']:.0%} {hypothesis['cause']}；反证：{hypothesis['falsification']}")
        if result["intervention"]:
            print(f"干预结果：{result['intervention']['label']}；{result['intervention']['result']}")
        print("证据链：")
        for item in result["evidence_chain"]:
            print(f"- {item}")
        print("关系图检索轨迹：")
        for step in result["graph_retrieval"]["query_trace"]:
            print(f"- {step['source']} --{step['relation']}--> {step['target']} [{step['source_ref']}]")
        print("处置动作：")
        for index, action in enumerate(result["actions"], 1):
            print(f"{index}. {action}")
        print("因果护栏：")
        for check in result["causal_guardrails"]:
            print(f"- [{check['status']}] {check['check']}")
        print("确定性关闭门：")
        for check in result["deterministic_close_gate"]:
            print(f"- [{check['status']}] {check['check']}")
        print("飞书记录字段：")
        for key, value in result["feishu_record"].items():
            print(f"- {key}: {value}")


if __name__ == "__main__":
    main()
