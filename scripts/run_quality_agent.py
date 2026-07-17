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


def score_event(event):
    value = float(event["value"])
    lower = float(event["lower"])
    upper = float(event["upper"])
    if value < lower:
        distance = (lower - value) / max(lower, 1)
    elif value > upper:
        distance = (value - upper) / max(upper, 1)
    else:
        distance = 0
    repeated = "连续" in event["alarm"] or "持续" in event["alarm"] or "漂移" in event["alarm"]
    critical_quality = any(token in event["quality_risk"] for token in ["强度不足", "预紧力不足", "附着力风险"])
    if distance >= 0.05 or repeated and critical_quality:
        return "P1"
    if distance > 0:
        return "P2"
    return "P3"


def retrieve_case(event, cases):
    text = event["station"] + event["parameter"] + event["quality_risk"]
    best = None
    best_score = -1
    for case in cases:
        score = sum(1 for token in case["scene"] + case["symptom"] if token in text)
        if score > best_score:
            best = case
            best_score = score
    return best


def build_task(event, case, risk):
    evidence = [
        f"{event['parameter']}={event['value']}{event['unit']}，工艺窗口为{event['lower']}-{event['upper']}{event['unit']}",
        f"异常发生在{event['line']} / {event['station']} / {event['equipment']}",
        f"历史案例{case['case_id']}：{case['root_cause']}",
    ]
    return {
        "event_id": event["event_id"],
        "risk": risk,
        "root_cause_hypothesis": case["root_cause"],
        "evidence_chain": evidence + case["evidence"],
        "actions": case["actions"],
        "feishu_record": {
            "table": "质量事件",
            "title": f"{risk} {event['station']} {event['alarm']}",
            "owner": "质量工程师/设备工程师",
            "sla": "P1 30分钟内完成复检；P2 当班完成点检",
            "scope": event["vin_scope"],
        },
    }


def main():
    events = load_events()
    cases = load_cases()
    print("赛力斯质量管控AI数字员工 demo\n")
    for event in events:
        risk = score_event(event)
        case = retrieve_case(event, cases)
        task = build_task(event, case, risk)
        print("=" * 72)
        print(f"事件：{task['event_id']} | 风险等级：{task['risk']}")
        print(f"疑似根因：{task['root_cause_hypothesis']}")
        print("证据链：")
        for item in task["evidence_chain"]:
            print(f"- {item}")
        print("处置方案：")
        for i, action in enumerate(task["actions"], 1):
            print(f"{i}. {action}")
        print("飞书多维表格记录：")
        for key, value in task["feishu_record"].items():
            print(f"- {key}: {value}")


if __name__ == "__main__":
    main()
