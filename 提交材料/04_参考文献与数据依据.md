# 参考文献与数据依据

## 一、企业业务依据

赛力斯集团2025年年度报告披露工业AI大模型、行业首创智能连接工艺系统、36,000+质量点位全自动实时监控，以及贯通生产、质量与供应链的“信息—决策—行动”闭环。2024年年度报告提出持续推进“产业大脑+超级工厂”引领的智能制造2.0建设；2025年半年度报告进一步披露数字孪生、人工智能、大数据和物联网的融合，以及关键生产工序、焊点质量和整车静态质量自动化检测能力；2024年ESG报告说明公司建立“一件一档、一车一档”追溯机制。

上述资料表明，赛力斯已有高质量数据采集与追溯基础。本方案不重复建设数据看板，而是补齐从异常信号到证据推理、责任任务、关闭验证和知识回写的主动质量风险层。

## 二、技术研究依据

Wehner等针对电动车制造根因分析提出知识图谱、因果贝叶斯网络和专家反馈结合的方法，说明专家知识能缩小因果搜索空间并减少伪因果。Root-KGD将工业数据特征与设备、物流等实体结合，用知识图谱定位根因并提供物理实体解释。Fraunhofer研究进一步将异常检测、时间有效因果图和反事实干预组合，使候选根因具有可验证、可证伪路径。制造问题求解GraphRAG研究把在线异常检测、FMEA贝叶斯网络、历史8D图谱和混合检索串联，为本方案的“发现—推理—行动”提供技术依据。Document GraphRAG和ProQ-KG分别支撑制造文档结构检索及产品—过程—资源—FMEA统一建模。

## 三、质量管理与可信AI依据

ISO 9001强调过程方法、风险思维、监视测量、形成文件的信息和持续改进。本方案据此把每次异常组织为包含风险、措施、验证、责任和回写的闭环。NIST AI RMF要求明确人机角色、监督机制、文档和审计，本方案据此设置P1人工确认、低置信降级、数据缺失停派和全链路审计。

ISO 23247-2从制造域实体和功能实体两个视角规定数字孪生参考架构，为设备、过程、产品和应用分层建模提供依据。OPC UA for ISA-95为设备、物料、人员及企业/控制系统信息交换提供统一语义。本方案据此定义OT现场、边缘、事件、知识、Agent和协同层，并固定阻断数字员工到PLC的控制写入路径。

NIST SP 800-82 Rev.3强调OT环境的可用性、安全性、网络分区、访问控制、监测与恢复。本方案据此设置OT控制区、边缘区、工业DMZ和IT应用区，只读采集、身份与序列号、数据质量隔离、模式权限、Outbox补偿和恢复演练。AIAG Control Plan与AIAG-VDA FMEA为过程功能、失效后果、失效模式、失效原因、预防/探测控制、行动优先级、反应计划和有效性验证提供汽车质量语义依据。

## 四、飞书能力依据

飞书开放平台多维表格支持表、字段、记录、视图、仪表盘、角色权限和自动化流程；任务v2支持负责人、关注人、子任务、评论、附件和幂等调用；消息卡片支持按钮、选择器和回传交互；文档OpenAPI支持创建和编辑结构化文档；任务与消息事件支持状态监听。由此形成“Base台账—卡片通知—任务执行—文档复盘—事件回写”的执行织网。

## 五、参考文献

1. 赛力斯集团股份有限公司. 2025年年度报告[EB/OL]. 2026-03-31. https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12037655&stockid=601127.
2. 赛力斯集团股份有限公司. 2024年年度报告[EB/OL]. 2025-04-01. https://cdn-web.seres.cn/uploads/20250401/5cb4a1a9711d4df2daabb14d964625a0.pdf.
3. 赛力斯集团股份有限公司. 2025年半年度报告[EB/OL]. 2025-09-02. https://cdn-web.seres.cn/uploads/20250902/16d86a4ef54310af944762148f4e9c3a.pdf.
4. 赛力斯集团股份有限公司. 2024年环境、社会及管治报告[EB/OL]. 2025-04-01. https://cdn-web.seres.cn/uploads/20250401/527578cbe5eb235154a0b049fa778022.pdf.
5. ISO. ISO 9001 explained: Quality management systems[EB/OL]. https://www.iso.org/home/insights-news/resources/iso-9001-explained.html.
6. National Institute of Standards and Technology. Artificial Intelligence Risk Management Framework 1.0[R]. NIST AI 100-1, 2023. https://doi.org/10.6028/NIST.AI.100-1.
7. Wehner C, Kertel M, Wewerka J, et al. Interactive and Intelligent Root Cause Analysis in Manufacturing with Causal Bayesian Networks and Knowledge Graphs[EB/OL]. arXiv:2402.00043, 2024. https://arxiv.org/abs/2402.00043.
8. Chen J, Qian J, Zhang X, et al. Root-KGD: A Novel Framework for Root Cause Diagnosis Based on Knowledge Graph and Industrial Data[EB/OL]. arXiv:2406.13664, 2024. https://arxiv.org/abs/2406.13664.
9. Knollmeyer S, Caymazer O, Grossmann D. Document GraphRAG: Knowledge Graph Enhanced Retrieval Augmented Generation for Document Question Answering Within the Manufacturing Domain[J]. Electronics, 2025, 14(11):2102. https://doi.org/10.3390/electronics14112102.
10. Kurniawan K, Kropatschek S, Kiesling E, et al. ProQ-KG: Integrated Cyber-Physical Production System Knowledge Graph for Quality Issue Analysis[EB/OL]. 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5273075.
11. Xu Z, Dang Y. Data-driven causal knowledge graph construction for root cause analysis in quality problem solving[J]. International Journal of Production Research, 2023, 61(14):4693-4711. https://doi.org/10.1080/00207543.2022.2137597.
12. 飞书开放平台. 多维表格概述[EB/OL]. https://open.feishu.cn/document/server-docs/docs/bitable-v1/bitable-overview?lang=zh-CN.
13. 飞书开放平台. 任务v2概述[EB/OL]. https://open.feishu.cn/document/task-v2/overview.
14. 飞书开放平台. 配置卡片交互[EB/OL]. https://open.feishu.cn/document/common-capabilities/message-card/add-card-interaction/interaction-module.
15. 飞书开放平台. 文档OpenAPI概述[EB/OL]. https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/docx-overview.
16. Rehak J, Sommer A, Becker M, et al. Counterfactual Root Cause Analysis via Anomaly Detection and Causal Graphs[C]. IEEE INDIN, 2023. https://doi.org/10.1109/INDIN51400.2023.10218245.
17. Rehak J, Youssef S, Beyerer J. Root cause analysis using anomaly detection and temporal informed causal graphs[C]. ML4CPS, 2024. https://doi.org/10.24406/publica-3069.
18. Kropatschek S, et al. Retrieval-Augmented Generation using Knowledge Graphs for Manufacturing Problem-Solving[C]. 2025. https://publica.fraunhofer.de/entities/publication/3ec641f3-33db-472b-8414-a1bb9e246a10.
19. ISO. ISO 23247-2:2021 Automation systems and integration - Digital twin framework for manufacturing - Part 2: Reference architecture[EB/OL]. https://www.iso.org/standard/78743.html.
20. OPC Foundation. OPC Unified Architecture - Common Object Model: ISA-95[EB/OL]. https://reference.opcfoundation.org/specs/OPC-10030/4.1.
21. National Institute of Standards and Technology. Guide to Operational Technology Security: NIST SP 800-82 Rev.3[EB/OL]. 2023. https://csrc.nist.gov/pubs/sp/800/82/r3/final.
22. Automotive Industry Action Group. Control Plan 1st Edition[EB/OL]. https://www.aiag.org/training-and-resources/manuals/details/CP-1.
23. Automotive Industry Action Group. AIAG & VDA FMEA Handbook[EB/OL]. https://www.aiag.org/training-and-resources/manuals/details/FMEAAV-1.
24. 飞书开放平台. 事件概述[EB/OL]. https://open.feishu.cn/document/server-docs/event-subscription-guide/overview?lang=zh-CN.
25. 飞书开放平台. 多维表格记录变更事件[EB/OL]. https://open.feishu.cn/document/docs/bitable-v1/events/bitable_record_changed.
26. 飞书开放平台. 获取多维表格自动化工作流[EB/OL]. https://open.feishu.cn/document/docs/bitable-v1/app-workflow/list?lang=zh-CN.

结构化参考目录保存在`data/reference_catalog.json`，每条来源标注其在方案中的使用位置。企业公开数字只作为场景依据，仿真参数不声称来自赛力斯真实产线。
