# 知质·灵巡｜赛力斯质量风险主动管控AI数字员工

智造知行队围绕赛力斯企业命题，建设一名能够主动捕捉设备与工艺异常、调用质量知识底座进行证据推理、组织跨角色处置并完成复盘学习的AI数字员工。作品不是通用问答机器人，而是位于MES/QMS/SCADA与现场岗位之间的质量风险工作层。

## 核心业务闭环

系统把每次设备报警、参数波动或检测异常组织成一条“质量风险线程”：事件ID关联设备、工位、工艺窗口、VIN/批次、FMEA、历史案例、根因假设、处置任务、SLA、复检结果和关闭依据。当前仓库实现了带来源片段的关系路径检索、时序检测、Top-3反事实重排和独立五门关闭状态机；生产版GraphRAG将在该机制原型上接入图数据库、向量索引、企业文档切片和查询轨迹服务。

赛力斯2025年年度报告披露工业AI大模型、行业首创智能连接工艺系统及36,000+质量点位全自动实时监控，并强调“信息—决策—行动”闭环。知质·灵巡补的是质量点位之上的风险决策与协同层，而不是重复建设采集看板。

## 已实现成果

- 企业级互动工作台：动态产线态势、回放时钟、时间序列主动预警、关系图查询路径、回答依据、稳定假设编号与Rank重排、一车一因果链、独立五门关闭、故障降级、事件护照、人机责任链和生产试点就绪门。
- 四类仿真工况：总装关键螺栓拧紧、焊装侧围点焊、涂装中涂烘干、一体化压铸冷却。
- 质量知识底座样例：本体、28个实例节点、24条关系边、历史案例、交互场景、事件准入契约和端到端查询轨迹。
- 飞书分层证据：质量事件Base写入回读已在线核验；任务与复盘文档提供对象样例；机器人卡片、Aily和事件订阅保留为生产接入项。
- 决赛材料：报名文本、开题报告、整体方案、平台说明、参考文献、完整案例、创新点、仿真设计和完整技术方案。

## 直接运行

下载仓库后直接打开`app/index.html`。选择工况后先查看由EWMA/CUSUM计算的弱信号和前置量，在反事实实验台选择动作并提交脱敏实测流程，再依次执行飞书派发、质量负责人确认、任务与知识回写验收和关闭校验。关闭动作只读取五项独立证据状态，不会反向制造“通过”结果。影子模式会阻断外部写入；L3生产权限不能由浏览器授予。

命令行验证：

```powershell
py scripts\test_event_contract.py
py scripts\run_quality_agent.py
py scripts\run_quality_agent.py --event CASE-TQ-20260719-01 --intervention socket-replace --mode collaborative --json
powershell -ExecutionPolicy Bypass -File scripts\orchestrate_feishu_quality_event.ps1 -WriteBase -CreateTask -CreateReviewDoc -DryRun
node --check app\app.js
node --check app\dashboard.js
py scripts\audit_materials.py
```

## 飞书在线证明

- 质量事件Base：<https://larkcommunity.feishu.cn/base/DYAabhZeiagT0ZsjGaTcWFPrn7b?table=tblFo5Btaj0IBXiD>
- 飞书任务：<https://applink.feishu.cn/client/todo/detail?guid=f10d51e5-cc8e-4c71-9441-cd29a77feacf>
- 复盘文档：<https://larkcommunity.feishu.cn/docx/PjludNq8foBhkrxV8VQccsldneb>

Base记录已完成写入和回读核验；任务与文档链接作为对象样例保留。机器人卡片、Aily技能、企业角色映射、原生审批和事件消费者的生产发布，需要在企业开发者后台完成可用范围、回调地址、职责分离和应用版本审批。

## 目录

- `app/`：互动工作台与数字员工视觉资产。
- `data/`：本体、关系图实例、事件JSON Schema、场景、主动检测与因果保障合同、飞书字段、编排样例和参考文献目录。
- `docs/`：架构、研究依据、飞书生产蓝图、90天计划、运行与验收说明。
- `docs/production-decision-assurance-contract.md`：OT/IT边界、事件契约、状态机、角色签署、降级与上线验收合同。
- `scripts/`：推理、飞书编排、材料生成与审计脚本。
- `提交材料/`：决赛提交用Markdown与DOCX文件。

## 工程与治理边界

演示工艺参数、检测签署身份和时间序列为脱敏仿真数据，不代表赛力斯真实工艺窗口或现网收益。页面签署与确认只验证流程机制，生产身份、量具、附件、审批实例和不可覆盖时间戳必须由服务端及飞书企业应用回读。系统首期只做决策支持和协同执行，不直接修改PLC/SCADA参数，不替代质量负责人放行，不自动关闭P1事件。公共仓库不提交app secret、access token、refresh token和企业内部人员映射。

GitHub：<https://github.com/zhijinDeng/Seris>
