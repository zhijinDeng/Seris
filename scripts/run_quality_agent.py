from __future__ import annotations

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_events():
    with (ROOT / "data" / "factory_events.csv").open(encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def load_cases():
    return json.loads((ROOT / "data" / "quality_cases.json").read_text(encoding="utf-8"))


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
        score = sum(1 for ch in hay if ch in text)
        if score > best_score:
            best = case
            best_score = score
    return best


def build_result(event, case, risk):
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
        "evidence_chain": evidence,
        "actions": case["actions"],
        "feishu_record": {
            "事件ID": event["event_id"],
            "风险等级": risk,
            "设备": event["equipment"],
            "工位": event["station"],
            "影响范围": event["vin_scope"],
            "根因假设": case["root_cause"],
            "任务状态": "处置中",
        },
    }


def main():
    events = load_events()
    cases = load_cases()
    print("知质·灵巡质量风险主动管控运行结果\n")
    for event in events:
        risk = risk_score(event)
        case = retrieve_case(event, cases)
        result = build_result(event, case, risk)
        print("=" * 72)
        print(f"事件ID：{result['event_id']} | 风险等级：{result['risk']}")
        print(f"根因假设：{result['root_cause']}")
        print("证据链：")
        for item in result["evidence_chain"]:
            print(f"- {item}")
        print("处置动作：")
        for index, action in enumerate(result["actions"], 1):
            print(f"{index}. {action}")
        print("飞书记录字段：")
        for key, value in result["feishu_record"].items():
            print(f"- {key}: {value}")


if __name__ == "__main__":
    main()
