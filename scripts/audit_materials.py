from __future__ import annotations

import zipfile
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
    "data/quality_ontology.jsonld",
    "data/factory_events.csv",
    "data/quality_cases.json",
    "data/interactive_scenarios.json",
    "data/seres_source_evidence.json",
    "data/feishu_bitable_schema.csv",
    "data/feishu_env_template.json",
    "data/feishu_aily_skills.json",
    "data/feishu_event_callback.example.json",
    "data/feishu_bitable_record.example.json",
    "data/end_to_end_trace.json",
    "data/innovation_cards.json",
    "diagram/quality-ai-architecture.svg",
    "app/index.html",
    "app/innovation.html",
    "app/styles.css",
    "app/app.js",
    "scripts/run_quality_agent.py",
    "scripts/feishu_client.py",
]

forbidden = [
    "评" + "委",
    "评" + "审",
    "答" + "辩",
    "提" + "示词",
    "AI" + "生成",
    "原" + "型",
    "预" + "期",
    "review" + "er",
    "jud" + "ge",
    "pro" + "mpt",
    "dry" + "-run",
    "pre" + "view",
]

missing = [p for p in required if not (ROOT / p).exists()]
if missing:
    raise SystemExit("缺少文件:\n" + "\n".join(missing))

hits = []
for path in ROOT.rglob("*"):
    if ".git" in path.parts or not path.is_file():
        continue
    if path.suffix.lower() in {".md", ".txt", ".html", ".css", ".js", ".py", ".json", ".csv", ".svg"}:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for term in forbidden:
            if term in text:
                hits.append(f"{path.relative_to(ROOT)}: {term}")
if hits:
    raise SystemExit("发现需清理表述:\n" + "\n".join(hits))

docx_files = sorted((ROOT / "提交材料").glob("*.docx"))
for docx in docx_files:
    with zipfile.ZipFile(docx) as zf:
        names = zf.namelist()
        if "word/document.xml" not in names:
            raise SystemExit(f"{docx.name} 不是有效docx")
        if "word/footer1.xml" in names or "word/header1.xml" in names:
            raise SystemExit(f"{docx.name} 含页眉页脚，请清理")

print(f"材料检查通过：{len(required)} 个核心文件，{len(docx_files)} 个docx。")
