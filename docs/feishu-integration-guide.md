# 飞书集成实施指南

## 1. 集成边界

本方案把飞书作为质量数字员工的协同执行层，而不是把飞书当作单纯消息通知工具。Agent在完成Graph RAG推理后，会把结论写入多维表格、向责任群发送机器人卡片、生成任务中心或多维表格任务，并在任务关闭后把复盘结论回写知识图谱。

## 2. 开放平台能力

| 能力 | 用途 | 接口/配置方向 |
| --- | --- | --- |
| 自建应用机器人 | 接收工程师提问，推送P0/P1风险卡片 | 事件订阅 `im.message.receive_v1`，消息回复接口 |
| 多维表格 | 承接质量事件、证据链、处置任务、复盘知识 | `bitable/v1/apps/:app_token/tables/:table_id/records` |
| 飞书任务 | 对高风险事件创建责任到人的任务 | 任务中心API或多维表格任务表 |
| Aily智能体 | 作为质量数字员工入口，编排问答、工具与流程 | 知识源 + 工具动作 + 人工确认 |
| Webhook机器人 | 低成本试点阶段快速推送群通知 | `bot/v2/hook` |

## 3. 环境变量

复制 `data/feishu_env_template.json`，按企业自建应用信息配置：

```powershell
$env:FEISHU_APP_ID="cli_xxx"
$env:FEISHU_APP_SECRET="xxx"
$env:FEISHU_BITABLE_APP_TOKEN="app_token_xxx"
$env:FEISHU_BITABLE_EVENT_TABLE_ID="tbl_xxx"
$env:FEISHU_BITABLE_TASK_TABLE_ID="tbl_xxx"
$env:FEISHU_WEBHOOK_URL="https://open.feishu.cn/open-apis/bot/v2/hook/xxx"
```

默认脚本以接口数据预览模式运行，不会调用真实飞书接口。确认权限和字段后，再添加 `--send` 执行真实写入。

## 4. 最小权限建议

- 多维表格：查看、评论、编辑和管理多维表格。
- 机器人：接收消息事件、发送消息。
- 任务：如使用飞书任务中心，申请创建和更新任务所需权限。
- 数据权限：应用需要成为目标多维表格的协作者，或由用户授权以 user_access_token 操作。

## 5. Aily配置清单

| 技能 | 触发条件 | 工具 | 安全约束 |
| --- | --- | --- | --- |
| 质量异常解释 | 用户询问事件ID、VIN、设备或工位 | query_quality_event、graph_rag_reason、list_evidence | 只解释证据链，不直接下达停线指令 |
| 主动风险播报 | 事件达到P0/P1或同类异常连续出现 | send_group_card、create_bitable_record、assign_task | P0/P1处置必须带人工确认 |
| 处置任务推进 | 任务逾期或复检未完成 | update_task_status、remind_owner、write_shift_report | 提醒频率受SLA限制 |
| 复盘知识沉淀 | 任务关闭或根因确认 | write_retrospective、update_graph、update_fmea | 复盘知识需质量工程师确认 |

## 6. 字段映射

| Agent输出 | 多维表格字段 | 说明 |
| --- | --- | --- |
| event_id | 事件ID | 主键 |
| risk | 风险等级 | P0/P1/P2/P3 |
| evidence_chain | 证据链 | 可存为长文本或关联证据表 |
| actions | 处置建议 | 自动拆分为任务记录 |
| root_cause_hypothesis | 疑似根因 | 关闭前为假设，复盘后为最终根因 |
| vin_scope | 影响范围 | VIN、批次、时间窗 |
| owner/sla/status | 任务负责人/SLA/状态 | 用于看板和催办 |
