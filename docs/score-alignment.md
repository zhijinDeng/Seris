# 赛题评分点对齐

| 赛题要求 | 本项目对应材料 | 交付证明 |
| --- | --- | --- |
| 基于本体论、知识图谱构建工厂设备与质量知识底座 | `data/quality_ontology.jsonld`、`docs/architecture.md` | 定义车型、工序、设备、传感器、参数、报警、缺陷、根因、控制计划、任务等核心类 |
| 主动捕捉工艺或设备异常 | `data/factory_events.csv`、`scripts/run_quality_agent.py` | 三类异常事件输入，支持风险评分和案例召回 |
| Graph RAG深度推理 | `docs/tightening-case-study.md`、前端证据链 | 展示设备-工艺-参数-缺陷-根因多跳证据 |
| Autonomous Agent自主思考与执行 | `scripts/run_quality_agent.py`、`data/end_to_end_trace.json` | 输出风险等级、疑似根因、处置建议和任务记录 |
| 输出可解释证据链与处置方案 | `docs/tightening-case-study.md`、`output/feishu_payload_preview.json` | 每个建议带参数证据、历史案例和控制动作 |
| 结合飞书Aily、多维表格实现协同执行 | `scripts/feishu_client.py`、`docs/feishu-integration-guide.md` | 生成多维表格记录、Webhook卡片、Aily追问提示词 |
| 从感知到行动闭环 | `docs/demo-guide.md`、`diagram/quality-ai-architecture.svg` | 演示异常进入、证据生成、任务派发、复盘回写 |
| AI数字员工落地应用 | `app/index.html`、`提交材料/03_平台原型说明.md` | 可视化展示质量数字员工工作台 |

## 优先讲清楚的三句话

1. 我们不是做一个普通问答知识库，而是做一个能主动巡检和推动处置的质量AI数字员工。
2. 我们不是只用文本RAG，而是用知识图谱约束实体关系，再用Graph RAG组织可解释证据链。
3. 我们不是只给建议，而是把建议拆成飞书任务、多维表格记录和复盘知识，实现质量闭环。
