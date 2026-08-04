from __future__ import annotations

import csv
import json
import argparse
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_events():
    with (ROOT / "data" / "factory_events.csv").open(encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def load_cases():
    return json.loads((ROOT / "data" / "quality_cases.json").read_text(encoding="utf-8"))


def load_assurance_profiles():
    payload = json.loads((ROOT / "data" / "decision_assurance.json").read_text(encoding="utf-8"))
    return payload["profiles"], payload


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


def retrieve_case(event, cases):
    text = "".join([event["station"], event["equipment"], event["parameter"], event["alarm"], event["quality_risk"]])
    best = None
    best_score = -1
    for case in cases:
        hay = case["scene"] + case["symptom"] + case["root_cause"]
        terms = [case["scene"], case["symptom"], case["root_cause"]]
        score = sum(6 for term in terms if term in text or any(part in text for part in term.replace("/", "或").split("或")))
        score += sum(1 for ch in set(hay) if ch in text)
        if score > best_score:
            best = case
            best_score = score
    return best


def build_result(event, case, risk, profile, assurance_contract):
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
            "lead_minutes": profile["lead_minutes"],
            "measurement_note": assurance_contract["measurement_note"],
        },
        "top_hypotheses": profile["top_hypotheses"],
        "causal_guardrails": [
            {"check": check, "status": "通过" if index != 3 else "待现场反证"}
            for index, check in enumerate(assurance_contract["causal_guardrails"])
        ],
        "deterministic_close_gate": [
            {"check": check, "status": "待完成"}
            for check in assurance_contract["deterministic_close_gate"]
        ],
        "evidence_chain": evidence,
        "actions": case["actions"],
        "feishu_record": {
            "事件ID": event["event_id"],
            "风险等级": risk,
            "设备": event["equipment"],
            "工位": event["station"],
            "影响范围": event["vin_scope"],
            "根因假设": case["root_cause"],
            "前置量": f"{profile['lead_minutes']}分钟（仿真）",
            "检测共识": profile["detector_consensus"],
            "反证动作": profile["top_hypotheses"][0]["falsification"],
            "任务状态": "处置中",
        },
    }


def main():
    parser = argparse.ArgumentParser(description="运行质量风险主动管控数字员工仿真")
    parser.add_argument("--event", help="只运行指定事件ID")
    parser.add_argument("--json", action="store_true", help="输出结构化JSON")
    args = parser.parse_args()
    events = load_events()
    cases = load_cases()
    profiles, assurance_contract = load_assurance_profiles()
    if args.event:
        events = [event for event in events if event["event_id"] == args.event]
        if not events:
            raise SystemExit(f"未找到事件：{args.event}")
    results = []
    for event in events:
        risk = risk_score(event)
        case = retrieve_case(event, cases)
        profile = profiles[event["event_id"]]
        results.append(build_result(event, case, risk, profile, assurance_contract))
    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return
    print("知质·灵巡质量风险主动管控运行结果\n")
    for result in results:
        print("=" * 72)
        print(f"事件ID：{result['event_id']} | 风险等级：{result['risk']}")
        detection = result["active_detection"]
        print(f"主动发现：{detection['weak_signal']} | 多引擎共识 {detection['detector_consensus']} | 前置 {detection['lead_minutes']} 分钟（仿真）")
        print("Top-3根因与反证动作：")
        for hypothesis in result["top_hypotheses"]:
            print(f"- H{hypothesis['rank']} {hypothesis['confidence']:.0%} {hypothesis['cause']}；反证：{hypothesis['falsification']}")
        print("证据链：")
        for item in result["evidence_chain"]:
            print(f"- {item}")
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
