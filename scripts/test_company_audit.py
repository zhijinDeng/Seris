from __future__ import annotations

from run_quality_agent import build_company_audit_result, load_company_profile, load_graph


def main() -> None:
    result = build_company_audit_result(load_company_profile(), load_graph())
    trigger = result["trigger"]
    assert result["event_id"] == "CASE-KD-20260812-05"
    assert result["risk"] == "P2-专家复核"
    assert trigger["work_orders"] == 121
    assert trigger["closed"] == 119
    assert trigger["cause_not_confirmed"] == 120
    assert trigger["failure_mode_linked"] == 0
    assert len(result["top_hypotheses"]) == 2
    assert all(item["status"] == "候选-待现场核验" for item in result["top_hypotheses"])
    assert len(result["graph_retrieval"]["query_trace"]) >= 8
    assert any(item["relation"] == "linkedFailureMode" for item in result["graph_retrieval"]["query_trace"])
    assert len(result["close_gate"]) == 5
    assert len(result["feishu_objects"]) == 6
    print("企业数据审计测试通过: 121张集中工单、2个受控候选、可追溯同类设备证据和5项关闭门。")


if __name__ == "__main__":
    main()
