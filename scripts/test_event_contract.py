from __future__ import annotations

import copy

from run_quality_agent import load_cases, load_events, load_graph, retrieve_case, validate_event


def expect_rejected(event: dict, expected: str) -> None:
    try:
        validate_event(event, set())
    except ValueError as exc:
        if expected not in str(exc):
            raise AssertionError(f"预期包含 {expected!r}，实际为 {exc!s}") from exc
        return
    raise AssertionError(f"异常事件未被拒绝: {expected}")


def main() -> None:
    events = load_events()
    base = events[0]

    missing = copy.deepcopy(base)
    missing["asset_id"] = ""
    expect_rejected(missing, "存在空值")

    late = copy.deepcopy(base)
    late["ingest_time"] = "2026-07-19T14:19:00+08:00"
    expect_rejected(late, "水位超过30秒")

    wrong_unit = copy.deepcopy(base)
    wrong_unit["unit"] = "Nm"
    expect_rejected(wrong_unit, "单位未进入白名单")

    expired = copy.deepcopy(base)
    expired["calibration_valid_until"] = "2026-07-01T00:00:00+08:00"
    expect_rejected(expired, "校准已失效")

    quarantined = copy.deepcopy(base)
    quarantined["quality_code"] = "SUSPECT"
    expect_rejected(quarantined, "QUARANTINED分支")

    duplicate_seen = {(base["source_system"], base["source_event_id"])}
    try:
        validate_event(copy.deepcopy(base), duplicate_seen)
    except ValueError as exc:
        assert "重复源事件" in str(exc)
    else:
        raise AssertionError("重复事件未被拒绝")

    graph = load_graph()
    cases = load_cases()
    for event in events:
        case, trace = retrieve_case(event, cases, graph)
        assert case["case_id"]
        assert any(step["relation"] == "matchedCase" for step in trace)
        assert all(step["source_ref"] for step in trace)

    print("事件契约测试通过: 4条有效事件，6类异常拒绝，4条关系图检索轨迹可追溯。")


if __name__ == "__main__":
    main()
