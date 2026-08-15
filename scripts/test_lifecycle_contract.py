from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
contract = json.loads((ROOT / "data" / "quality_lifecycle_contract.json").read_text(encoding="utf-8"))
stages = contract["stages"]

assert contract["schema_version"] == "1.0"
assert len(stages) == 12
assert [stage["order"] for stage in stages] == list(range(1, 13))
assert len({stage["id"] for stage in stages}) == len(stages)
for stage in stages:
    for field in ("id", "name", "owner", "ai_role", "required_evidence", "gate", "feishu_object", "sla"):
        assert stage.get(field), f"missing {field}: {stage['id']}"
    assert stage["required_evidence"], f"empty evidence: {stage['id']}"

ids = [stage["id"] for stage in stages]
assert ids.index("information_confirmation") < ids.index("work_order_admission") < ids.index("task_assignment")
assert ids.index("repair_action") < ids.index("operating_confirmation") < ids.index("production_restart")
assert ids.index("knowledge_capture") < ids.index("standard_review") < ids.index("effectiveness_observation")
for transition in contract["forbidden_transitions"]:
    assert transition

print(f"生命周期契约通过: {len(stages)}步，{len(contract['forbidden_transitions'])}条禁止跳转")

