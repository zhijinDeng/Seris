from __future__ import annotations

import csv
import hashlib
import json
import zipfile
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

required = [
    "README.md",
    *[f"提交材料/{index:02d}_{name}.md" for index, name in enumerate([
        "报名表填写文本", "开题报告", "整体解决方案书", "平台运行说明", "参考文献与数据依据",
        "系统运行说明与完整案例", "方案创新亮点", "仿真工况与交互案例", "40强赛完整参赛方案", "决赛完整技术方案",
    ])],
    "docs/research-brief.md", "docs/architecture.md", "docs/digital-employee-profile.md",
    "docs/interactive-scenario-design.md", "docs/quality-risk-playbook.md", "docs/feishu-aily-bitable.md",
    "docs/feishu-integration-guide.md", "docs/system-operation-guide.md", "docs/tightening-case-study.md",
    "docs/score-alignment.md", "docs/innovation-highlights.md", "docs/solution-overview.md", "docs/90-day-plan.md",
    "docs/final-round-acceptance-plan.md", "docs/active-detection-and-causal-assurance.md",
    "docs/research-evidence-matrix.md", "docs/production-decision-assurance-contract.md", "docs/pilot-acceptance-protocol.md",
    "data/quality_ontology.jsonld", "data/quality_graph.json", "data/factory_event.schema.json", "data/factory_events.csv", "data/quality_cases.json",
    "data/interactive_scenarios.json", "data/decision_assurance.json", "data/seres_source_evidence.json", "data/company_dataset_profile.json",
    "data/feishu_bitable_schema.csv", "data/feishu_env_template.json", "data/feishu_aily_skills.json",
    "data/feishu_event_callback.example.json", "data/feishu_bitable_record.example.json",
    "data/end_to_end_trace.json", "data/innovation_cards.json", "data/feishu_integration_matrix.json",
    "data/feishu_orchestration_event.json", "data/feishu_company_audit_event.json", "data/feishu_review_doc_template.xml", "data/reference_catalog.json", "data/quality_lifecycle_contract.json", "data/public_benchmark_profile.json",
    "diagram/quality-ai-architecture.svg", "app/index.html", "app/innovation.html", "app/styles.css",
    "app/app.js", "app/dashboard.js", "app/assets/quality-agent.png", "scripts/run_quality_agent.py", "scripts/test_event_contract.py", "scripts/test_company_audit.py", "scripts/profile_company_dataset.py",
    "scripts/qa_browser.js", "scripts/test_lifecycle_contract.py", "scripts/feishu_client.py", "scripts/lark_cli_runner.js",
    "scripts/sync_feishu_quality_event.ps1", "scripts/orchestrate_feishu_quality_event.ps1",
]

forbidden = ["评审视角", "评委视角", "答辩建议", "提示词", "AI生成", "reviewer", "judge", "prompt"]


def minutes_between(start: str, end: str) -> int:
    begin = datetime.strptime(start, "%H:%M")
    finish = datetime.strptime(end, "%H:%M")
    return int((finish - begin).total_seconds() // 60)


missing = [path for path in required if not (ROOT / path).exists()]
if missing:
    raise SystemExit("缺少文件:\n" + "\n".join(missing))

hits = []
public_roots = [ROOT / "README.md", ROOT / "docs", ROOT / "提交材料", ROOT / "app"]
public_files = [public_roots[0]]
for base in public_roots[1:]:
    public_files.extend(base.rglob("*"))
for path in public_files:
    if path.is_file() and path.suffix.lower() in {".md", ".txt", ".html", ".css", ".js", ".py", ".json", ".csv", ".svg"}:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for term in forbidden:
            if term in text:
                hits.append(f"{path.relative_to(ROOT)}: {term}")
if hits:
    raise SystemExit("发现需清理表述:\n" + "\n".join(hits))

docx_files = sorted((ROOT / "提交材料").glob("*.docx"))
if len(docx_files) != 10:
    raise SystemExit(f"DOCX数量应为10，当前为{len(docx_files)}")
for docx in docx_files:
    with zipfile.ZipFile(docx) as archive:
        names = archive.namelist()
        if "word/document.xml" not in names:
            raise SystemExit(f"{docx.name} 不是有效DOCX")
        if "word/footer1.xml" in names or "word/header1.xml" in names:
            raise SystemExit(f"{docx.name} 含页眉页脚")

contract = json.loads((ROOT / "data/decision_assurance.json").read_text(encoding="utf-8"))
if contract.get("schema_version") != "2.0":
    raise SystemExit("决策保障契约版本必须为2.0")
profiles = contract.get("profiles", {})
if len(profiles) != 4:
    raise SystemExit(f"主动检测场景应为4个，当前为{len(profiles)}")
expected_leads = {"CASE-TQ-20260719-01": 22, "CASE-WD-20260719-02": 31, "CASE-PA-20260719-03": 18, "CASE-DC-20260719-04": 46}
for event_id, profile in profiles.items():
    points = profile.get("signal", {}).get("points", [])
    interventions = profile.get("interventions", [])
    if len(points) < 8 or not any(point[2] for point in points):
        raise SystemExit(f"{event_id} 缺少可计算的时序证据")
    relation_time = next(point[0] for point in points if point[2])
    lead = minutes_between(relation_time, profile["signal"]["downstream_time"])
    if lead != expected_leads[event_id]:
        raise SystemExit(f"{event_id} 前置量计算不一致: {lead}")
    if len(profile.get("top_hypotheses", [])) != 3:
        raise SystemExit(f"{event_id} 根因假设不是Top-3")
    if len(interventions) != 2:
        raise SystemExit(f"{event_id} 必须提供2个反事实干预")
    for intervention in interventions:
        fields = ["measurement", "criterion", "signer", "result", "posterior"]
        if any(not intervention.get(field) for field in fields) or len(intervention["posterior"]) != 3:
            raise SystemExit(f"{event_id}/{intervention.get('id')} 干预证据不完整")
if len(contract.get("causal_guardrails", [])) != 5 or len(contract.get("deterministic_close_gate", [])) != 5:
    raise SystemExit("因果护栏与确定性关闭门必须各为5项")
if set(contract.get("operating_modes", {})) != {"shadow", "collaborative", "controlled"}:
    raise SystemExit("运行模式必须包含影子、协同和受控三种")

with (ROOT / "data/factory_events.csv").open(encoding="utf-8-sig", newline="") as handle:
    events = list(csv.DictReader(handle))
required_event_fields = {"event_time", "ingest_time", "source_system", "source_event_id", "sequence_no", "quality_code", "schema_version", "asset_id", "station_id", "tag_id", "calibration_id", "calibration_valid_until", "object_binding"}
if len(events) != 4 or not required_event_fields.issubset(events[0]):
    raise SystemExit("工厂事件缺少来源、时序或质量码字段")
if {event["event_id"] for event in events} != set(profiles):
    raise SystemExit("事件流与决策保障场景ID不一致")
if {event["schema_version"] for event in events} != {"2.1"}:
    raise SystemExit("工厂事件必须使用2.1数据准入契约")

graph = json.loads((ROOT / "data/quality_graph.json").read_text(encoding="utf-8"))
graph_nodes = {node["id"] for node in graph.get("nodes", [])}
if len(graph_nodes) < 36 or len(graph.get("edges", [])) < 32:
    raise SystemExit("关系图实例与边不足以覆盖四类工况和企业数据审计")
for event in events:
    if f"event:{event['event_id']}" not in graph_nodes:
        raise SystemExit(f"关系图缺少事件节点: {event['event_id']}")

references = json.loads((ROOT / "data/reference_catalog.json").read_text(encoding="utf-8"))
reference_ids = {item.get("id") for item in references}
if len(references) != 29 or len(reference_ids) != len(references):
    raise SystemExit("参考资料目录必须保持29条且ID唯一")
if not {"S0", "F6", "F7", "U1", "C1", "C2"}.issubset(reference_ids):
    raise SystemExit("参考资料目录缺少企业年报、赛事材料或飞书官方依据")

lifecycle = json.loads((ROOT / "data/quality_lifecycle_contract.json").read_text(encoding="utf-8"))
if len(lifecycle.get("stages", [])) != 12 or len(lifecycle.get("forbidden_transitions", [])) != 5:
    raise SystemExit("现场生命周期契约必须包含12步和5条禁止跳转")
benchmark = json.loads((ROOT / "data/public_benchmark_profile.json").read_text(encoding="utf-8"))
if benchmark.get("facts", {}).get("samples") != 1567 or benchmark.get("facts", {}).get("features") != 591:
    raise SystemExit("公开数据验证卡片缺少UCI SECOM官方规模")

company_profile = json.loads((ROOT / "data/company_dataset_profile.json").read_text(encoding="utf-8"))
if company_profile.get("snapshot") != {"equipment_types": 625, "equipment_instances": 9673, "equipment_functions": 336, "failure_modes": 1287, "work_orders": 406}:
    raise SystemExit("企业脱敏数据画像的核心数量与赛事数据包不一致")
flagship = company_profile.get("flagship_case", {})
if flagship.get("observations", {}).get("work_orders") != 121 or flagship.get("observations", {}).get("failure_mode_linked") != 0:
    raise SystemExit("闭而未解旗舰案例的证据统计不一致")
company_event = json.loads((ROOT / "data/feishu_company_audit_event.json").read_text(encoding="utf-8"))
if company_event.get("event_type") != "CLOSED_BUT_UNRESOLVED" or len(company_event.get("candidate_failure_modes", [])) != 2:
    raise SystemExit("企业数据审计事件契约缺失或候选故障模式数量错误")
aily_skills = json.loads((ROOT / "data/feishu_aily_skills.json").read_text(encoding="utf-8"))
if len(aily_skills) != 5 or any("禁止" not in item.get("permission", "") and item.get("permission") != "只读" for item in aily_skills[2:]):
    raise SystemExit("Aily岗位技能必须保持五类受控能力和明确权限边界")

source_evidence = json.loads((ROOT / "data/seres_source_evidence.json").read_text(encoding="utf-8"))
if not any("2025年年度报告" in item.get("name", "") for item in source_evidence):
    raise SystemExit("企业证据索引缺少赛力斯2025年年度报告")

html = (ROOT / "app/index.html").read_text(encoding="utf-8")
interaction_ids = [
    "leadTime", "warningStages", "traceSelector", "causalHypotheses", "guardrailChecks",
    "validationGate", "replicationMatrix", "modeSelector", "eventPassport", "interventionOptions",
    "interventionResult", "resilienceOptions", "responsibilityMatrix", "pilotReadiness", "writebackBtn",
    "companyDatasetMetrics", "relationshipFunnel", "knowledgeDebtCase", "dataAuditTrace", "runDataAuditBtn", "lifecycleRail", "lifecycleDetail", "lifecycleEvidence",
]
for element_id in interaction_ids:
    if f'id="{element_id}"' not in html:
        raise SystemExit(f"工作台缺少关键交互节点: {element_id}")

md08 = (ROOT / "提交材料/08_40强赛完整参赛方案.md").read_bytes()
md09 = (ROOT / "提交材料/09_决赛完整技术方案.md").read_bytes()
if hashlib.sha256(md08).digest() == hashlib.sha256(md09).digest():
    raise SystemExit("40强材料与决赛技术方案不应重复")
final_text = md09.decode("utf-8")
for heading in ["整体概述", "整体架构与核心功能模块", "核心创新", "落地预期价值", "落地可行性", "落地可推广性"]:
    if heading not in final_text:
        raise SystemExit(f"决赛方案缺少章节: {heading}")

print(f"材料检查通过: {len(required)} 个核心文件，{len(docx_files)} 个DOCX，4个可计算时序场景，1个企业数据审计案例，29条参考资料，23个关键交互节点。")
