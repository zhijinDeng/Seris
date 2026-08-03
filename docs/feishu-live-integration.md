# 飞书在线闭环接入

本项目已把“知质·灵巡”数字员工接入本机 Feishu CLI 用户授权，用于把质量风险事件同步到多维表格，并为 Aily、机器人卡片和责任任务流转提供同一份事件事实。

## 当前接入范围

- 授权身份：用户身份，已具备 Base 表格、记录、字段、文档、任务、IM 等相关范围。
- 目标多维表格：`https://larkcommunity.feishu.cn/base/DYAabhZeiagT0ZsjGaTcWFPrn7b`
- 在线事件表：`赛力斯质量风险事件闭环`
- 本地执行脚本：`D:\赛力斯\scripts\sync_feishu_quality_event.ps1`
- 字段 schema：`D:\赛力斯\data\feishu_quality_event_fields.json`
- 样例事件：`D:\赛力斯\data\feishu_live_quality_event_record.json`

## 运行方式

首次创建在线事件表并写入样例记录：

```powershell
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\sync_feishu_quality_event.ps1 -CreateTable -WriteRecord
```

后续按事件ID更新或创建记录：

```powershell
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\sync_feishu_quality_event.ps1 -WriteRecord
```

运行后会更新：

- `D:\赛力斯\config\feishu_live_base.json`
- `D:\赛力斯\data\feishu_live_connection.status.json`

## 业务闭环

1. 设备或工艺事件进入质量事件表，保留事件 ID、风险等级、时间、设备、工位、影响范围和证据链。
2. 数字员工根据本体约束、GraphRAG 证据和历史案例生成根因假设与处置方案。
3. 当前由任务v2和复盘文档承接责任、SLA与证据；生产发布后由Aily查询和机器人卡片进入责任群协同。
4. 复检、维修和关闭依据回写多维表格，再沉淀到质量知识图谱，支撑下一次主动识别。

该接入保持“决策支持、人工确认、闭环复盘”的实施边界，不直接替代 DCS、PLC、MES 的安全控制和设备启停。

## 幂等策略

同步脚本先按“事件ID”过滤查询。命中时携带记录ID更新，未命中时创建；历史测试重复项只计数、不自动删除。2026-08-03在线复测中，同步前后记录数均为4，更新记录为`recvrcdCDJe5bP`，未新增重复项。
