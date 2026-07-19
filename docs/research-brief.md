# 研究与资料依据

赛力斯超级工厂的公开资料显示，其质量管理已经具有强数据基础：全价值链数据互联互通、全过程质量数据采集、异常特征提取、控线、异常设备定位和一车一档。华为智慧园区案例进一步补足AIoT、生产网络、数字班组和AI检测点能力。由此可见，命题的突破点不是“有没有数据”，而是“数据能否主动组织成质量行动”。

制造业质量风险具有强关系特征。一个扭矩异常会关联拧紧枪、套筒、工位、螺栓、角度补偿、VIN、FMEA、复检规范和放行状态；焊接电流异常会关联电极帽寿命、二次回路、焊核直径和结构强度。知识图谱适合把这些关系显式化，GraphRAG适合在图谱路径和工艺文档之间进行多跳检索，因果约束适合排除不符合工序顺序的根因。

本方案从实际应用出发，把“知质·灵巡”设计为岗位化数字员工。它不是静态问答入口，而是围绕异常事件自动形成风险线程：捕捉信号、圈定影响范围、检索证据、生成处置任务、进入飞书协同、校验关闭条件、沉淀复盘知识。

## 资料来源

- 新华网：赛力斯超级工厂智能制造报道：https://www.xinhuanet.com/auto/20241218/569552f0399148ffb6172ba69f530ff3/c.html
- 华为企业业务：赛力斯超级工厂智慧园区案例：https://e.huawei.com/cn/case-studies/solutions/campus/202509-seres
- 飞书开放平台：多维表格新增记录：https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/create?lang=zh-CN
- 飞书开放平台：自定义机器人：https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN
- 飞书帮助中心：飞书 Aily：https://www.feishu.cn/hc/zh-CN/articles/790732948604-%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3%E9%A3%9E%E4%B9%A6-aily
- Interactive and Intelligent Root Cause Analysis in Manufacturing Processes：https://arxiv.org/pdf/2402.00043
- Document GraphRAG: Manufacturing Domain：https://www.mdpi.com/2079-9292/14/11/2102
- Fraunhofer: Graph RAG-Enhanced Intelligent Maintenance Chatbot：https://ceur-ws.org/Vol-4064/SKGi-paper3.pdf
- Engineering: HCP Knowledge Graph for Quality Control：https://www.engineering.org.cn/engi/EN/10.1016/j.eng.2024.03.022
