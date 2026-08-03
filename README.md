# 知质·灵巡｜赛力斯质量风险主动管控AI数字员工

智造知行队围绕赛力斯企业命题，建设一名能够主动捕捉设备与工艺异常、调用质量知识底座进行证据推理、组织跨角色处置并完成复盘学习的AI数字员工。作品不是通用问答机器人，而是位于MES/QMS/SCADA与现场岗位之间的质量风险工作层。

## 核心业务闭环

系统把每次设备报警、参数波动或检测异常组织成一条“质量风险线程”：事件ID关联设备、工位、工艺窗口、VIN/批次、FMEA、历史案例、根因假设、处置任务、SLA、复检结果和关闭依据。知识图谱负责关系收敛，GraphRAG补充FMEA、SOP、维修和历史8D证据，Agent执行“观察—研判—检索—推理—行动—复盘”，飞书承接台账、任务、消息和知识沉淀。

## 已实现成果

- 企业级互动工作台：实时事件队列、工艺趋势、数字员工对话、GraphRAG路径、一车一因果链、风险拆解、处置编排、人工安全门、飞书在线证明和价值指标。
- 四类仿真工况：总装关键螺栓拧紧、焊装侧围点焊、涂装中涂烘干、一体化压铸冷却。
- 质量知识底座样例：本体、历史案例、交互场景、工厂事件和端到端证据轨迹。
- 飞书在线闭环：13字段质量事件Base、事件ID幂等任务、结构化复盘文档，均已完成真实创建与回验。
- 决赛材料：报名文本、开题报告、整体方案、平台说明、参考文献、完整案例、创新点、仿真设计和完整技术方案。

## 直接运行

打开`D:\赛力斯\app\index.html`。依次点击“注入下一工况”“派发飞书闭环”“人工确认处置”“验证并关闭”，即可查看从感知到行动再到知识回写的完整状态变化。数字员工窗口支持快捷追问和自定义问题，证据包可导出为JSON。

命令行验证：

```powershell
py D:\赛力斯\scripts\run_quality_agent.py
powershell -ExecutionPolicy Bypass -File D:\赛力斯\scripts\orchestrate_feishu_quality_event.ps1 -WriteBase -CreateTask -CreateReviewDoc -DryRun
node --check D:\赛力斯\app\app.js
node --check D:\赛力斯\app\dashboard.js
py D:\赛力斯\scripts\audit_materials.py
```

## 飞书在线证明

- 质量事件Base：<https://larkcommunity.feishu.cn/base/DYAabhZeiagT0ZsjGaTcWFPrn7b?table=tblFo5Btaj0IBXiD>
- 飞书任务：<https://applink.feishu.cn/client/todo/detail?guid=f10d51e5-cc8e-4c71-9441-cd29a77feacf>
- 复盘文档：<https://larkcommunity.feishu.cn/docx/PjludNq8foBhkrxV8VQccsldneb>

在线对象证明Base、任务和文档链路可以运行。机器人卡片、Aily技能和任务事件长连接的生产发布，需要在企业开发者后台完成可用范围、事件订阅、回调地址和应用版本审批。

## 目录

- `app/`：互动工作台与数字员工视觉资产。
- `data/`：本体、场景、事件、飞书字段、编排样例和参考文献目录。
- `docs/`：架构、研究依据、飞书生产蓝图、90天计划、运行与验收说明。
- `scripts/`：推理、飞书编排、材料生成与审计脚本。
- `提交材料/`：决赛提交用Markdown与DOCX文件。

## 工程与治理边界

演示工艺参数为脱敏仿真数据，不代表赛力斯真实工艺窗口。系统首期只做决策支持和协同执行，不直接修改PLC/SCADA参数，不替代质量负责人放行，不自动关闭P1事件。公共仓库不提交app secret、access token、refresh token和企业内部人员映射。

GitHub：<https://github.com/zhijinDeng/Seris>
