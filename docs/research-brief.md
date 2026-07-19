# 命题理解与资料依据

## 命题判断

赛力斯命题的价值点不在于展示一个通用AI助手，而在于把高自动化工厂中最难被提前发现的设备质量风险管起来。新能源汽车生产中，质量风险常常先表现为设备退化、参数漂移、校准偏移、批次波动或人员处置延迟，最终才在检测、返修或客户质量问题中暴露。

因此，本方案把问题定义为“设备质量风险的主动闭环”：系统需要在缺陷形成前识别苗头，在影响扩大前圈定范围，在人员处置前组织证据，在关闭后把经验沉淀为下一次识别能力。

## 公开资料洞察

赛力斯超级工厂公开资料强调全价值链质量数据、异常特征自动提取、判断并控线、异常设备定位和一车一档。华为智慧园区案例说明AI、联接、计算、存储、云、数字能源、AIoT检测和数字班组为智能制造提供底座。飞书Aily、多维表格和自定义机器人可承接跨角色任务流转。

这些资料共同指向一个结论：赛力斯已经具备数据采集基础，方案应把重点放在质量知识组织、风险推理和协同执行。

## 技术依据

制造质量问题具有多跳关系：设备状态影响工艺参数，参数漂移影响质量特性，质量特性关联缺陷模式，缺陷模式对应根因、检测方法、控制计划和维修动作。知识图谱适合表达这种关系，GraphRAG适合结合图谱路径和文档证据，因果约束适合排除不符合工序方向的解释。

## 资料来源

- 新华网：《赛力斯超级工厂树立行业标杆 以智能制造加速发展新质生产力》。
- 华为企业业务：《解码赛力斯超级工厂智慧园区，共启“智”造新时代》。
- 飞书开放平台：多维表格记录接口、自定义机器人、Aily相关资料。
- Interactive and Intelligent Root Cause Analysis in Manufacturing Processes。
- Document GraphRAG: Knowledge Graph Enhanced Retrieval Augmented Generation for Document Question Answering Within the Manufacturing Domain。
- An Intelligent Quality Control Method for Manufacturing Processes Based on a Human-Cyber-Physical Knowledge Graph。
