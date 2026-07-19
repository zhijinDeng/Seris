from __future__ import annotations

import argparse
import csv
import json
import os
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OPEN_API = "https://open.feishu.cn/open-apis"


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def load_events():
    with (ROOT / "data" / "factory_events.csv").open(encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def post_json(url: str, payload: dict, headers: dict | None = None) -> dict:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req_headers = {"Content-Type": "application/json; charset=utf-8"}
    if headers:
        req_headers.update(headers)
    request = urllib.request.Request(url, data=data, headers=req_headers, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8")
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Feishu API HTTP {exc.code}: {detail}") from exc


def get_tenant_access_token() -> str:
    app_id = os.getenv("FEISHU_APP_ID")
    app_secret = os.getenv("FEISHU_APP_SECRET")
    if not app_id or not app_secret:
        raise RuntimeError("缺少 FEISHU_APP_ID 或 FEISHU_APP_SECRET")
    resp = post_json(
        f"{OPEN_API}/auth/v3/tenant_access_token/internal",
        {"app_id": app_id, "app_secret": app_secret},
    )
    token = resp.get("tenant_access_token")
    if not token:
        raise RuntimeError(f"未获取到 tenant_access_token: {resp}")
    return token


def build_event_record(event: dict) -> dict:
    return {
        "fields": {
            "事件ID": event["event_id"],
            "风险等级": "P1" if event["alarm"].find("连续") >= 0 or event["alarm"].find("漂移") >= 0 else "P2",
            "异常摘要": f"{event['line']} / {event['station']} / {event['alarm']}",
            "设备": event["equipment"],
            "参数": event["parameter"],
            "实测值": f"{event['value']}{event['unit']}",
            "工艺窗口": f"{event['lower']}-{event['upper']}{event['unit']}",
            "影响范围": event["vin_scope"],
            "质量风险": event["quality_risk"],
            "处置方案": event["suggested_action"],
            "状态": "待确认",
        }
    }


def build_task_records(event: dict) -> list[dict]:
    actions = [item.strip() for item in event["suggested_action"].replace("，", ";").replace("。", "").split(";") if item.strip()]
    if not actions:
        actions = [event["suggested_action"]]
    records = []
    for index, action in enumerate(actions, 1):
        records.append({
            "fields": {
                "任务ID": f"TASK-{event['event_id'][-3:]}-{index}",
                "关联事件": event["event_id"],
                "任务内容": action,
                "负责人角色": "质量工程师" if index == 1 else "设备工程师",
                "SLA": "P1 30分钟内完成；P2 当班完成",
                "状态": "待处理",
            }
        })
    return records


def build_webhook_card(event: dict) -> dict:
    return {
        "msg_type": "interactive",
        "card": {
            "config": {"wide_screen_mode": True},
            "header": {
                "template": "red" if "连续" in event["alarm"] or "漂移" in event["alarm"] else "orange",
                "title": {"tag": "plain_text", "content": f"质量风险预警 {event['event_id']}"},
            },
            "elements": [
                {"tag": "div", "text": {"tag": "lark_md", "content": f"**工位**：{event['line']} / {event['station']}"}},
                {"tag": "div", "text": {"tag": "lark_md", "content": f"**设备**：{event['equipment']}"}},
                {"tag": "div", "text": {"tag": "lark_md", "content": f"**异常**：{event['parameter']}={event['value']}{event['unit']}，窗口 {event['lower']}-{event['upper']}{event['unit']}"}},
                {"tag": "div", "text": {"tag": "lark_md", "content": f"**影响范围**：{event['vin_scope']}"}},
                {"tag": "div", "text": {"tag": "lark_md", "content": f"**处置方案**：{event['suggested_action']}"}},
            ],
        },
    }


def create_bitable_record(token: str, app_token: str, table_id: str, record: dict) -> dict:
    return post_json(
        f"{OPEN_API}/bitable/v1/apps/{app_token}/tables/{table_id}/records",
        record,
        {"Authorization": f"Bearer {token}"},
    )


def send_webhook(payload: dict) -> dict:
    url = os.getenv("FEISHU_WEBHOOK_URL")
    if not url:
        raise RuntimeError("缺少 FEISHU_WEBHOOK_URL")
    return post_json(url, payload)


def main():
    parser = argparse.ArgumentParser(description="赛力斯质量AI飞书集成客户端")
    parser.add_argument("--event-id", default="E-20260717-001")
    parser.add_argument("--send", action="store_true", help="真实调用飞书接口；默认只输出接口数据")
    parser.add_argument("--write-interface-data", action="store_true", help="写出 output/feishu_interface_data.json")
    args = parser.parse_args()

    events = load_events()
    event = next((item for item in events if item["event_id"] == args.event_id), None)
    if event is None:
        raise SystemExit(f"未找到事件 {args.event_id}")

    interface_data = {
        "event_record": build_event_record(event),
        "task_records": build_task_records(event),
        "webhook_card": build_webhook_card(event),
        "aily_command": f"@质量AI 解释事件 {event['event_id']}，列出证据链、影响范围、责任人和下一步处置。",
    }

    if args.write_interface_data:
        out = ROOT / "output" / "feishu_interface_data.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(interface_data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"已写出 {out}")

    if not args.send:
        print(json.dumps(interface_data, ensure_ascii=False, indent=2))
        return

    token = get_tenant_access_token()
    app_token = os.getenv("FEISHU_BITABLE_APP_TOKEN")
    event_table = os.getenv("FEISHU_BITABLE_EVENT_TABLE_ID")
    task_table = os.getenv("FEISHU_BITABLE_TASK_TABLE_ID")
    if not app_token or not event_table:
        raise RuntimeError("缺少 FEISHU_BITABLE_APP_TOKEN 或 FEISHU_BITABLE_EVENT_TABLE_ID")

    results = {
        "event_record": create_bitable_record(token, app_token, event_table, interface_data["event_record"]),
        "tasks": [],
        "webhook": None,
    }
    if task_table:
        for record in interface_data["task_records"]:
            results["tasks"].append(create_bitable_record(token, app_token, task_table, record))
    if os.getenv("FEISHU_WEBHOOK_URL"):
        results["webhook"] = send_webhook(interface_data["webhook_card"])
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
