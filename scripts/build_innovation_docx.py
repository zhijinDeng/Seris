from __future__ import annotations

import html
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "提交材料" / "06_评委速读_创新亮点.docx"

SECTIONS = [
    ("一句话定位", "本方案不是做一个普通质量看板，也不是做一个被动问答机器人，而是打造一名有证据、有权限边界、能推动飞书闭环的赛力斯质量管控AI数字员工。"),
    ("创新点一：主动巡检数字员工", "传统方案是工程师提问后AI回答。本方案让AI持续监听工艺参数、设备报警、质检结果和维修记录，主动识别隐性质量风险。它更像在线质量工程师，而不是知识库入口。"),
    ("创新点二：质量因果图谱", "知识图谱不只存设备是什么、工位在哪里，而是表达设备状态如何影响工艺参数，工艺参数如何影响质量特性，质量特性如何关联缺陷模式和处置方案。"),
    ("创新点三：Graph RAG证据合约", "每个P0/P1结论必须带实时参数、图谱路径、历史案例或控制计划三类证据。AI不能只给建议，必须交付可审计证据链。"),
    ("创新点四：飞书质量闭环操作系统", "飞书不是最后通知一下，而是承接事件、证据、任务、SLA、复盘的执行系统。Aily负责解释和追问，多维表格负责结构化记录，Webhook负责快速播报，任务关闭后回写复盘知识。"),
    ("创新点五：质量记忆飞轮", "每次异常处置都会沉淀最终根因、有效措施、误报/漏报原因和预防规则，持续反哺知识图谱、历史案例库和FMEA，让AI越用越懂产线。"),
    ("答辩建议话术", "我们不是把大模型接到工厂文档上做问答，而是让AI成为一名有权限边界的质量数字员工。它会主动发现异常，用Graph RAG交付证据链，用飞书推动任务闭环，并把每次处置沉淀成赛力斯自己的质量记忆。"),
    ("三张卡机制", "一次质量异常进入系统后，AI自动生成风险卡、证据卡、任务卡。风险卡说明风险等级、影响范围和疑似根因；证据卡说明参数越界、图谱路径、历史案例和控制计划；任务卡说明隔离、复检、校准、维修和复盘任务。"),
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
    body = [para("评委速读：创新亮点", "Title")]
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
