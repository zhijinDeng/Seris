# 参考文献与数据依据

## 一、企业业务依据

赛力斯集团2024年年度报告提出持续推进“产业大脑+超级工厂”引领的智能制造2.0建设，并披露大模型技术赋能研发、生产、销售和服务全链路。2025年半年度报告进一步披露数字孪生、人工智能、大数据和物联网的融合，以及关键生产工序、焊点质量和整车静态质量自动化检测能力。2024年ESG报告说明公司构建全生命周期质量管控机制，使用AI监测、虚拟调试和数字孪生，并建立“一件一档、一车一档”追溯机制。

上述资料表明，赛力斯已有高质量数据采集与追溯基础。本方案不重复建设数据看板，而是补齐从异常信号到证据推理、责任任务、关闭验证和知识回写的主动质量风险层。

## 二、技术研究依据

Wehner等针对电动车制造根因分析提出知识图谱、因果贝叶斯网络和专家反馈结合的方法，说明专家知识能缩小因果搜索空间并减少伪因果。Root-KGD将工业数据特征与设备、物流等实体结合，用知识图谱定位根因并提供物理实体解释。Document GraphRAG通过文档结构图和语义连接改善制造领域检索精度。ProQ-KG统一产品、过程、资源和FMEA知识，并在汽车工业伙伴案例中验证跨角色质量问题分析价值。Xu和Dang则从历史质量问题解决数据中挖掘因果知识，为复盘知识回写提供方法依据。

## 三、质量管理与可信AI依据

ISO 9001强调过程方法、风险思维、监视测量、形成文件的信息和持续改进。本方案据此把每次异常组织为包含风险、措施、验证、责任和回写的闭环。NIST AI RMF要求明确人机角色、监督机制、文档和审计，本方案据此设置P1人工确认、低置信降级、数据缺失停派和全链路审计。

## 四、飞书能力依据

飞书开放平台多维表格支持表、字段、记录、视图、仪表盘、角色权限和自动化流程；任务v2支持负责人、关注人、子任务、评论、附件和幂等调用；消息卡片支持按钮、选择器和回传交互；文档OpenAPI支持创建和编辑结构化文档；任务与消息事件支持状态监听。由此形成“Base台账—卡片通知—任务执行—文档复盘—事件回写”的执行织网。

## 五、参考文献

1. 赛力斯集团股份有限公司. 2024年年度报告[EB/OL]. 2025-04-01. https://cdn-web.seres.cn/uploads/20250401/5cb4a1a9711d4df2daabb14d964625a0.pdf.
2. 赛力斯集团股份有限公司. 2025年半年度报告[EB/OL]. 2025-09-02. https://cdn-web.seres.cn/uploads/20250902/16d86a4ef54310af944762148f4e9c3a.pdf.
3. 赛力斯集团股份有限公司. 2024年环境、社会及管治报告[EB/OL]. 2025-04-01. https://cdn-web.seres.cn/uploads/20250401/527578cbe5eb235154a0b049fa778022.pdf.
4. ISO. ISO 9001 explained: Quality management systems[EB/OL]. https://www.iso.org/home/insights-news/resources/iso-9001-explained.html.
5. National Institute of Standards and Technology. Artificial Intelligence Risk Management Framework 1.0[R]. NIST AI 100-1, 2023. https://doi.org/10.6028/NIST.AI.100-1.
6. Wehner C, Kertel M, Wewerka J, et al. Interactive and Intelligent Root Cause Analysis in Manufacturing with Causal Bayesian Networks and Knowledge Graphs[EB/OL]. arXiv:2402.00043, 2024. https://arxiv.org/abs/2402.00043.
7. Chen J, Qian J, Zhang X, et al. Root-KGD: A Novel Framework for Root Cause Diagnosis Based on Knowledge Graph and Industrial Data[EB/OL]. arXiv:2406.13664, 2024. https://arxiv.org/abs/2406.13664.
8. Knollmeyer S, Caymazer O, Grossmann D. Document GraphRAG: Knowledge Graph Enhanced Retrieval Augmented Generation for Document Question Answering Within the Manufacturing Domain[J]. Electronics, 2025, 14(11):2102. https://doi.org/10.3390/electronics14112102.
9. Kurniawan K, Kropatschek S, Kiesling E, et al. ProQ-KG: Integrated Cyber-Physical Production System Knowledge Graph for Quality Issue Analysis[EB/OL]. 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5273075.
10. Xu Z, Dang Y. Data-driven causal knowledge graph construction for root cause analysis in quality problem solving[J]. International Journal of Production Research, 2023, 61(14):4693-4711. https://doi.org/10.1080/00207543.2022.2137597.
11. 飞书开放平台. 多维表格概述[EB/OL]. https://open.feishu.cn/document/server-docs/docs/bitable-v1/bitable-overview?lang=zh-CN.
12. 飞书开放平台. 任务v2概述[EB/OL]. https://open.feishu.cn/document/task-v2/overview.
13. 飞书开放平台. 配置卡片交互[EB/OL]. https://open.feishu.cn/document/common-capabilities/message-card/add-card-interaction/interaction-module.
14. 飞书开放平台. 文档OpenAPI概述[EB/OL]. https://open.feishu.cn/document/server-docs/docs/docs/docx-v1/docx-overview.

结构化参考目录保存在`data/reference_catalog.json`，每条来源标注其在方案中的使用位置。企业公开数字只作为场景依据，仿真参数不声称来自赛力斯真实产线。
