from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
SUBMIT = ROOT / "提交材料"


DOCS = [
    "00_报名表填写文本",
    "01_开题报告",
    "02_整体解决方案书",
    "03_平台运行说明",
    "04_参考文献与数据依据",
    "05_系统运行说明与完整案例",
    "06_方案创新亮点",
    "07_仿真工况与交互案例",
]


def r(text: str, bold: bool = False, color: str | None = None, size: int | None = None) -> str:
    props = []
    if bold:
        props.append("<w:b/>")
    if color:
        props.append(f'<w:color w:val="{color}"/>')
    if size:
        props.append(f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>')
    rpr = f"<w:rPr>{''.join(props)}</w:rPr>" if props else ""
    return f"<w:r>{rpr}<w:t xml:space=\"preserve\">{escape(text)}</w:t></w:r>"


def p(text: str = "", style: str | None = None, runs: list[str] | None = None, keep_next: bool = False) -> str:
    props = []
    if style:
        props.append(f'<w:pStyle w:val="{style}"/>')
    if keep_next:
        props.append("<w:keepNext/>")
    ppr = f"<w:pPr>{''.join(props)}</w:pPr>" if props else ""
    content = "".join(runs) if runs is not None else r(text)
    return f"<w:p>{ppr}{content}</w:p>"


def list_p(text: str, num_id: int, level: int = 0) -> str:
    return (
        "<w:p>"
        f'<w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="{level}"/>'
        f'<w:numId w:val="{num_id}"/></w:numPr></w:pPr>'
        f"{r(text)}</w:p>"
    )


def cell(text: str, width: int, fill: str | None = None, bold: bool = False) -> str:
    shd = f'<w:shd w:fill="{fill}"/>' if fill else ""
    tcpr = (
        f'<w:tcPr><w:tcW w:w="{width}" w:type="dxa"/>{shd}'
        '<w:tcMar><w:top w:w="100" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/>'
        '<w:start w:w="140" w:type="dxa"/><w:end w:w="140" w:type="dxa"/></w:tcMar>'
        "</w:tcPr>"
    )
    return f"<w:tc>{tcpr}{p(runs=[r(text, bold=bold)])}</w:tc>"


def table(rows: list[list[str]], widths: list[int], header: bool = False) -> str:
    grid = "".join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    body = []
    for i, row in enumerate(rows):
        fill = "F2F4F7" if header and i == 0 else None
        body.append("<w:tr>" + "".join(cell(value, widths[j], fill=fill, bold=bool(fill)) for j, value in enumerate(row)) + "</w:tr>")
    return (
        "<w:tbl>"
        '<w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="9360" w:type="dxa"/>'
        '<w:tblInd w:w="120" w:type="dxa"/><w:tblLayout w:type="fixed"/>'
        '<w:tblBorders><w:top w:val="single" w:sz="4" w:color="D9E0EA"/>'
        '<w:left w:val="single" w:sz="4" w:color="D9E0EA"/><w:bottom w:val="single" w:sz="4" w:color="D9E0EA"/>'
        '<w:right w:val="single" w:sz="4" w:color="D9E0EA"/><w:insideH w:val="single" w:sz="4" w:color="D9E0EA"/>'
        '<w:insideV w:val="single" w:sz="4" w:color="D9E0EA"/></w:tblBorders></w:tblPr>'
        f"<w:tblGrid>{grid}</w:tblGrid>{''.join(body)}</w:tbl>"
    )


def cover_block(title: str) -> list[str]:
    return [
        p(title, "Title"),
        p("赛力斯企业命题参赛材料", "Subtitle"),
        table(
            [
                ["作品名称", "知质·灵巡：面向新能源汽车智能工厂的质量风险主动管控数字员工"],
                ["参赛队伍", "智造知行队"],
                ["数字员工", "知质·灵巡"],
                ["材料定位", "设备质量风险主动识别、证据推理、飞书协同与复盘闭环"],
            ],
            [1900, 7460],
        ),
        p("", "SmallSpace"),
    ]


def maybe_kv_table(lines: list[str], start: int) -> tuple[str | None, int]:
    rows = []
    index = start
    while index < len(lines):
        line = lines[index].strip()
        if not line or line.startswith("#") or line.startswith("- ") or re.match(r"^\d+\.", line):
            break
        if "：" not in line or len(line) > 90:
            break
        key, value = line.split("：", 1)
        if not key or not value or len(key) > 14:
            break
        rows.append([key, value])
        index += 1
    if len(rows) >= 2:
        return table(rows, [1700, 7660]), index
    return None, start


def build_body(md: str) -> str:
    lines = md.strip().splitlines()
    title = "参赛材料"
    if lines and lines[0].startswith("# "):
        title = lines[0][2:].strip()
        lines = lines[1:]
    body = cover_block(title)
    i = 0
    while i < len(lines):
        raw = lines[i].rstrip()
        line = raw.strip()
        if not line:
            body.append(p())
            i += 1
            continue
        kv, new_i = maybe_kv_table(lines, i)
        if kv:
            body.append(kv)
            body.append(p("", "SmallSpace"))
            i = new_i
            continue
        if line.startswith("## "):
            body.append(p(line[3:].strip(), "Heading1", keep_next=True))
        elif line.startswith("### "):
            body.append(p(line[4:].strip(), "Heading2", keep_next=True))
        elif line.startswith("- "):
            body.append(list_p(line[2:].strip(), num_id=1))
        elif re.match(r"^\d+\.\s+", line):
            body.append(list_p(re.sub(r"^\d+\.\s+", "", line), num_id=2))
        elif "：" in line and len(line) < 70:
            key, value = line.split("：", 1)
            body.append(p(runs=[r(key + "：", bold=True, color="1F4D78"), r(value)]))
        else:
            body.append(p(line, "BodyText"))
        i += 1
    return "".join(body)


def styles_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei" w:hAnsi="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="172033"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:spacing w:before="0" w:after="160"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei" w:hAnsi="Calibri"/><w:b/><w:sz w:val="36"/><w:szCs w:val="36"/><w:color w:val="0B2545"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:pPr><w:spacing w:after="240"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei" w:hAnsi="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="657086"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:keepNext/><w:spacing w:before="320" w:after="160"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei" w:hAnsi="Calibri"/><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/><w:color w:val="2E74B5"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="Microsoft YaHei" w:hAnsi="Calibri"/><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/><w:color w:val="2E74B5"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="BodyText"><w:name w:val="Body Text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="720"/><w:spacing w:after="120" w:line="280" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="SmallSpace"><w:name w:val="Small Space"/><w:pPr><w:spacing w:after="80"/></w:pPr></w:style>
</w:styles>"""


def numbering_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:abstractNum w:abstractNumId="2"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="1"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="2"/></w:num>
</w:numbering>"""


def document_xml(body: str) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {body}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>"""


def write_docx(md_path: Path) -> None:
    md = md_path.read_text(encoding="utf-8")
    out = md_path.with_suffix(".docx")
    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>""")
        zf.writestr("_rels/.rels", """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>""")
        zf.writestr("word/_rels/document.xml.rels", """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>""")
        zf.writestr("word/document.xml", document_xml(build_body(md)))
        zf.writestr("word/styles.xml", styles_xml())
        zf.writestr("word/numbering.xml", numbering_xml())


def main() -> None:
    for stem in DOCS:
        write_docx(SUBMIT / f"{stem}.md")
    print(f"FORMAT_DONE {len(DOCS)} docx")


if __name__ == "__main__":
    main()
