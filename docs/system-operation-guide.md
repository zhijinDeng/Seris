# 系统运行说明

本项目平台用于展示质量管控AI数字员工的关键闭环：现场异常进入系统后，如何通过知识图谱和Graph RAG形成证据链，如何由Agent拆分处置任务，如何在飞书Aily与多维表格中完成协同执行，并在任务关闭后回写复盘知识。

## 运行路径

1. 打开 `app/index.html`，选择 `E-20260717-001` 总装拧紧异常。
2. 查看证据链：总装一线、底盘合装、TQ-17拧紧枪、扭矩偏低、预紧力不足。
3. 查看处置任务：系统将处置动作拆分为隔离、复检、校准、检查套筒等任务，并标注风险等级和影响VIN范围。
4. 查看飞书协同动作：系统生成多维表格记录、机器人卡片、Aily交互指令和复盘回写动作。
5. 打开 `app/innovation.html`，查看主动巡检、质量因果图谱、Graph RAG证据合约、飞书闭环、质量记忆飞轮等方案创新点。
6. 运行 `python scripts/run_quality_agent.py`，查看异常评分、案例召回、证据链和处置方案的命令行输出。
7. 运行 `python scripts/feishu_client.py --event-id E-20260717-001 --write-interface-data`，生成飞书多维表格与Webhook接口数据预览。

## 能力对应

| 能力 | 文件 | 说明 |
| --- | --- | --- |
| 智能制造知识底座 | `data/quality_ontology.jsonld` | 定义设备、工序、参数、报警、缺陷、根因、控制计划与任务 |
| 异常主动感知 | `data/factory_events.csv` | 提供三类典型质量异常事件 |
| Graph RAG推理 | `docs/tightening-case-study.md` | 展示设备-参数-质量风险-根因的多跳证据链 |
| 自主处置规划 | `scripts/run_quality_agent.py` | 输出风险等级、疑似根因、证据链和处置动作 |
| 飞书协同执行 | `scripts/feishu_client.py` | 生成质量事件、任务记录、机器人卡片和Aily交互指令 |
| 复盘知识沉淀 | `data/end_to_end_trace.json` | 描述任务关闭后回写案例库、FMEA和图谱规则 |

## 运行边界

项目中的飞书程序默认只生成接口数据预览，不会向真实企业空间发送消息或写入数据。配置企业自建应用参数并显式添加 `--send` 后，才会调用飞书开放平台接口。
