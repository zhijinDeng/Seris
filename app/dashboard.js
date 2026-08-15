const qualityScenarios = window.qualityScenarios || [];

const companyDataset = {
  provenance: "company_dataset_profile.json · schema 1.0 · 赛事历史静态脱敏快照",
  counts: [
    ["设备类别", "625"], ["设备实例", "9,673"], ["设备功能", "336"], ["失效模式", "1,287"], ["故障工单", "406"]
  ],
  funnel: [
    ["故障工单", 406, 100], ["有效设备关联", 383, 94.3], ["失效模式关联", 71, 17.5], ["类型一致知识链", 62, 15.3]
  ],
  flagship: {
    eventId: "CASE-KD-20260812-05",
    equipment: "EQ-XBB841ED4011",
    equipmentType: "ET-X23C58B2E6F0",
    sibling: "EQ-X97058A25213",
    workOrders: 121,
    closed: 119,
    unknownCause: 120,
    genericAction: 121,
    linkedFailureMode: 0,
    candidates: ["FM-XF976CAACE89", "FM-X057C259452B"]
  }
};

const references = [
  {
    type: "企业官方",
    title: "赛力斯集团2025年年度报告",
    detail: "披露工业AI大模型、行业首创智能连接工艺系统及36,000+质量点位全自动实时监控，并以‘信息—决策—行动’闭环强化生产、质量与供应链协同。",
    url: "https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12037655&stockid=601127"
  },
  {
    type: "企业官方",
    title: "赛力斯集团2024年年度报告",
    detail: "提出‘产业大脑+超级工厂’智能制造2.0、全过程在线检测与AI创新应用，为主动质量风险管控提供真实业务底座。",
    url: "https://cdn-web.seres.cn/uploads/20250401/5cb4a1a9711d4df2daabb14d964625a0.pdf"
  },
  {
    type: "企业官方",
    title: "赛力斯集团2025年半年度报告",
    detail: "披露数字孪生、AI、大数据与物联网融合，以及关键工序、焊点质量和整车静态质量自动化检测基础。",
    url: "https://cdn-web.seres.cn/uploads/20250902/16d86a4ef54310af944762148f4e9c3a.pdf"
  },
  {
    type: "企业官方",
    title: "赛力斯2024年ESG报告",
    detail: "强调全生命周期质量管控、AI监测、虚拟调试、数字孪生和‘一件一档、一车一档’追溯机制。",
    url: "https://cdn-web.seres.cn/uploads/20250401/527578cbe5eb235154a0b049fa778022.pdf"
  },
  {
    type: "飞书官方",
    title: "飞书多维表格与自动化流程",
    detail: "多维表格支持表、字段、记录、视图、仪表盘、角色权限与自动化流程，可承接统一质量事件台账。",
    url: "https://open.feishu.cn/document/server-docs/docs/bitable-v1/bitable-overview?lang=zh-CN"
  },
  {
    type: "飞书官方",
    title: "飞书任务 v2",
    detail: "支持负责人、关注人、子任务、评论、附件与幂等调用，适合质量事件跨专业协同及SLA追踪。",
    url: "https://open.feishu.cn/document/task-v2/overview"
  },
  {
    type: "飞书官方",
    title: "消息卡片交互",
    detail: "按钮、选择器与回传交互可让责任人在群消息中直接确认隔离、复检与关闭动作。",
    url: "https://open.feishu.cn/document/common-capabilities/message-card/add-card-interaction/interaction-module"
  },
  {
    type: "国际标准",
    title: "ISO 9001：风险思维与持续改进",
    detail: "质量管理强调过程方法、风险思维、监视测量、形成文件的信息和持续改进。",
    url: "https://www.iso.org/home/insights-news/resources/iso-9001-explained.html"
  },
  {
    type: "可信AI",
    title: "NIST AI RMF：人机角色与监督",
    detail: "要求明确AI与人的职责、应用边界、监督方式和可审计文档，支撑本方案的安全门与人工放行。",
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  },
  {
    type: "制造标准",
    title: "ISO 23247-2 制造数字孪生参考架构",
    detail: "从制造域实体与功能实体两个视角定义数字孪生参考架构，支撑设备、过程、产品与应用的分层建模。",
    url: "https://www.iso.org/standard/78743.html"
  },
  {
    type: "互操作标准",
    title: "OPC UA for ISA-95 Common Object Model",
    detail: "为设备、物料、人员与企业/控制系统信息交换提供统一语义，支持从现场层到MES/ERP的受控数据通道。",
    url: "https://reference.opcfoundation.org/specs/OPC-10030/4.1"
  },
  {
    type: "OT安全",
    title: "NIST SP 800-82 Rev.3",
    detail: "工业控制系统安全指南要求结合可用性、安全性与性能约束实施网络分区、访问控制、监测与恢复。",
    url: "https://csrc.nist.gov/pubs/sp/800/82/r3/final"
  },
  {
    type: "质量方法",
    title: "AIAG Control Plan",
    detail: "控制计划指南覆盖高度自动化制造、安全投产与反应计划，为复检准则、首件确认和系统性纠正提供方法依据。",
    url: "https://www.aiag.org/training-and-resources/manuals/details/CP-1"
  },
  {
    type: "研究论文",
    title: "Interactive RCA in EV Manufacturing",
    detail: "电动车制造研究验证了知识图谱、因果网络和专家反馈结合可减少伪因果并形成可交互根因闭环。",
    url: "https://arxiv.org/abs/2402.00043"
  },
  {
    type: "研究论文",
    title: "Root-KGD：知识图谱与工业数据融合根因诊断",
    detail: "将现场数据特征与设备、物流等物理实体关联，提升在线根因定位的准确性与可解释性。",
    url: "https://arxiv.org/abs/2406.13664"
  },
  {
    type: "研究论文",
    title: "Document GraphRAG for Manufacturing",
    detail: "通过文档结构图和语义连接改进制造领域检索精度，为FMEA、SOP与历史8D证据整合提供依据。",
    url: "https://www.mdpi.com/2079-9292/14/11/2102"
  },
  {
    type: "研究论文",
    title: "ProQ-KG：PPR-FMEA质量知识图谱",
    detail: "统一产品、过程、资源与FMEA知识，在汽车行业案例中支撑跨角色质量问题分析。",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5273075"
  },
  {
    type: "研究论文",
    title: "异常检测与因果图的反事实根因分析",
    detail: "将异常检测、因果图与反事实验证组合，用可检验干预区分相关性线索和可行动根因。",
    url: "https://publica.fraunhofer.de/entities/publication/6127ab3d-d45b-4fc1-a57c-2dae8ed2082f"
  },
  {
    type: "研究论文",
    title: "制造问题求解的知识图谱增强RAG",
    detail: "把在线异常检测、FMEA因果网络、历史8D图谱和混合检索串成制造问题求解链。",
    url: "https://publica.fraunhofer.de/entities/publication/3ec641f3-33db-472b-8414-a1bb9e246a10"
  },
  {
    type: "公开数据集",
    title: "UCI SECOM",
    detail: "1567条半导体制造样本、591个匿名特征、时间戳、缺失值和合格标签；仅用于通用检测、数据治理和事件编排验证。",
    url: "https://archive.ics.uci.edu/dataset/179/secom"
  }
];

const feishuCapabilities = [
  { name: "多维表格", use: "统一事件、VIN/批次、证据、任务、SLA和关闭字段", status: "已在线核验" },
  { name: "机器人卡片", use: "P1/P2分级通知，在群内确认隔离与复检", status: "接口原型" },
  { name: "任务中心", use: "负责人、关注人、截止时间、子任务、评论与附件", status: "对象样例" },
  { name: "Aily", use: "@数字员工查询证据链、影响范围和关闭条件", status: "待配置" },
  { name: "云文档/知识库", use: "自动生成事件复盘、8D证据包和知识条目", status: "对象样例" },
  { name: "事件订阅", use: "监听记录与审批状态，驱动闭环回写", status: "待部署" }
];

const valueTargets = [
  { label: "缺陷显性化前置量", value: "不少于 10 分钟", note: "以风险线程首次达到派单阈值至下游检验理论发现时点的时间差验收。" },
  { label: "异常定位时间", value: "下降 40%–60%", note: "对比人工跨MES、设备、维修与FMEA查询耗时。" },
  { label: "P1任务派发", value: "小于 1 分钟", note: "从风险触发到飞书任务和卡片生成的系统时间戳。" },
  { label: "根因 Top-3 命中", value: "不低于 80%", note: "以质量工程师最终复盘根因为金标准进行盲测。" },
  { label: "复盘知识沉淀", value: "不低于 90%", note: "关闭事件的根因、措施、复检与责任确认字段完整率。" }
];

const assuranceProfiles = {
  "CASE-TQ-20260719-01": {
    leadMinutes: 22,
    consensus: "4/4",
    weakSignal: "EWMA均值偏移",
    weakSignalDetail: "连续6周期偏离基线0.8σ",
    escalationBasis: "CUSUM + 连续VIN + FMEA",
    stages: [["14:02", "稳定基线", "过程能力窗内"], ["14:08", "弱漂移", "EWMA先于硬阈值触发"], ["14:16", "风险收敛", "连续VIN与案例关系命中"], ["14:30", "理论显性点", "下游路试/抽检可能发现"]],
    hypotheses: [
      { name: "套筒磨损叠加校准漂移", score: 86, support: "同点位复现、角度补偿同步、C-009命中", conflict: "套筒账面寿命尚未到阈值", test: "更换套筒并用标准件复校；若扭矩恢复则增强" },
      { name: "螺纹摩擦系数批次异常", score: 57, support: "扭矩与角度关系存在偏离", conflict: "不同零件批次仍集中于同一设备", test: "抽取三件测摩擦系数并交叉换枪复拧" },
      { name: "拧紧程序或配方错配", score: 34, support: "异常表现可由目标值错配造成", conflict: "PLC配方哈希与已批准版本一致", test: "复核VIN配置、程序版本和参数下发日志" }
    ],
    guards: [["时序先行", "通过", "设备漂移早于扭矩越界"], ["机制一致", "通过", "磨损可解释扭矩/角度联动"], ["同位复现", "通过", "同枪同点位连续3车"], ["反证检查", "待验证", "需更换套筒交叉复拧"], ["数据完整", "通过", "MES、PLC、校准与案例可追溯"]],
    traces: [
      { id: "VIN 8123", state: "复检待办", detail: "14:18过站 · 86.4N·m · TQ-17/程序v5.2 · 已隔离" },
      { id: "VIN 8124", state: "待下线", detail: "14:22过站 · 88.1N·m · 同点位复现 · 禁止自动放行" },
      { id: "VIN 8125", state: "路试拦截", detail: "14:26过站 · 89.0N·m · 路试前拦截 · 待复检" }
    ],
    signal: { baselineMean: 100, baselineStd: 1.5, downstreamTime: "14:38", points: [["14:02",100.2,0],["14:04",99.8,0],["14:06",99.4,0],["14:08",98.8,0],["14:10",98.1,0],["14:12",97.4,0],["14:14",96.7,0],["14:16",95.8,1],["14:18",86.4,1]] },
    interventions: [
      { id: "socket-replace", label: "更换套筒 + 标准件复校", measurement: "标准件扭矩、角度残差、量具校准状态", criterion: "扭矩92-108N·m且角度残差回到基线", signer: "检测岗位 QC-03", result: "复校后标准件扭矩回到99.1N·m，角度残差收敛至基线内。", conclusion: "干预方向与机理一致，Top-1得到增强；仍须完成影响VIN复检。", posterior: [93,31,14] },
      { id: "cross-tool", label: "交叉换枪复拧", measurement: "原枪/替代枪复拧扭矩与角度", criterion: "替代枪合格且原枪可复现偏差", signer: "检测岗位 QC-03", result: "同批螺栓换枪后恢复，原枪复现偏低；零件批次效应减弱。", conclusion: "设备侧原因增强，螺纹摩擦批次假设降级。", posterior: [89,22,18] }
    ]
  },
  "CASE-WD-20260719-02": {
    leadMinutes: 31, consensus: "3/4", weakSignal: "电流CUSUM下移", weakSignalDetail: "12分钟缓慢漂移，未触发停机", escalationBasis: "CUSUM + 电极寿命 + 焊核风险",
    stages: [["09:41", "稳定基线", "电流处于规范中心"], ["09:48", "弱漂移", "CUSUM持续下移"], ["09:53", "风险收敛", "电极寿命与回路阻抗共同命中"], ["10:24", "理论显性点", "焊核抽检可能发现"]],
    hypotheses: [
      { name: "电极帽磨损", score: 79, support: "寿命92%、电流补偿失败", conflict: "尚无焊核实测结果", test: "更换电极帽后做破坏性焊核对照" },
      { name: "二次回路接触电阻升高", score: 68, support: "点检趋势与电流下探同窗", conflict: "机器人其他焊点暂未同步异常", test: "测量回路阻抗并复紧连接点" },
      { name: "板材搭接间隙波动", score: 39, support: "可造成局部热输入不足", conflict: "异常跨多个车身重复", test: "抽检搭接间隙并与相邻工位对照" }
    ],
    guards: [["时序先行", "通过", "寿命/阻抗变化早于电流越界"], ["机制一致", "通过", "热输入不足机制成立"], ["同位复现", "通过", "RB-42关键区域持续复现"], ["反证检查", "待验证", "等待换帽后焊核对照"], ["数据完整", "通过", "焊接、寿命、MES记录齐全"]],
    traces: [{ id: "VIN 8151", state: "焊核抽检", detail: "09:53过站 · 首个收敛对象 · 已锁定" }, { id: "VIN 8159", state: "批次隔离", detail: "10:01过站 · 漂移中段 · 禁止转序" }, { id: "VIN 8168", state: "范围边界", detail: "10:12过站 · 末个影响对象 · 待抽检" }],
    signal: { baselineMean: 7.82, baselineStd: 0.12, downstreamTime: "10:24", points: [["09:41",7.84,0],["09:44",7.80,0],["09:47",7.76,0],["09:48",7.70,0],["09:50",7.62,0],["09:51",7.54,0],["09:52",7.46,0],["09:53",7.38,1],["09:56",7.10,1]] },
    interventions: [
      { id: "cap-change", label: "更换电极帽 + 焊核对照", measurement: "焊接电流、焊核直径、检测设备校准状态", criterion: "电流7.4-8.2kA且焊核满足控制计划", signer: "焊装检测岗位 BIW-QC-02", result: "换帽后电流回归7.81kA，破坏性焊核直径达到控制计划要求。", conclusion: "Top-1增强，但批次仅可在全部抽检与首件确认后解冻。", posterior: [91,34,12] },
      { id: "loop-test", label: "二次回路阻抗阶跃检查", measurement: "复紧前后回路阻抗和电流补偿量", criterion: "阻抗回到点检基线且电流恢复", signer: "焊装检测岗位 BIW-QC-02", result: "复紧连接点后阻抗下降18%，电流补偿恢复。", conclusion: "Top-2上升并与电极帽磨损形成并发原因，需拆分纠正措施。", posterior: [68,82,10] }
    ]
  },
  "CASE-PA-20260719-03": {
    leadMinutes: 18, consensus: "3/4", weakSignal: "风门响应残差", weakSignalDetail: "指令-反馈延迟连续扩大", escalationBasis: "残差 + 温度窗口 + 过站时间窗",
    stages: [["16:06", "稳定基线", "温控回路响应正常"], ["16:11", "弱漂移", "风门响应残差扩大"], ["16:19", "风险收敛", "温度低限与MES窗口关联"], ["16:37", "理论显性点", "附着力复测可能发现"]],
    hypotheses: [
      { name: "风门执行机构响应滞后", score: 72, support: "指令-反馈残差与温度同窗", conflict: "尚未完成执行器行程点检", test: "阶跃测试风门响应时间并复测温升" },
      { name: "温控PID调节不足", score: 55, support: "低温持续且回升缓慢", conflict: "历史同配方运行稳定", test: "比对PID输出与同型烘房基线" },
      { name: "车身负载突变", score: 28, support: "负载变化可影响热平衡", conflict: "生产节拍和车型组合未突变", test: "核对进炉序列与热负载模型" }
    ],
    guards: [["时序先行", "通过", "反馈残差早于低温事件"], ["机制一致", "通过", "风量不足可解释固化风险"], ["同位复现", "通过", "三区连续8分钟"], ["反证检查", "待验证", "需执行器阶跃试验"], ["数据完整", "通过", "温度、风门、MES记录齐全"]],
    traces: [{ id: "VIN 8201", state: "复测队列", detail: "16:19进炉 · 时间窗起点 · 附着力复测" }, { id: "VIN 8208", state: "隔离", detail: "16:25进炉 · 低温核心段 · 暂缓放行" }, { id: "VIN 8216", state: "范围边界", detail: "16:33进炉 · 温度恢复前末车" }],
    signal: { baselineMean: 156, baselineStd: 1.2, downstreamTime: "16:37", points: [["16:06",156.2,0],["16:08",155.8,0],["16:10",155.4,0],["16:11",154.8,0],["16:14",154.0,0],["16:17",153.2,0],["16:19",152.5,1],["16:22",151.6,1],["16:25",148.0,1]] },
    interventions: [
      { id: "damper-step", label: "风门阶跃试验 + 温升复测", measurement: "执行器响应时间、三区温度、附着力复测", criterion: "响应不高于4s且温度进入152-160℃", signer: "涂装检测岗位 PA-QC-01", result: "执行器响应由8.6s恢复至3.1s，三区温度重新进入154-157℃。", conclusion: "Top-1增强；车辆仍需完成膜厚与附着力复测。", posterior: [90,29,8] },
      { id: "pid-compare", label: "同型烘房 PID 基线对照", measurement: "PID输出、风门反馈和同型烘房基线", criterion: "PID输出偏差在批准容差内", signer: "涂装检测岗位 PA-QC-01", result: "PID输出与基线一致，但风门反馈仍滞后。", conclusion: "Top-2被削弱，执行机构假设继续保持首位。", posterior: [84,18,11] }
    ]
  },
  "CASE-DC-20260719-04": {
    leadMinutes: 46, consensus: "4/4", weakSignal: "水路流量残差", weakSignalDetail: "局部支路波动先于模温差扩大", escalationBasis: "残差 + 模温差 + 结构件严重度",
    stages: [["11:07", "稳定基线", "水路与模温平衡"], ["11:18", "弱漂移", "局部支路残差异常"], ["11:29", "风险收敛", "模温差与缩孔关系命中"], ["12:15", "理论显性点", "X光/尺寸检测可能发现"]],
    hypotheses: [
      { name: "冷却水路局部堵塞", score: 81, support: "支路流量波动与模温差同步", conflict: "过滤器压差未超过硬阈值", test: "分支流量旁路测试与水路冲洗前后对照" },
      { name: "温控阀响应异常", score: 63, support: "阀位变化未带来预期流量", conflict: "控制器无显性报警", test: "手动阶跃阀位并记录响应曲线" },
      { name: "喷涂/脱模剂热边界变化", score: 31, support: "可影响局部热交换", conflict: "配方和喷涂周期未变化", test: "核查喷涂日志与热像分布" }
    ],
    guards: [["时序先行", "通过", "流量残差早于模温差扩大"], ["机制一致", "通过", "冷却不均可导致缩孔/变形"], ["同位复现", "通过", "同模次相邻件持续"], ["反证检查", "待验证", "等待旁路与冲洗对照"], ["数据完整", "通过", "压铸、流量、热像记录齐全"]],
    traces: [{ id: "件 DC-01", state: "X光待检", detail: "11:29出模 · 风险窗起点 · 批次冻结" }, { id: "件 DC-03", state: "尺寸复核", detail: "11:37出模 · 模温差峰值段" }, { id: "件 DC-06", state: "范围边界", detail: "11:49出模 · 水路恢复前末件" }],
    signal: { baselineMean: 8, baselineStd: 1.2, downstreamTime: "12:15", points: [["11:07",8.1,0],["11:10",8.3,0],["11:14",8.7,0],["11:18",9.1,0],["11:21",9.8,0],["11:24",10.5,0],["11:27",11.2,0],["11:29",11.8,1],["11:33",18.0,1]] },
    interventions: [
      { id: "bypass-flush", label: "支路旁路 + 冲洗前后对照", measurement: "支路流量、三模次模温差、X光与尺寸", criterion: "流量不低于基线95%且模温差不高于12℃", signer: "压铸检测岗位 DC-QC-02", result: "支路流量恢复到基线97%，相邻三模次模温差降至9.4℃。", conclusion: "Top-1增强；结构件仍须完成X光和尺寸双检。", posterior: [94,27,9] },
      { id: "valve-step", label: "温控阀手动阶跃", measurement: "阀位指令、反馈、支路流量残差", criterion: "阀位响应正常且流量残差可解释", signer: "压铸检测岗位 DC-QC-02", result: "阀位响应正常，流量残差未消失。", conclusion: "Top-2被反证并降级，水路局部堵塞进一步增强。", posterior: [88,16,14] }
    ]
  }
};

const replicationAssets = [
  ["总装拧紧", "扭矩/角度适配器", "拧紧-FMEA本体", "复拧+标准件", "可演示"],
  ["焊装点焊", "电流/寿命/阻抗", "焊点-强度本体", "焊核抽检", "可演示"],
  ["涂装烘干", "温度/风门/过站", "固化-附着力本体", "膜厚+附着力", "可演示"],
  ["一体压铸", "模温/流量/热像", "凝固-缺陷本体", "X光+尺寸", "可演示"]
];

const phases = [
  { label: "主动感知", detail: "接收设备、工艺、检测与MES事件" },
  { label: "图谱收敛", detail: "定位设备、参数、质量特性与影响对象" },
  { label: "证据推理", detail: "检索FMEA、SOP、维修与历史8D" },
  { label: "飞书执行", detail: "写入台账、通知、派单与SLA跟踪" },
  { label: "验证回写", detail: "校验关闭条件并沉淀复盘知识" }
];

const lifecycleStages = [
  ["异常发现", "数字员工", "识别弱信号、重复模式与质量影响", "事件时间、源事件ID、参数值、质量码", "质量风险事件Base"],
  ["信息确认", "质量工程师", "核对来源系统、设备/工位、时间窗、批次与已有工单", "设备/工位、对象绑定、时间戳、既有工单检查", "事件台账"],
  ["工单发起", "质量工程师", "判断新建、关联既有工单或转人工复核", "事件护照、重复检查、风险等级、影响范围", "质量风险事件Base"],
  ["任务分派", "数字员工 + 班组长", "按风险、工位、班次和技能生成任务草案并升级超时", "责任人、岗位路由、SLA、幂等键", "任务中心 / 消息卡片"],
  ["现场排查", "设备工程师 / 维修人员", "提供按失效模式组织的检查清单和反证路径", "检查项、实测值、量具编号、校准状态、附件", "现场检查记录"],
  ["原因判断", "设备 / 工艺 / 质量三方", "给出Top-3候选、支持与冲突证据和反事实动作", "图谱路径、支持证据、冲突证据、干预结果", "诊断任务 / 复盘文档"],
  ["维修处置", "设备工程师 / 维修人员", "生成措施顺序、风险提示和完成条件", "维修动作、前后测量值、部件/工具、执行人", "设备维修记录"],
  ["运行确认", "设备 / 工艺工程师", "核对设备恢复、稳定窗口和检查项完整性", "功能测试、稳定窗口、参数恢复、操作签名", "设备维修记录 / 复机确认"],
  ["恢复生产", "质量负责人", "检查首件、放行范围和签署条件，不拥有放行权", "复机确认、首件结果、放行范围、负责人签署", "复机确认 / 原生审批"],
  ["知识沉淀", "质量知识管理员", "生成证据包、复盘摘要和知识变更草案", "验证结论、措施结果、证据哈希、复盘记录", "复盘文档 / 知识库"],
  ["检查标准审视", "质量 / 工艺 / 设备授权岗位", "对比PFMEA、控制计划、点检项目和维护周期版本差异", "旧/新版本、变更原因、审批号、生效时间", "标准变更审批 / 回写回执"],
  ["有效性观察", "质量负责人", "跟踪复发、误报、驳回原因和版本效果，必要时建议回退", "观察窗、同类事件、复发率、回退决定", "知识债观察记录"]
];

let selectedIndex = 0;
let phaseIndex = 3;
let activeQuestion = "证据链是什么";
let confirmed = false;
let closed = false;
let runTimer = null;
let taskProgress = 0;
let traceIndex = 0;
let runMode = "collaborative";
let selectedIntervention = null;
let interventionAccepted = false;
let workflowEvidenceAccepted = false;
let resilienceState = "normal";
let outboxQueued = false;
let outboxReconciled = false;
let feishuDispatched = false;
let companyAuditStep = 0;
let companyAuditTimer = null;
let lifecycleIndex = 0;
let drawerReturnFocus = null;
let drawerFocusRef = null;

const $ = (id) => document.getElementById(id);
const selected = () => qualityScenarios[selectedIndex];
const assurance = () => assuranceProfiles[selected().id];
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

function minutesBetween(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

function analyzeSignal(profile = assurance()) {
  const lambda = 0.3;
  const k = 0.25 * profile.signal.baselineStd;
  const h = 1.5 * profile.signal.baselineStd;
  let ewma = profile.signal.baselineMean;
  let upperCusum = 0;
  let lowerCusum = 0;
  let firstWeak = null;
  let actionable = null;
  const points = profile.signal.points.map(([time, value, relation]) => {
    ewma = lambda * value + (1 - lambda) * ewma;
    upperCusum = Math.max(0, upperCusum + value - profile.signal.baselineMean - k);
    lowerCusum = Math.min(0, lowerCusum + value - profile.signal.baselineMean + k);
    const ewmaHit = Math.abs(ewma - profile.signal.baselineMean) >= 0.3 * profile.signal.baselineStd;
    const cusumHit = Math.max(upperCusum, Math.abs(lowerCusum)) >= h;
    if (!firstWeak && (ewmaHit || cusumHit)) firstWeak = time;
    if (!actionable && relation && (ewmaHit || cusumHit)) actionable = time;
    return { time, value, relation: Boolean(relation), ewmaHit, cusumHit };
  });
  actionable ||= points.at(-1).time;
  return {
    points,
    firstWeak: firstWeak || points[0].time,
    actionable,
    downstream: profile.signal.downstreamTime,
    leadMinutes: minutesBetween(actionable, profile.signal.downstreamTime),
    hardBreach: points.find((point) => point.value < selected().lower || point.value > selected().upper)?.time || "未越界"
  };
}

function eventPassport() {
  const versions = "QG-2026.08|KG-18.0|FS-2.0|QO-2.2";
  const input = `${selected().id}|${assurance().signal.points.map((point) => point.join("/")).join("|")}|${runMode}|${selectedIntervention || "none"}|${interventionAccepted}|${confirmed}|${workflowEvidenceAccepted}|${closed}|${resilienceState}|${outboxReconciled}|${feishuDispatched}|${versions}`;
  let hash = 2166136261;
  for (const char of input) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `EV-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}

function policyDecision(action) {
  if (["dispatch", "confirm", "writeback", "close"].includes(action) && runMode === "shadow") return { allowed: false, reason: "L0影子验证只允许回放和评估，不产生外部写入或关闭结论。" };
  if (["dispatch", "confirm", "writeback", "close"].includes(action) && resilienceState === "data-delay") return { allowed: false, reason: "核心数据已过期，策略服务冻结新增派单、确认和关闭。" };
  if (action === "dispatch" && phaseIndex < 3) return { allowed: false, reason: "证据推理尚未完成，先等待图谱路径、规则共识和候选假设形成。" };
  if (action === "dispatch" && feishuDispatched) return { allowed: false, reason: "该事件已按幂等键派发，不重复建单。" };
  if (action === "confirm" && !feishuDispatched) return { allowed: false, reason: "处置任务尚未派发，不能跳过协同编排直接确认。" };
  if (action === "close" && resilienceState === "graph-down") return { allowed: false, reason: "知识快照不可用，关闭申请转人工复核。" };
  if (action === "close" && !interventionAccepted) return { allowed: false, reason: "缺少已签署的反事实或物理复检证据。" };
  if (action === "close" && !confirmed) return { allowed: false, reason: "缺少质量负责人实名确认。" };
  if (action === "writeback" && phaseIndex < 3) return { allowed: false, reason: "协同对象尚未派发，不能验收任务与知识草案。" };
  if (action === "writeback" && !interventionAccepted) return { allowed: false, reason: "物理复检证据尚未签署。" };
  if (action === "writeback" && !confirmed) return { allowed: false, reason: "质量负责人尚未确认处置。" };
  if (action === "close" && !workflowEvidenceAccepted) return { allowed: false, reason: "任务完成、复检附件与知识变更草案尚未独立验收。" };
  return { allowed: true, queue: action === "dispatch" && resilienceState === "feishu-down" };
}

function riskTag(risk) {
  return `<span class="tag ${risk}">${risk}</span>`;
}

function scopeNumber(item) {
  const matches = item.scope.match(/\d+/g) || [];
  if (item.id.includes("DC")) return "6件";
  if (matches.length >= 2 && item.scope.includes("VIN")) {
    const start = Number(matches[0]);
    const end = Number(matches[1]);
    if (end >= start) return `${end - start + 1}辆`;
  }
  if (item.id.includes("TQ")) return "3辆";
  return matches[0] ? `${matches[0]}辆` : "待圈定";
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderScenarioList() {
  $("scenarioList").innerHTML = qualityScenarios.map((item, index) => `
    <button class="scenario ${index === selectedIndex ? "active" : ""}" data-index="${index}">
      <span class="meta">${riskTag(item.risk)}<span class="tag">${item.station.split("工位")[0]}</span></span>
      <strong>${item.scene}</strong>
      <p>${item.parameter} · ${item.value}${item.unit}</p>
    </button>
  `).join("");
  document.querySelectorAll(".scenario").forEach((button) => {
    button.addEventListener("click", () => selectScenario(Number(button.dataset.index)));
  });
}

function renderCompanyDataset() {
  $("datasetProvenance").textContent = companyDataset.provenance;
  $("companyDatasetMetrics").innerHTML = companyDataset.counts.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("relationshipFunnel").innerHTML = companyDataset.funnel.map(([label, count, rate], index) => `
    <div class="funnel-row ${index >= 2 ? "gap" : ""}">
      <span>${label}</span><i><em style="width:${Math.max(rate, 8)}%"></em></i><b>${count}</b><small>${rate.toFixed(1)}%</small>
    </div>
  `).join("");
  const item = companyDataset.flagship;
  $("knowledgeDebtCase").innerHTML = `
    <div class="debt-title"><span>${item.eventId}</span><strong>安全防护设备工单集中的“闭而未解”风险</strong></div>
    <div class="debt-stats">
      <div><b>${item.workOrders}</b><span>同设备工单</span></div>
      <div><b>${item.closed}</b><span>显示已关闭</span></div>
      <div class="alert"><b>${item.unknownCause}</b><span>原因未确认</span></div>
      <div class="alert"><b>${item.linkedFailureMode}</b><span>失效模式关联</span></div>
    </div>
    <p>关闭率高不等于问题已解决。该设备的工单几乎全部缺少可复用根因和结构化措施，且同类别设备已经出现维护因素与清洁润滑证据。</p>
    <div class="debt-chain"><code>${item.equipment}</code><span>同类别</span><code>${item.equipmentType}</code><span>迁移证据</span><code>${item.sibling}</code></div>
  `;
  const stages = [
    ["01", "快照准入", "读取赛事提供的历史静态脱敏快照，保留来源版本和统计口径"],
    ["02", "关系完整性审计", "发现121张同设备工单中119张显示关闭，但原因和失效模式关联不足"],
    ["03", "识别知识债务", "120张原因未确认、121张未关联失效模式，关闭状态不能作为解决证据"],
    ["04", "GraphRAG收敛", `沿设备类别—功能—失效模式检索${item.candidates.join(" / ")}，并命中同类设备维护处置`],
    ["05", "现场检查与候选确认", "设备、维修、质量三方记录检查项和实测结果，候选只能确认或驳回"],
    ["06", "复机与标准审批", "复机确认、首件验证和PFMEA/点检变更草案分别留痕，审批前不回写"],
    ["07", "观察与回退", "进入观察窗跟踪同类事件、复发率和驳回原因，必要时建议回退版本"]
  ];
  $("dataAuditTrace").innerHTML = companyAuditStep ? `
    <div class="audit-steps">${stages.map(([no, title, detail], index) => `<div class="audit-step ${index < companyAuditStep ? "active" : ""}"><b>${no}</b><strong>${title}</strong><span>${detail}</span></div>`).join("")}</div>
    ${companyAuditStep >= stages.length ? `<div class="audit-decision"><div><span>数字员工结论</span><strong>建议建立P2知识债务事件，不自动写入唯一根因</strong><p>先核验两张待处理工单，再由设备、维修、质量三方确认候选失效模式；批准后更新点巡检项目、检测方法和维护周期。</p></div><button id="companyEvidenceBtn" class="secondary-btn">查看完整证据链</button></div>` : ""}
  ` : `<div class="audit-idle"><span>待运行</span><p>点击“运行关系审计”，数字员工将从业务系统快照主动发起分析，不依赖人员提问或新的PLC硬告警。</p></div>`;
  $("runDataAuditBtn").disabled = companyAuditStep > 0 && companyAuditStep < stages.length;
  $("runDataAuditBtn").textContent = companyAuditStep >= stages.length ? "重新运行审计" : companyAuditStep ? "审计运行中" : "运行关系审计";
  $("companyEvidenceBtn")?.addEventListener("click", openCompanyEvidence);
}

function runCompanyAudit() {
  window.clearInterval(companyAuditTimer);
  companyAuditStep = 1;
  renderCompanyDataset();
  showToast("已聚合企业脱敏业务记录，开始关系完整性审计");
  companyAuditTimer = window.setInterval(() => {
    companyAuditStep += 1;
    renderCompanyDataset();
    if (companyAuditStep >= 7) {
      window.clearInterval(companyAuditTimer);
      showToast("企业知识债流程已走完脱敏演示，现场确认、标准审批与观察结果仍由授权岗位完成");
    }
  }, 680);
}

function selectScenario(index) {
  selectedIndex = index;
  traceIndex = 0;
  phaseIndex = 3;
  activeQuestion = "证据链是什么";
  confirmed = false;
  closed = false;
  taskProgress = 0;
  selectedIntervention = null;
  interventionAccepted = false;
  workflowEvidenceAccepted = false;
  resilienceState = "normal";
  outboxQueued = false;
  outboxReconciled = false;
  feishuDispatched = false;
  lifecycleIndex = 0;
  window.clearInterval(runTimer);
  renderAll();
}

function renderPlantStatus() {
  const item = selected();
  const activePlant = item.id.includes("TQ") ? "assembly" : item.id.includes("WD") ? "welding" : item.id.includes("PA") ? "painting" : "casting";
  document.querySelectorAll("[data-plant]").forEach((plant) => {
    const status = plant.querySelector("b");
    const active = plant.dataset.plant === activePlant;
    status.className = active ? `watch ${item.risk}` : "normal";
    status.textContent = active ? `${item.risk} · 1项关注` : "稳定";
    plant.classList.toggle("active-risk", active);
  });
  const analysis = analyzeSignal();
  const replayTimes = [assurance().signal.points[0][0], analysis.firstWeak, analysis.actionable, assurance().signal.points.at(-1)[0], analysis.downstream];
  $("liveClock").textContent = replayTimes[Math.min(closed ? 4 : Math.min(phaseIndex, 2), 4)];
}

function renderIncident() {
  const item = selected();
  $("caseTitle").textContent = `${item.scene}｜${item.parameter}异常`;
  $("caseSummary").textContent = `已捕捉 ${item.equipment} 在 ${item.station} 出现${item.trend}。系统已生成风险线程 ${item.id}。`;
  $("riskSeal").className = `risk-seal ${item.risk}`;
  $("riskSeal").innerHTML = `<small>风险等级</small><b>${item.risk}</b><span>${item.risk === "P1" ? "需人工确认" : "复测后确认"}</span>`;
  $("confidence").textContent = `${Math.round(item.confidence * 100)}%`;
  $("confidenceBar").style.width = `${Math.round(item.confidence * 100)}%`;
  $("scopeCount").textContent = scopeNumber(item);
  $("scopeDetail").textContent = item.scope;
  $("containmentWindow").textContent = item.risk === "P1" ? "18–35 min" : "当班完成";
  $("phaseLabel").textContent = closed ? "闭环完成" : phases[phaseIndex].label;
  $("phaseDetail").textContent = closed ? "证据、任务与复盘已关联" : phases[phaseIndex].detail;
  $("decisionText").textContent = item.decision;
  $("rootCauseText").textContent = `Top-1候选假设：${item.rootCause}（${Math.round(item.confidence * 100)}%，待现场验证）`;
  $("slaBadge").textContent = item.risk === "P1" ? "SLA 30min" : "SLA 当班";
  $("gateStatus").textContent = closed ? "现场处置已验证关闭 · 标准草案待审批" : confirmed ? "处置已确认" : "待质量负责人确认";
  $("dispatchBtn").disabled = !policyDecision("dispatch").allowed || closed;
  $("dispatchBtn").textContent = feishuDispatched ? "已派发飞书闭环" : phaseIndex < 3 ? "等待证据研判完成" : "派发飞书闭环";
  $("confirmBtn").disabled = !policyDecision("confirm").allowed || confirmed || closed;
  $("confirmBtn").textContent = feishuDispatched ? "人工确认处置" : "等待派发后确认";
  $("writebackBtn").disabled = !policyDecision("writeback").allowed || workflowEvidenceAccepted || closed;
  $("resolveBtn").disabled = !policyDecision("close").allowed || closed;
  renderEarlyWarning();
  renderChart();
}

function renderEarlyWarning() {
  const profile = assurance();
  const analysis = analyzeSignal(profile);
  $("warningConsensus").textContent = `多引擎共识 ${profile.consensus}`;
  $("leadTime").textContent = `${analysis.leadMinutes} 分钟`;
  $("weakSignal").textContent = profile.weakSignal;
  $("weakSignalDetail").textContent = profile.weakSignalDetail;
  $("escalationBasis").textContent = profile.escalationBasis;
  const stages = [
    [profile.signal.points[0][0], "稳定基线", "过程能力窗内"],
    [analysis.firstWeak, "弱信号", "EWMA/CUSUM先于硬阈值触发"],
    [analysis.actionable, "可行动风险", "统计漂移与知识关系形成最小证据共识"],
    [analysis.downstream, "理论显性点", "下游检验或质量门可能发现"]
  ];
  $("warningStages").innerHTML = stages.map(([time, title, detail], index) => `
    <div class="warning-stage ${index <= Math.min(phaseIndex, 2) || closed ? "active" : ""} ${index === 3 ? "future" : ""}">
      <time>${time}</time><b>${title}</b><span>${detail}</span>
    </div>
  `).join("");
}

function renderChart() {
  const item = selected();
  const values = analyzeSignal().points.map((point) => point.value);
  const min = Math.min(...values, item.lower) - Math.max((item.upper - item.lower) * .25, 1);
  const max = Math.max(...values, item.upper) + Math.max((item.upper - item.lower) * .25, 1);
  const x = (i) => 28 + (i / (values.length - 1)) * 704;
  const y = (v) => 154 - ((v - min) / (max - min)) * 126;
  const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const areaPoints = `28,154 ${points} 732,154`;
  const grid = [0, 1, 2, 3].map((n) => `<line class="chart-grid" x1="28" x2="732" y1="${28 + n * 42}" y2="${28 + n * 42}" />`).join("");
  $("trendChart").innerHTML = `
    ${grid}
    <line class="chart-limit" x1="28" x2="732" y1="${y(item.lower)}" y2="${y(item.lower)}" />
    <line class="chart-limit" x1="28" x2="732" y1="${y(item.upper)}" y2="${y(item.upper)}" />
    <polygon class="chart-area" points="${areaPoints}" />
    <polyline class="chart-line" points="${points}" />
    <circle class="chart-point" cx="${x(values.length - 1)}" cy="${y(values.at(-1))}" r="6" />
    <text x="32" y="${Math.max(14, y(item.upper) - 6)}" fill="#aa6200" font-size="10">上限 ${item.upper}${item.unit}</text>
    <text x="32" y="${Math.min(173, y(item.lower) + 14)}" fill="#aa6200" font-size="10">下限 ${item.lower}${item.unit}</text>
  `;
  $("signalTitle").textContent = `${item.equipment} · ${item.parameter}`;
  $("signalValue").textContent = `${item.value}${item.unit}`;
  $("signalRange").textContent = `工艺窗 ${item.lower}–${item.upper}${item.unit}`;
  $("trendChart").parentElement.classList.toggle("alert", item.value < item.lower || item.value > item.upper);
}

function dialogueAnswer(question) {
  const item = selected();
  const profile = assurance();
  const analysis = analyzeSignal(profile);
  const direct = item.chat[question];
  if (direct) return direct;
  if (/提前|前置|弱信号|显性/.test(question)) return `系统于${analysis.firstWeak}识别${profile.weakSignal}，并在${analysis.actionable}由${profile.escalationBasis}形成可行动风险。相对${analysis.downstream}下游理论显性点，前置${analysis.leadMinutes}分钟。`;
  if (/护栏|反证|可信|假设/.test(question)) return `当前保留${profile.hypotheses.length}个候选根因，不把相关性直接写成因果。Top-1为“${profile.hypotheses[0].name}”，必须执行“${profile.hypotheses[0].test}”后才能增强或降级。`;
  if (/根因|原因|为什么/.test(question)) return `当前Top-1根因假设为“${item.rootCause}”。该结论由参数越界、时空复现、设备状态和历史案例共同支持，仍需现场点检与复检确认。`;
  if (/影响|VIN|批次|范围/.test(question)) return `当前圈定范围为：${item.scope}。系统会以最后合格校验点和MES过站时间窗为边界，随复检结果扩展或收敛。`;
  if (/关闭|放行|条件/.test(question)) return "关闭至少需要：影响对象复检合格、设备或工艺恢复、首件确认、责任人签收、质量负责人确认。P1事件不允许AI自动放行。";
  if (/飞书|任务|派发/.test(question)) return `事件 ${item.id} 将以同一幂等键写入多维表格，生成${item.tasks.length}项飞书任务，并通过机器人卡片通知相关角色；任务状态变化会回写事件台账。`;
  return `我已将问题关联到事件 ${item.id}。当前建议优先核查：${item.evidence.slice(0, 2).join("；")}。如需执行处置，请由质量负责人确认。`;
}

function renderDialogue(customQuestion) {
  const item = selected();
  const question = customQuestion || activeQuestion;
  const answer = dialogueAnswer(question);
  activeQuestion = question;
  $("dialogue").innerHTML = `
    <div class="bubble system">${item.id} · 机制原型已执行本体约束、关系路径检索和工艺窗口校验</div>
    <div class="bubble agent">我判断该事件进入 ${item.risk} 处置。首要根因假设为：${item.rootCause}。该结论是可证伪假设，不替代现场确认。</div>
    <div class="bubble user">${escapeHtml(question)}</div>
    <div class="bubble agent">${escapeHtml(answer)}
      <div class="bubble-citations"><span>回答依据</span>
        <button data-evidence-ref="E1">E1 原始证据</button>
        <button data-evidence-ref="E2">E2 关联证据</button>
        <button data-evidence-ref="QG-2026.08">QG-2026.08</button>
        <button data-evidence-ref="KG-18.0">KG-18.0</button>
      </div>
    </div>
    ${closed ? `<div class="bubble system">现场处置事件已关闭：复检、设备处理、责任确认和知识变更草案完整；知识债进入独立审批与观察。</div>` : ""}
  `;
  const questions = ["如何提前发现", "为什么升级P1", "因果结论可信吗", "影响哪些VIN", "如何派发飞书任务", "关闭条件是什么"];
  $("quickQuestions").innerHTML = questions.map((question) => `<button data-question="${question}">${question}</button>`).join("");
  document.querySelectorAll("#quickQuestions button").forEach((button) => button.addEventListener("click", () => renderDialogue(button.dataset.question)));
  document.querySelectorAll("[data-evidence-ref]").forEach((button) => button.addEventListener("click", openDrawer));
}

function renderTasks() {
  const item = selected();
  $("taskBoard").innerHTML = item.tasks.map((task, index) => {
    const done = workflowEvidenceAccepted || taskProgress > index;
    const state = done ? "已完成" : outboxQueued ? "待补偿" : phaseIndex >= 3 ? (index === 0 ? "处理中" : "已派发") : task.status;
    return `<div class="task ${done ? "done" : ""}">
      <div class="meta"><span class="tag">TASK-${index + 1}</span><span class="tag">${task.sla}</span><span class="tag">${state}</span></div>
      <strong>${task.action}</strong><span>${task.owner}</span>
    </div>`;
  }).join("");
  $("actionLog").textContent = closed ? "现场处置已关闭；知识变更单进入独立审批和有效性观察。" : workflowEvidenceAccepted ? "任务、复检附件与知识变更草案已独立验收，允许提交现场处置关闭校验。" : outboxQueued ? `飞书中断：${item.id} 已进入Outbox，恢复后按同一幂等键补偿。` : phaseIndex >= 3 ? `已用 ${item.id} 作为幂等键生成协同对象，等待责任人更新。` : "协同编排尚未启动；当前处于证据推理阶段。";
}

function renderKnowledge() {
  const item = selected();
  const profile = assurance();
  const labels = ["产线", "工位", "设备", "参数", "质量风险", "案例", "根因"];
  const relations = ["包含", "配置", "产生", "影响", "命中", "指向"];
  $("kgPath").innerHTML = item.kgPath.map((node, index) => `
    <div class="kg-node ${index >= 4 ? "active" : ""}"><small>${labels[index] || `节点${index + 1}`}</small><strong>${node}</strong></div>
    ${index < item.kgPath.length - 1 ? `<div class="kg-edge"><span>${relations[index] || "关联"}</span></div>` : ""}
  `).join("");
  $("evidenceList").innerHTML = item.evidence.map((evidence, index) => `<li><b>E${index + 1}</b> ${evidence}</li>`).join("");
  const trace = profile.traces[Math.min(traceIndex, profile.traces.length - 1)];
  const entity = item.id.includes("DC") ? "零件/批次" : "VIN/车辆";
  $("impactMode").textContent = item.id.includes("DC") ? "批次追溯" : "VIN 追溯";
  $("traceSelector").innerHTML = profile.traces.map((entry, index) => `<button class="${index === traceIndex ? "active" : ""}" data-trace-index="${index}">${entry.id}</button>`).join("");
  document.querySelectorAll("#traceSelector button").forEach((button) => button.addEventListener("click", () => {
    traceIndex = Number(button.dataset.traceIndex);
    renderKnowledge();
  }));
  $("impactChain").innerHTML = [
    ["触发点", `${item.station} / ${item.equipment}`],
    [entity, `${trace.id} · ${trace.state}`],
    ["过程档案", trace.detail],
    ["时间窗", item.trend],
    ["风险", item.decision],
    ["关闭门", "复检合格 + 设备恢复 + 责任确认"]
  ].map(([key, value]) => `<div class="impact-step"><b>${key}</b><span>${value}</span></div>`).join("");
}

function renderAssurance() {
  const profile = assurance();
  const intervention = profile.interventions.find((item) => item.id === selectedIntervention);
  const ranked = profile.hypotheses.map((hypothesis, index) => ({ ...hypothesis, hypothesisId: `H${index + 1}`, priorScore: hypothesis.score, score: interventionAccepted ? intervention.posterior[index] : hypothesis.score })).sort((left, right) => right.score - left.score);
  $("causalHypotheses").innerHTML = ranked.map((hypothesis, index) => `
    <article class="hypothesis ${index === 0 ? "primary" : ""}">
      <div><span>${hypothesis.hypothesisId}</span><strong>${hypothesis.name}<small>Rank ${index + 1}${interventionAccepted ? ` · 原始 ${hypothesis.priorScore}%` : ""}</small></strong><b>${hypothesis.score}%</b></div>
      <p><i>支持</i>${hypothesis.support}</p>
      <p><i>冲突</i>${hypothesis.conflict}</p>
      <p><i>证伪</i>${hypothesis.test}</p>
    </article>
  `).join("");
  $("guardrailChecks").innerHTML = profile.guards.map(([name, status, detail], index) => {
    const resolvedStatus = index === 3 && interventionAccepted ? "通过" : status;
    const resolvedDetail = index === 3 && interventionAccepted ? `已验收：${intervention.label}` : detail;
    return `<div class="guardrail ${resolvedStatus === "通过" ? "pass" : "pending"}"><span>${name}</span><b>${resolvedStatus}</b><small>${resolvedDetail}</small></div>`;
  }).join("");

  $("interventionOptions").innerHTML = profile.interventions.map((item) => `
    <button class="${item.id === selectedIntervention ? "active" : ""}" data-intervention="${item.id}">${item.label}</button>
  `).join("");
  document.querySelectorAll("#interventionOptions button").forEach((button) => button.addEventListener("click", () => {
    selectedIntervention = button.dataset.intervention;
    interventionAccepted = false;
    workflowEvidenceAccepted = false;
    renderAll();
    showToast("干预方案已装载，等待提交实测值和检测岗位签署");
  }));
  $("interventionStatus").textContent = interventionAccepted ? "实测已签署并验收" : intervention ? "待实测签署" : "待选择干预";
  const rankShift = interventionAccepted ? ranked.map((hypothesis, index) => {
    const priorRank = [...profile.hypotheses].sort((left, right) => right.score - left.score).findIndex((entry) => entry.name === hypothesis.name) + 1;
    return { ...hypothesis, priorRank, posteriorRank: index + 1 };
  }).find((hypothesis) => hypothesis.priorRank !== hypothesis.posteriorRank) : null;
  $("interventionResult").innerHTML = intervention ? (interventionAccepted ? `
    <div class="intervention-evidence"><div><span>脱敏签署流程仿真</span><strong>${intervention.result}</strong><small>验收准则：${intervention.criterion} · 仿真岗位：${intervention.signer}</small><div class="inspection-fields"><span>实测值</span><b>${intervention.result}</b><span>量具状态</span><b>校准有效 · 脱敏样例</b><span>附件</span><b>复检记录 + 首件确认</b><span>签署时间</span><b>回放时刻 ${analyzeSignal().actionable}</b></div><small>${intervention.conclusion}</small>${rankShift ? `<div class="rank-shift"><b>${rankShift.hypothesisId} 排序更新</b><strong>Rank ${rankShift.priorRank} → Rank ${rankShift.posteriorRank}</strong><span>${rankShift.priorScore}% → ${rankShift.score}%</span></div>` : ""}</div><div><span>后验置信度更新</span><div class="posterior-bars">${intervention.posterior.map((score, index) => `<div class="posterior-row"><b>H${index + 1}</b><i><em style="width:${score}%"></em></i><strong>${score}%</strong></div>`).join("")}</div></div></div>
  ` : `<div class="intervention-evidence"><div><span>待执行动作</span><strong>${intervention.label}</strong><small>必填实测：${intervention.measurement}</small><small>验收准则：${intervention.criterion}</small></div><div><span>证据状态</span><strong>等待检测岗位签署</strong><button id="completeInterventionBtn" class="secondary-btn">载入脱敏实测样例并验收</button></div></div>`) : `<div class="intervention-empty">选择一项现场对照动作，系统将依据观测结果增强、降级或重排Top-3假设。</div>`;
  $("completeInterventionBtn")?.addEventListener("click", () => {
    interventionAccepted = true;
    workflowEvidenceAccepted = false;
    renderAll();
    showToast("脱敏实测、验收准则和仿真岗位签署已进入证据护照");
  });

  const checks = [
    ["源数据完整", true, "MES、设备、检测与知识版本可追溯"],
    ["影响范围锁定", phaseIndex >= 2 || closed, `已关联${scopeNumber(selected())}及最后合格校验点`],
    ["物理复检通过", interventionAccepted, interventionAccepted ? `实测与准则已签署：${intervention.label}` : "等待对照试验、实测值、验收准则和检测签署"],
    ["授权人员确认", confirmed, confirmed ? "质量负责人确认流程已仿真并留痕" : "P1禁止自动放行"],
    ["任务完成与知识草案入审", workflowEvidenceAccepted, workflowEvidenceAccepted ? "任务状态、复检附件与变更草案已独立验收" : "须先验收任务与知识草案，关闭动作不得反向置为通过"]
  ];
  const passed = checks.filter((check) => check[1]).length;
  $("validationSummary").textContent = `${passed}/5 已通过`;
  $("validationGate").innerHTML = checks.map(([name, pass, detail], index) => `
    <div class="validation-item ${pass ? "pass" : "pending"}"><span>${pass ? "✓" : index + 1}</span><div><b>${name}</b><small>${detail}</small></div></div>
  `).join("");
}

function factorData(item) {
  const breach = item.value < item.lower ? (item.lower - item.value) / Math.max(item.lower, 1) : (item.value - item.upper) / Math.max(item.upper, 1);
  return [
    ["工艺越界", Math.min(98, Math.round(58 + breach * 240))],
    ["时空复现", /连续|持续|漂移|扩大/.test(item.trend) ? 88 : 55],
    ["质量严重度", item.risk === "P1" ? 94 : 68],
    ["历史知识命中", Math.round(item.confidence * 100)],
    ["数据完整性", 92]
  ];
}

function renderFactors() {
  $("riskFactors").innerHTML = factorData(selected()).map(([name, value]) => `
    <div class="factor-row ${value >= 90 ? "high" : ""}"><span>${name}</span><div class="factor-track"><i style="width:${value}%"></i></div><b>${value}</b></div>
  `).join("");
}

function renderTimeline() {
  const item = selected();
  const times = ["S0", "S1", "S2", "S3", closed ? "S4" : "待验证"];
  $("elapsedTime").textContent = closed ? "闭环完成" : times[Math.min(phaseIndex, times.length - 1)];
  $("actionTimeline").innerHTML = phases.map((phase, index) => `
    <div class="timeline-step ${index <= phaseIndex || closed ? "active" : ""}">
      <time>${times[index]}</time><div><strong>${phase.label}</strong><span>${index === 1 ? `${item.station}关联质量知识` : phase.detail}</span></div>
    </div>
  `).join("");
}

function lifecycleState(index) {
  const completed = [
    phaseIndex >= 0,
    phaseIndex >= 1,
    phaseIndex >= 2,
    feishuDispatched,
    interventionAccepted,
    interventionAccepted,
    workflowEvidenceAccepted,
    workflowEvidenceAccepted,
    workflowEvidenceAccepted && confirmed,
    workflowEvidenceAccepted,
    false,
    closed ? false : false
  ];
  if (index === 10) return workflowEvidenceAccepted ? "草案待审批" : "待发起";
  if (index === 11) return closed ? "观察中" : "待关闭";
  if (completed[index]) return "已完成";
  if (index === Math.min(phaseIndex + 1, 9)) return "当前节点";
  return "待处理";
}

function renderLifecycle() {
  const item = selected();
  const current = lifecycleStages[lifecycleIndex] || lifecycleStages[0];
  const states = lifecycleStages.map((_, index) => lifecycleState(index));
  const evidenceCount = states.filter((state) => state === "已完成" || state === "草案待审批" || state === "观察中").length;
  const blocker = closed ? "现场已验证关闭；知识标准进入审批与观察" : confirmed ? "维修、复机首件与草案验收" : feishuDispatched ? "现场排查与复检签署" : "信息确认与责任签收";
  $("lifecycleEvent").textContent = item.id;
  $("lifecycleEvidence").textContent = `${evidenceCount}/12 节点有记录`;
  $("lifecycleBlocker").textContent = blocker;
  $("lifecycleRail").innerHTML = lifecycleStages.map((stage, index) => {
    const state = states[index];
    return `<button class="lifecycle-node ${state === "已完成" || state === "观察中" ? "done" : state === "当前节点" || state === "草案待审批" ? "current" : "pending"} ${index === lifecycleIndex ? "selected" : ""}" data-lifecycle-index="${index}" role="tab" aria-selected="${index === lifecycleIndex}"><small>${String(index + 1).padStart(2, "0")}</small><strong>${stage[0]}</strong><span>${state}</span></button>`;
  }).join("");
  $("lifecycleDetail").innerHTML = `
    <div class="lifecycle-detail-head"><div><span class="kicker">STEP ${String(lifecycleIndex + 1).padStart(2, "0")} / 12</span><h3>${current[0]}</h3></div><span class="lifecycle-status ${states[lifecycleIndex] === "已完成" ? "done" : "pending"}">${states[lifecycleIndex]}</span></div>
    <div class="lifecycle-detail-grid"><div><span>责任岗位</span><strong>${current[1]}</strong></div><div><span>数字员工职责</span><strong>${current[2]}</strong></div><div><span>必备证据</span><strong>${current[3]}</strong></div><div><span>飞书对象</span><strong>${current[4]}</strong></div></div>
    <p class="lifecycle-gate"><b>权限门</b>${lifecycleIndex === 10 ? "变更草案已生成，必须经过授权审批后才能回写主平台。" : lifecycleIndex === 11 ? "现场关闭后继续观察30天，不以一次处置结果宣称标准已经有效。" : "该节点缺证据时保持隔离、升级或转人工，不由模型置信度替代。"}</p>
  `;
  document.querySelectorAll("#lifecycleRail .lifecycle-node").forEach((button) => button.addEventListener("click", () => {
    lifecycleIndex = Number(button.dataset.lifecycleIndex);
    renderLifecycle();
  }));
}

function buildRecord() {
  const item = selected();
  const analysis = analyzeSignal();
  const intervention = assurance().interventions.find((entry) => entry.id === selectedIntervention);
  const ranked = assurance().hypotheses.map((hypothesis, index) => ({ ...hypothesis, score: interventionAccepted ? intervention.posterior[index] : hypothesis.score })).sort((left, right) => right.score - left.score);
  return {
    fields: {
      "事件ID": item.id,
      "风险等级": item.risk,
      "任务状态": closed ? "现场已验证关闭；知识标准变更草案待审批" : phaseIndex >= 3 ? "已派发" : "处置中",
      "设备": item.equipment,
      "工位": item.station,
      "异常参数": `${item.parameter}=${item.value}${item.unit}`,
      "缺陷显性化前置量": `${analysis.leadMinutes}分钟（脱敏仿真计算）`,
      "弱信号时刻": analysis.firstWeak,
      "可行动时刻": analysis.actionable,
      "下游理论显性时刻": analysis.downstream,
      "检测共识": assurance().consensus,
      "工艺窗口": `${item.lower}-${item.upper}${item.unit}`,
      "影响范围": item.scope,
      "根因假设": item.rootCause,
      "候选根因Top3": ranked.map((hypothesis) => `${hypothesis.score}%:${hypothesis.name}`).join("；"),
      "反证动作": assurance().hypotheses[0].test,
      "干预结果": interventionAccepted ? `${intervention.label}｜${intervention.result}｜${intervention.signer}` : "待实测签署",
      "证据链": item.evidence.join("；"),
      "处置方案": item.decision,
      "责任任务": item.tasks.map((task) => `${task.owner}:${task.action}`).join("；"),
      "人工确认": confirmed ? "已确认" : "待确认",
      "关闭证据门": `源数据=${resilienceState !== "data-delay" ? "通过" : "阻断"}；范围=${phaseIndex >= 2 ? "通过" : "待定"}；物理复检=${interventionAccepted ? "通过" : "待签署"}；授权=${confirmed ? "通过" : "待确认"}；任务与知识草案=${workflowEvidenceAccepted ? "通过" : "待验收"}`,
      "运行模式": runMode,
      "事件护照": eventPassport(),
      "幂等键": item.id,
      "Aily指令": `@知质灵巡 查询 ${item.id}`
    }
  };
}

function renderFeishu() {
  const pipeline = [
    ["事件台账", "风险线程与护照", feishuDispatched],
    ["处置任务", "责任人与SLA", feishuDispatched],
    ["复检记录", "实测、量具与签署", interventionAccepted],
    ["设备维修", "措施与首件确认", workflowEvidenceAccepted],
    ["原生审批", "风险受理与放行", confirmed],
    ["知识变更", "PFMEA/控制计划草案待审批", workflowEvidenceAccepted]
  ];
  $("feishuPipeline").innerHTML = pipeline.map(([name, use, active], index) => `<div class="pipeline-step ${active ? "active" : ""}"><small>0${index + 1}</small><b>${name}</b><span>${use}</span></div>`).join("");
  const feishuInterrupted = resilienceState === "feishu-down";
  $("onlineDot").classList.toggle("offline", feishuInterrupted);
  $("feishuStatusTitle").textContent = feishuInterrupted ? "飞书连接中断 · Outbox接管" : outboxReconciled ? "飞书连接已恢复 · 补偿完成" : "飞书能力分层核验";
  $("feishuStatusDetail").textContent = feishuInterrupted ? "事件包本地留存 · 待恢复补偿 · 不重复建单" : outboxReconciled ? "事件ID幂等补偿回执已记录 · 任务/文档对象样例可查" : "Base写入回读已核验 · 任务/文档对象样例可查 · Aily与事件订阅待部署";
  $("capabilityMatrix").innerHTML = feishuCapabilities.map((capability) => `
    <div class="capability-item"><b>${capability.name}</b><span>${capability.use}</span><i>${capability.status}</i></div>
  `).join("");
  $("liveProof").innerHTML = `
    <div><span>已在线核验</span><b>质量风险事件Base写入回读</b><code>tblFo5Btaj0IBXiD</code></div>
    <div><span>最近验证记录</span><b>recvrcdCDJe5bP</b><code>Base readback passed</code></div>
    <div><span>对象样例</span><b><a href="https://applink.feishu.cn/client/todo/detail?guid=f10d51e5-cc8e-4c71-9441-cd29a77feacf" target="_blank" rel="noreferrer">P1拧紧质量风险任务</a></b><code>企业身份映射待完成</code></div>
    <div><span>对象样例</span><b><a href="https://larkcommunity.feishu.cn/docx/PjludNq8foBhkrxV8VQccsldneb" target="_blank" rel="noreferrer">CASE-TQ事件复盘文档</a></b><code>自动编排待生产部署</code></div>
  `;
  $("bitableRecord").textContent = JSON.stringify(buildRecord(), null, 2);
}

function renderValueAndSources() {
  $("valueCards").innerHTML = valueTargets.map((target) => `<article class="value-card"><span>${target.label}</span><strong>${target.value}</strong><p>${target.note}</p></article>`).join("");
  const readiness = [
    ["主动感知与四工况回放", "已核验", "EWMA/CUSUM、影响范围、反事实与五门关闭可在本地复算"],
    ["Base写入与回读", "已核验", "脱敏事件已获得record_id并完成回读校验"],
    ["GraphRAG运行形态", "机制原型", "当前为关系路径+受约束案例检索；生产版接入图数据库、向量索引与查询轨迹"],
    ["飞书任务/文档/卡片", "接口原型", "对象样例可查；企业应用、角色映射与回调消费者待部署"],
    ["工厂实时数据契约", "待企业接入", "需对接MES/SCADA/PLC只读数据、设备主数据、校准与VIN绑定"],
    ["L3生产受控执行", "待审批", "浏览器不可授予；须经企业变更审批、服务端策略和职责分离后启用"]
  ];
  $("pilotReadiness").innerHTML = `<div class="readiness-row header"><b>能力项</b><b>当前等级</b><b>进入生产的证据条件</b></div>${readiness.map(([name, status, detail]) => `<div class="readiness-row"><strong>${name}</strong><em class="${status === "已核验" ? "verified" : "pending"}">${status}</em><span>${detail}</span></div>`).join("")}`;
  $("replicationMatrix").innerHTML = `
    <div class="replication-row header"><b>工序模板</b><b>感知适配</b><b>知识模块</b><b>确定性验证</b><b>成熟度</b></div>
    ${replicationAssets.map((row) => `<div class="replication-row">${row.map((cell, index) => index === 4 ? `<span class="ready">${cell}</span>` : `<span>${cell}</span>`).join("")}</div>`).join("")}
  `;
  $("sourceSupport").innerHTML = references.map((reference) => `
    <article class="source-item"><strong>${reference.type}｜${reference.title}</strong><p>${reference.detail}</p><a href="${reference.url}" target="_blank" rel="noreferrer">查看来源</a></article>
  `).join("");
  renderRuntimeAssurance();
}

function renderRuntimeRibbon() {
  const permissions = { shadow: "L0 只读回放", collaborative: "L2 建议+派单", controlled: "L3 待企业授权" };
  document.querySelectorAll("#modeSelector button").forEach((button) => button.classList.toggle("active", button.dataset.mode === runMode));
  $("permissionLevel").textContent = permissions[runMode];
  $("eventPassport").textContent = eventPassport();
  $("freshnessValue").textContent = resilienceState === "data-delay" ? "失效 >30s" : "2.4s";
}

function renderRuntimeAssurance() {
  const drills = [
    { id: "data-delay", label: "数据延迟", title: "冻结新增推理，保留规则告警", detail: "核心点位超过30秒未更新时标记证据过期，停止自动派单，P1保持隔离。" },
    { id: "graph-down", label: "图谱不可用", title: "切换规则与控制计划只读包", detail: "不生成唯一根因，仅输出已验证硬规则、影响范围和人工排查清单。" },
    { id: "feishu-down", label: "飞书中断", title: "写入本地Outbox并幂等补偿", detail: "事件包落盘，恢复后按事件ID补偿同步，不重复建单、不丢失审计时间戳。" }
  ];
  $("resilienceOptions").innerHTML = drills.map((drill) => {
    const label = drill.id === "feishu-down" && resilienceState === "feishu-down" && outboxQueued ? "恢复并补偿" : drill.label;
    return `<button class="${drill.id === resilienceState ? "active" : ""}" data-resilience="${drill.id}">${label}</button>`;
  }).join("");
  document.querySelectorAll("#resilienceOptions button").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.resilience === "feishu-down" && resilienceState === "feishu-down" && outboxQueued) {
      resilienceState = "normal";
      outboxReconciled = true;
      showToast(`已恢复飞书连接并按事件ID ${selected().id} 完成补偿`);
    } else {
      resilienceState = resilienceState === button.dataset.resilience ? "normal" : button.dataset.resilience;
    }
    renderRuntimeRibbon();
    renderRuntimeAssurance();
    renderIncident();
    renderFeishu();
  }));
  const current = drills.find((drill) => drill.id === resilienceState);
  $("resilienceStatus").textContent = current ? (current.id === "feishu-down" ? "连接中断 · 待补偿" : "已进入安全降级") : outboxReconciled ? "已恢复 · 补偿完成" : "全链路可用";
  $("resilienceOutcome").className = `resilience-outcome ${current ? "warning" : ""}`;
  $("resilienceOutcome").innerHTML = current ? `<strong>${current.title}</strong><span>${current.detail}</span>${current.id === "feishu-down" && outboxQueued ? `<span>Outbox：1条待补偿 · 幂等键 ${selected().id}</span>` : ""}` : `<strong>规则、图谱、协同链路健康</strong><span>任何单点失效均不得绕过P1隔离、人工确认与确定性关闭门。</span>${outboxReconciled ? `<span>Outbox已按事件ID补偿完成，回执已留痕。</span>` : outboxQueued ? `<span>连接已恢复，等待执行“恢复并补偿”。</span>` : ""}`;
  const rows = [
    ["数字员工", "弱信号检测、证据收敛、任务草拟", "无放行权"],
    ["质量工程师", "确认风险受理与隔离范围", "实名签收"],
    ["检测人员", "提交实测值、量具状态与复检结论", "证据签署"],
    ["设备/工艺", "执行纠正措施与首件确认", "任务签署"],
    ["质量负责人", "审核关闭依据并决定放行/升级", "最终授权"]
  ];
  $("responsibilityMatrix").innerHTML = `<div class="responsibility-row header"><b>角色</b><b>责任</b><b>权限</b></div>${rows.map((row) => `<div class="responsibility-row"><b>${row[0]}</b><span>${row[1]}</span><em>${row[2]}</em></div>`).join("")}`;
}

function renderDrawer() {
  const item = selected();
  const profile = assurance();
  $("drawerContent").innerHTML = `
    <section class="drawer-group" data-evidence-id="SUMMARY"><h3>事件摘要</h3><p>${item.id} · ${item.scene} · ${item.risk}</p><p>${item.decision}</p></section>
    <section class="drawer-group" data-evidence-id="QG-2026.08"><h3>事件护照</h3><p>${eventPassport()}</p><p>规则 QG-2026.08 · 知识 KG-18.0 · 特征 FS-2.0 · 本体 QO-2.2</p><p>弱信号 ${analyzeSignal().firstWeak} · 可行动 ${analyzeSignal().actionable} · 下游理论显性 ${analyzeSignal().downstream}</p></section>
    <section class="drawer-group" data-evidence-id="E1"><h3>原始与派生证据</h3><ol>${item.evidence.map((evidence) => `<li>${evidence}</li>`).join("")}</ol></section>
    <section class="drawer-group" data-evidence-id="E2"><h3>根因假设</h3><p>${item.rootCause}</p><p>Top-1假设 ${Math.round(item.confidence * 100)}%，必须由点检、复检和维修结果证实或证伪。</p></section>
    <section class="drawer-group" data-evidence-id="KG-18.0"><h3>候选根因与反证动作</h3><ol>${profile.hypotheses.map((hypothesis) => `<li><b>${hypothesis.score}% ${hypothesis.name}</b>：${hypothesis.test}</li>`).join("")}</ol></section>
    <section class="drawer-group" data-evidence-id="CLOSE"><h3>关闭条件</h3><ol><li>影响车辆或零件完成隔离与复检</li><li>设备/工艺恢复并通过首件确认</li><li>责任任务、时间戳和附件齐全</li><li>质量负责人确认放行或继续升级</li><li>根因与措施写回知识图谱和复盘文档</li></ol></section>
  `;
}

function openCompanyEvidence() {
  const item = companyDataset.flagship;
  $("drawerContent").innerHTML = `
    <section class="drawer-group"><h3>数据边界</h3><p>赛事提供的历史静态脱敏快照，仅保留结构、受控类别和重键关系。没有精确时间、真实设备编号、工位、人员和原始正文，因此不能推断真实发生频率或直接确认根因。</p></section>
    <section class="drawer-group"><h3>触发事实</h3><ol><li>${item.equipment}关联${item.workOrders}张设备报警工单，其中${item.closed}张显示已关闭、2张待处理。</li><li>${item.unknownCause}张原因未确认，${item.genericAction}张仅记录为其他处置。</li><li>全部${item.workOrders}张均未关联失效模式。</li></ol></section>
    <section class="drawer-group"><h3>关系图路径</h3><p>${item.equipment} → ${item.equipmentType} → 安全防护功能 → ${item.candidates[0]} / ${item.candidates[1]}。</p><p>同类别实例${item.sibling}有29张工单，其中4张关联维护因素失效模式，1张记录清洁疏通或润滑处置。</p></section>
    <section class="drawer-group"><h3>候选与冲突</h3><ol><li><b>H1 工装夹持元件维护因素</b>：同类设备有处置支持，但目标设备无失效模式关联，候选条目未记录检测方法。</li><li><b>H2 执行元件维护因素</b>：功能与现象一致，但缺少同实例处置和原始工单正文。</li></ol></section>
    <section class="drawer-group"><h3>受控行动</h3><ol><li>核验两张待处理工单状态。</li><li>执行夹持、执行元件和安全回路检查。</li><li>由设备、维修、质量三方确认或驳回失效模式。</li><li>批准后更新点巡检项目、检测方法和维护周期。</li><li>在观察窗验证复发率后关闭知识债务事件。</li></ol></section>
  `;
  drawerFocusRef = null;
  drawerReturnFocus = document.activeElement;
  $("drawerBackdrop").hidden = false;
  $("evidenceDrawer").classList.add("open");
  $("evidenceDrawer").setAttribute("aria-hidden", "false");
  $("drawerCloseBtn").focus();
}

function renderAll() {
  renderRuntimeRibbon();
  renderScenarioList();
  renderCompanyDataset();
  renderLifecycle();
  renderPlantStatus();
  renderIncident();
  renderDialogue();
  renderTasks();
  renderKnowledge();
  renderFactors();
  renderAssurance();
  renderTimeline();
  renderFeishu();
  renderValueAndSources();
  renderDrawer();
}

function simulateRun() {
  window.clearInterval(runTimer);
  phaseIndex = 0;
  confirmed = false;
  closed = false;
  selectedIntervention = null;
  interventionAccepted = false;
  workflowEvidenceAccepted = false;
  outboxQueued = false;
  outboxReconciled = false;
  feishuDispatched = false;
  lifecycleIndex = 0;
  taskProgress = 0;
  traceIndex = 0;
  renderAll();
  showToast(`已注入 ${selected().id}，开始主动研判`);
  runTimer = window.setInterval(() => {
    if (phaseIndex >= 3) {
      window.clearInterval(runTimer);
      showToast("证据链已形成，等待飞书派发与人工确认");
      return;
    }
    phaseIndex += 1;
    renderAll();
  }, 720);
}

function dispatchFeishu() {
  const decision = policyDecision("dispatch");
  if (!decision.allowed) {
    showToast(`派发被策略服务阻断：${decision.reason}`);
    return;
  }
  phaseIndex = Math.max(3, phaseIndex);
  feishuDispatched = true;
  taskProgress = 0;
  workflowEvidenceAccepted = false;
  outboxQueued = Boolean(decision.queue);
  outboxReconciled = false;
  renderAll();
  const action = decision.queue ? `飞书不可用，事件已进入Outbox：${selected().id}` : `已按幂等键 ${selected().id} 编排 Base、卡片和飞书任务`;
  showToast(action);
}

function confirmAction() {
  const decision = policyDecision("confirm");
  if (!decision.allowed) {
    showToast(`确认被策略服务阻断：${decision.reason}`);
    return;
  }
  confirmed = true;
  taskProgress = 1;
  renderAll();
  showToast("质量负责人已确认处置；系统开始跟踪复检与设备恢复");
}

function acceptWorkflowEvidence() {
  const decision = policyDecision("writeback");
  if (!decision.allowed) {
    showToast(`回写验收被策略服务阻断：${decision.reason}`);
    return;
  }
  workflowEvidenceAccepted = true;
  taskProgress = selected().tasks.length;
  renderAll();
  showToast("任务状态、复检附件与知识变更草案已独立验收");
}

function closeEvent() {
  const decision = policyDecision("close");
  if (!decision.allowed) {
    showToast(`关闭被策略服务阻断：${decision.reason}`);
    return;
  }
  closed = true;
  phaseIndex = 4;
  activeQuestion = "关闭后如何复盘";
  renderAll();
  showToast("关闭条件校验通过，已生成待审核的FMEA/控制计划变更单");
}

function downloadEvent() {
  const payload = {
    generatedAt: new Date().toISOString(),
    scenario: selected(),
    assurance: assurance(),
    feishuRecord: buildRecord(),
    governance: { runMode, humanConfirmed: confirmed, intervention: selectedIntervention, interventionAccepted, workflowEvidenceAccepted, resilienceState, outboxQueued, closed, boundary: "decision-support", passport: eventPassport() }
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${selected().id}-evidence-package.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast("事件证据包已导出");
}

function openDrawer(event) {
  drawerFocusRef = event?.currentTarget?.dataset?.evidenceRef || null;
  drawerReturnFocus = event?.currentTarget || document.activeElement;
  renderDrawer();
  $("drawerBackdrop").hidden = false;
  $("evidenceDrawer").classList.add("open");
  $("evidenceDrawer").setAttribute("aria-hidden", "false");
  $("drawerCloseBtn").focus();
  if (drawerFocusRef) {
    const target = [...document.querySelectorAll("#drawerContent [data-evidence-id]")].find((node) => node.dataset.evidenceId === drawerFocusRef);
    target?.classList.add("focused");
    target?.scrollIntoView({ block: "start" });
  }
}

function closeDrawer() {
  $("drawerBackdrop").hidden = true;
  $("evidenceDrawer").classList.remove("open");
  $("evidenceDrawer").setAttribute("aria-hidden", "true");
  drawerReturnFocus?.focus?.();
  drawerReturnFocus = null;
  drawerFocusRef = null;
}

function bindEvents() {
  $("injectBtn").addEventListener("click", () => {
    selectedIndex = (selectedIndex + 1) % qualityScenarios.length;
    simulateRun();
  });
  $("runDataAuditBtn").addEventListener("click", runCompanyAudit);
  $("dispatchBtn").addEventListener("click", dispatchFeishu);
  $("confirmBtn").addEventListener("click", confirmAction);
  $("writebackBtn").addEventListener("click", acceptWorkflowEvidence);
  $("resolveBtn").addEventListener("click", closeEvent);
  $("exportBtn").addEventListener("click", downloadEvent);
  $("evidenceDrawerBtn").addEventListener("click", openDrawer);
  $("drawerCloseBtn").addEventListener("click", closeDrawer);
  $("drawerBackdrop").addEventListener("click", closeDrawer);
  $("askForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $("askInput").value.trim();
    if (!value) return;
    renderDialogue(value);
    $("askInput").value = "";
  });
  $("copyRecordBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("bitableRecord").textContent);
      showToast("统一事件记录已复制");
    } catch {
      showToast("浏览器未开放剪贴板权限，可在记录框中手动选择");
    }
  });
  document.querySelectorAll("#modeSelector button").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.mode === "controlled") {
      showToast("L3生产权限不能由浏览器授予，须由企业审批和服务端策略发布");
      return;
    }
    runMode = button.dataset.mode;
    renderAll();
    showToast(`已切换为${button.textContent}；权限边界与写入策略同步更新`);
  }));
  document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.target).scrollIntoView({ behavior: "smooth" });
  }));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

if (!qualityScenarios.length) {
  document.body.innerHTML = "<main><p>场景数据加载失败。</p></main>";
} else {
  renderAll();
  bindEvents();
}
