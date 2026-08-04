from __future__ import annotations

import zipfile
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

required = [
    "README.md",
    "提交材料/00_报名表填写文本.md",
    "提交材料/01_开题报告.md",
    "提交材料/02_整体解决方案书.md",
    "提交材料/03_平台运行说明.md",
    "提交材料/04_参考文献与数据依据.md",
    "提交材料/05_系统运行说明与完整案例.md",
    "提交材料/06_方案创新亮点.md",
    "提交材料/07_仿真工况与交互案例.md",
    "提交材料/08_40强赛完整参赛方案.md",
    "提交材料/09_决赛完整技术方案.md",
    "docs/research-brief.md",
    "docs/architecture.md",
    "docs/digital-employee-profile.md",
    "docs/interactive-scenario-design.md",
    "docs/quality-risk-playbook.md",
    "docs/feishu-aily-bitable.md",
    "docs/feishu-integration-guide.md",
    "docs/system-operation-guide.md",
    "docs/tightening-case-study.md",
    "docs/score-alignment.md",
    "docs/innovation-highlights.md",
    "docs/solution-overview.md",
    "docs/90-day-plan.md",
    "docs/final-round-acceptance-plan.md",
    "docs/active-detection-and-causal-assurance.md",
    "docs/research-evidence-matrix.md",
    "data/quality_ontology.jsonld",
    "data/factory_events.csv",
    "data/quality_cases.json",
    "data/interactive_scenarios.json",
    "data/decision_assurance.json",
    "data/seres_source_evidence.json",
    "data/feishu_bitable_schema.csv",
    "data/feishu_env_template.json",
    "data/feishu_aily_skills.json",
    "data/feishu_event_callback.example.json",
    "data/feishu_bitable_record.example.json",
    "data/end_to_end_trace.json",
    "data/innovation_cards.json",
    "data/feishu_integration_matrix.json",
    "data/feishu_orchestration_event.json",
    "data/feishu_review_doc_template.xml",
    "data/reference_catalog.json",
    "diagram/quality-ai-architecture.svg",
    "app/index.html",
    "app/innovation.html",
    "app/styles.css",
    "app/app.js",
    "app/dashboard.js",
    "app/assets/quality-agent.png",
    "scripts/run_quality_agent.py",
    "scripts/qa_browser.js",
    "scripts/feishu_client.py",
    "scripts/lark_cli_runner.js",
    "scripts/sync_feishu_quality_event.ps1",
    "scripts/orchestrate_feishu_quality_event.ps1",
]

forbidden = [
    "评" + "委",
    "评" + "审",
    "答" + "辩",
    "提" + "示词",
    "AI" + "生成",
    "review" + "er",
    "jud" + "ge",
    "pro" + "mpt",
]

missing = [p for p in required if not (ROOT / p).exists()]
if missing:
    raise SystemExit("缺少文件:\n" + "\n".join(missing))

hits = []
public_roots = [ROOT / "README.md", ROOT / "docs", ROOT / "提交材料", ROOT / "app"]
public_files = [public_roots[0]]
for base in public_roots[1:]:
    public_files.extend(base.rglob("*"))

for path in public_files:
    if not path.is_file():
        continue
    if path.suffix.lower() in {".md", ".txt", ".html", ".css", ".js", ".py", ".json", ".csv", ".svg"}:
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
    with zipfile.ZipFile(docx) as zf:
        names = zf.namelist()
        if "word/document.xml" not in names:
            raise SystemExit(f"{docx.name} 不是有效docx")
        if "word/footer1.xml" in names or "word/header1.xml" in names:
            raise SystemExit(f"{docx.name} 含页眉页脚，请清理")

contract = json.loads((ROOT / "data/decision_assurance.json").read_text(encoding="utf-8"))
profiles = contract.get("profiles", {})
if len(profiles) != 4:
    raise SystemExit(f"主动检测场景应为4个，当前为{len(profiles)}")
for event_id, profile in profiles.items():
    if profile.get("lead_minutes", 0) <= 0:
        raise SystemExit(f"{event_id} 缺少有效前置量")
    if len(profile.get("top_hypotheses", [])) != 3:
        raise SystemExit(f"{event_id} 根因假设不是Top-3")
if len(contract.get("causal_guardrails", [])) != 5 or len(contract.get("deterministic_close_gate", [])) != 5:
    raise SystemExit("因果护栏与确定性关闭门必须各为5项")

html = (ROOT / "app/index.html").read_text(encoding="utf-8")
for element_id in ["leadTime", "warningStages", "traceSelector", "causalHypotheses", "guardrailChecks", "validationGate", "replicationMatrix"]:
    if f'id="{element_id}"' not in html:
        raise SystemExit(f"工作台缺少关键交互节点：{element_id}")

print(f"材料检查通过：{len(required)} 个核心文件，{len(docx_files)} 个docx。")
