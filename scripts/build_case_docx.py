from __future__ import annotations

import html
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "提交材料" / "05_答辩演示说明与完整案例.docx"

SECTIONS = [
    (
        "为什么要保留平台原型",
        "本项目的核心不是做平台，而是构建一名赛力斯超级工厂质量管控AI数字员工。平台原型的作用是把抽象方案可视化：让评委看到异常如何进入、知识图谱如何组织证据、Graph RAG如何推理、Agent如何拆分任务、飞书如何闭环执行。因此平台是方案可信度的演示件，不是项目的全部。",
    ),
    (
        "演示路径",
        "1. 打开 app/index.html，选择总装拧紧异常 E-20260717-001。\n2. 查看证据链：总装一线、底盘合装、TQ-17拧紧枪、扭矩偏低、预紧力不足。\n3. 查看飞书任务看板：AI将处置建议拆分为隔离、复检、校准、检查套筒等任务。\n4. 运行 python scripts/run_quality_agent.py，展示命令行Agent如何输出风险等级、根因假设、证据链和处置方案。\n5. 运行 python scripts/feishu_client.py --event-id E-20260717-001 --write-preview，展示飞书多维表格记录、Webhook卡片和Aily提示词。",
    ),
    (
        "完整案例摘要",
        "总装底盘合装工位中，TQ-17智能拧紧枪检测到M12底盘螺栓扭矩为86.4N·m，低于92.0-108.0N·m工艺窗口，并连续3辆车同点位低于下限。AI数字员工将其评为P1风险，沿知识图谱召回设备-工位-参数-质量特性-缺陷模式-历史案例证据链，判断疑似根因为套筒磨损或扭矩校准偏移。",
    ),
    (
        "飞书闭环",
        "处置方案为：暂停该点位自动放行，隔离VIN尾号8123-8125车辆，复检扭矩，校准TQ-17，检查并更换套筒。飞书侧自动写入质量事件表、拆分处置任务、推送机器人卡片，并在任务关闭后沉淀复盘知识。",
    ),
    (
        "评分点对应",
        "智能制造知识底座：本体、质量知识图谱、历史案例、控制计划。\n从感知到行动：异常事件、Agent推理、飞书任务、复盘回写。\nGraph RAG：图谱子图召回、文档/案例证据、可解释路径。\nAutonomous Agent：风险评分、根因假设、任务拆解、工具调用。\n飞书落地：Aily提示词、多维表格记录、Webhook卡片、SLA看板。",
    ),
    (
        "结论",
        "本方案用轻量原型证明真实落地路径：先从三类高价值质量场景试点，再扩展到更多产线和设备；先用dry-run验证飞书payload，再接入真实飞书开放平台；先沉淀案例和规则，再持续扩展知识图谱。",
    ),
]


def para(text: str, style: str = "Normal") -> str:
    style_xml = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style != "Normal" else ""
    runs = []
    for line in text.split("\n"):
        runs.append(f"<w:r><w:t>{html.escape(line)}</w:t></w:r>")
        runs.append("<w:r><w:br/></w:r>")
    if runs:
        runs.pop()
    return f"<w:p>{style_xml}{''.join(runs)}</w:p>"


def make_docx() -> None:
    body = [para("答辩演示说明与完整案例", "Title")]
    for title, content in SECTIONS:
        body.append(para(title, "Heading1"))
        body.append(para(content))
    document = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>
{''.join(body)}
<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr>
</w:body></w:document>'''
    styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei"/><w:sz w:val="21"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei"/><w:sz w:val="36"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:color w:val="1F4E79"/><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei"/><w:sz w:val="28"/></w:rPr></w:style>
</w:styles>'''
    rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'''
    doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'''
    content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'''
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", rels)
        zf.writestr("word/_rels/document.xml.rels", doc_rels)
        zf.writestr("word/document.xml", document)
        zf.writestr("word/styles.xml", styles)
    print(f"built {OUT}")


if __name__ == "__main__":
    make_docx()
