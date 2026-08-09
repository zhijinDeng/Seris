# 飞书生产接入指南

## 已完成环境

本机已安装Node.js 24、`lark-cli 1.0.81`和飞书事件桥接组件；企业应用已完成机器人身份与用户身份配置，在线质量事件表、任务和复盘文档已完成创建与回验。用户授权具有时效性，任何写入前先运行`lark-cli auth status`，失效时重新登录，不以历史授权状态替代当前检查。

## 一键编排

干跑验证：

```powershell
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\orchestrate_feishu_quality_event.ps1 -WriteBase -CreateTask -CreateReviewDoc -DryRun
```

创建飞书任务与复盘文档：

```powershell
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\orchestrate_feishu_quality_event.ps1 -CreateTask -CreateReviewDoc
```

同步质量事件Base：

```powershell
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\sync_feishu_quality_event.ps1 -WriteRecord
```

脚本读取`data/feishu_orchestration_event.json`，自动获取当前授权用户open_id，用事件ID构造任务幂等键，并把任务嵌入复盘文档。运行状态写入本地忽略文件，不提交访问令牌或应用密钥。

## 开发者后台配置

生产上线前在飞书开发者后台完成四项配置：把机器人可用范围限制到试点组织；开通消息与任务事件；配置卡片回调或长连接事件消费；发布应用版本并由企业管理员审核。消息卡片回传需要校验事件签名、在3秒内应答，并通过后台任务执行耗时操作。

## 数据表和权限

生产Base采用事件、任务、复检、维修、审批、知识六表模型。角色权限遵循最小授权：班组只更新接单与处置状态；检测人员签署实测和量具状态；设备工程师更新维修与首件字段；质量工程师管理影响范围与风险受理；质量负责人确认P1关闭；知识管理员审核PFMEA和控制计划映射。VIN、供应商批次和质量缺陷按企业数据分级策略脱敏。

## 事件消费者

任务状态使用`task.task.update_user_access_v2`，机器人入口使用`im.message.receive_v1`或卡片交互事件。消费者启动后先等待CLI ready标记，再读取NDJSON事件；使用message_id、event_id和task_guid去重；退出采用正常信号或关闭stdin，不强制终止，以免遗留订阅关系。

## 业务键幂等与补偿

Base同步先按“事件ID”过滤查询：命中则携带`record-id`更新，未命中才创建；若历史测试已产生重复记录，只更新最新记录并在状态文件记录重复数量，不自动删除审计数据。任务和消息分别使用事件ID派生的幂等键。接口异常时保留本地事件包与同步状态，恢复后沿用原事件ID补偿，防止重复派单和重复通知。

## 安全边界

Base、任务和文档属于协同层，不直接写PLC/SCADA控制参数。P1处置与最终放行必须由企业授权岗位确认。凭证只保存在飞书CLI本地安全配置，GitHub仅保留样例配置；公共仓库不提交app secret、access token、refresh token和组织内部人员映射。
