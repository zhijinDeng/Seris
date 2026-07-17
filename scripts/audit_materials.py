from pathlib import Path
import zipfile


ROOT = Path(__file__).resolve().parents[1]
required = [
    "README.md",
    "提交材料/00_报名表填写文本.md",
    "提交材料/01_开题报告.md",
    "提交材料/02_整体解决方案书.md",
    "提交材料/03_平台原型说明.md",
    "docs/research-brief.md",
    "docs/architecture.md",
    "docs/feishu-aily-bitable.md",
    "docs/feishu-integration-guide.md",
    "docs/demo-guide.md",
    "docs/tightening-case-study.md",
    "docs/score-alignment.md",
    "docs/90-day-plan.md",
    "data/quality_ontology.jsonld",
    "data/factory_events.csv",
    "data/quality_cases.json",
    "data/feishu_bitable_schema.csv",
    "data/feishu_env_template.json",
    "data/feishu_aily_skills.json",
    "data/feishu_event_callback.example.json",
    "data/feishu_bitable_record.example.json",
    "data/end_to_end_trace.json",
    "diagram/quality-ai-architecture.svg",
    "app/index.html",
    "app/styles.css",
    "app/app.js",
    "scripts/run_quality_agent.py",
    "scripts/feishu_client.py",
    "scripts/build_case_docx.py",
]

missing = [p for p in required if not (ROOT / p).exists()]
if missing:
    raise SystemExit("缺少文件:\n" + "\n".join(missing))

for docx in (ROOT / "提交材料").glob("*.docx"):
    with zipfile.ZipFile(docx) as zf:
        if "word/document.xml" not in zf.namelist():
            raise SystemExit(f"{docx.name} 不是有效docx")

print(f"材料检查通过：{len(required)} 个核心文件，{len(list((ROOT / '提交材料').glob('*.docx')))} 个docx。")
