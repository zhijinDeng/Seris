# 平台运行说明

## 本地工作台

入口文件：`D:\赛力斯\app\index.html`

运行步骤：双击入口文件即可打开工作台。左侧选择仿真工况，顶部点击“注入异常”切换事件，点击“关闭任务”查看复盘回写状态。中部数字员工窗口支持点击追问，右侧展示GraphRAG证据链、飞书协同任务和多维表格记录。

## 命令行运行

命令：`py D:\赛力斯\scripts\run_quality_agent.py`

脚本会读取`data/factory_events.csv`与`data/quality_cases.json`，完成风险分级、案例检索、证据链组织和飞书记录生成。

## 飞书接入

配置文件：`data/feishu_env_template.json`

对接方式：企业应用负责获取tenant_access_token，多维表格接口写入质量事件，自定义机器人向班组群发送卡片，Aily作为自然语言入口调用质量事件查询、任务更新和复盘回写能力。
