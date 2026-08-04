const qualityScenarios = window.qualityScenarios || [];

const references = [
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
  }
];

const feishuCapabilities = [
  { name: "多维表格", use: "统一事件、VIN/批次、证据、任务、SLA和关闭字段", status: "已在线" },
  { name: "机器人卡片", use: "P1/P2分级通知，在群内确认隔离与复检", status: "接口就绪" },
  { name: "任务中心", use: "负责人、关注人、截止时间、子任务、评论与附件", status: "接口就绪" },
  { name: "Aily", use: "@数字员工查询证据链、影响范围和关闭条件", status: "技能设计" },
  { name: "云文档/知识库", use: "自动生成事件复盘、8D证据包和知识条目", status: "接口就绪" },
  { name: "事件订阅", use: "监听消息交互与任务状态，驱动闭环回写", status: "监听设计" }
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
    traces: [{ id: "VIN 8151", state: "焊核抽检", detail: "09:53过站 · 首个收敛对象 · 已锁定" }, { id: "VIN 8159", state: "批次隔离", detail: "10:01过站 · 漂移中段 · 禁止转序" }, { id: "VIN 8168", state: "范围边界", detail: "10:12过站 · 末个影响对象 · 待抽检" }]
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
    traces: [{ id: "VIN 8201", state: "复测队列", detail: "16:19进炉 · 时间窗起点 · 附着力复测" }, { id: "VIN 8208", state: "隔离", detail: "16:25进炉 · 低温核心段 · 暂缓放行" }, { id: "VIN 8216", state: "范围边界", detail: "16:33进炉 · 温度恢复前末车" }]
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
    traces: [{ id: "件 DC-01", state: "X光待检", detail: "11:29出模 · 风险窗起点 · 批次冻结" }, { id: "件 DC-03", state: "尺寸复核", detail: "11:37出模 · 模温差峰值段" }, { id: "件 DC-06", state: "范围边界", detail: "11:49出模 · 水路恢复前末件" }]
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

let selectedIndex = 0;
let phaseIndex = 2;
let activeQuestion = "证据链是什么";
let confirmed = false;
let closed = false;
let runTimer = null;
let taskProgress = 0;
let traceIndex = 0;

const $ = (id) => document.getElementById(id);
const selected = () => qualityScenarios[selectedIndex];
const assurance = () => assuranceProfiles[selected().id];

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

function selectScenario(index) {
  selectedIndex = index;
  traceIndex = 0;
  phaseIndex = 2;
  activeQuestion = "证据链是什么";
  confirmed = false;
  closed = false;
  taskProgress = 0;
  window.clearInterval(runTimer);
  renderAll();
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
  $("rootCauseText").textContent = `首要根因假设：${item.rootCause}（置信度 ${Math.round(item.confidence * 100)}%）`;
  $("slaBadge").textContent = item.risk === "P1" ? "SLA 30min" : "SLA 当班";
  $("gateStatus").textContent = closed ? "已验证关闭" : confirmed ? "处置已确认" : "待质量负责人确认";
  $("confirmBtn").disabled = confirmed || closed;
  $("resolveBtn").disabled = !confirmed || closed;
  renderEarlyWarning();
  renderChart();
}

function renderEarlyWarning() {
  const profile = assurance();
  $("warningConsensus").textContent = `多引擎共识 ${profile.consensus}`;
  $("leadTime").textContent = `${profile.leadMinutes} 分钟`;
  $("weakSignal").textContent = profile.weakSignal;
  $("weakSignalDetail").textContent = profile.weakSignalDetail;
  $("escalationBasis").textContent = profile.escalationBasis;
  $("warningStages").innerHTML = profile.stages.map(([time, title, detail], index) => `
    <div class="warning-stage ${index <= Math.min(phaseIndex, 2) || closed ? "active" : ""} ${index === 3 ? "future" : ""}">
      <time>${time}</time><b>${title}</b><span>${detail}</span>
    </div>
  `).join("");
}

function createSignalSeries(item) {
  const span = Math.max(item.upper - item.lower, 1);
  const direction = item.value < item.lower ? -1 : 1;
  const baseline = direction < 0 ? item.lower + span * 0.35 : item.upper - span * 0.35;
  const offsets = [0.08, -0.03, 0.05, -0.08, 0.02, -0.03, 0.04, -0.06, 0.02, 0.0, -0.05, 0.03];
  const points = offsets.map((offset, index) => baseline + span * offset + direction * span * Math.max(0, index - 6) * 0.035);
  points.push(item.value);
  return points;
}

function renderChart() {
  const item = selected();
  const values = createSignalSeries(item);
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
  const direct = item.chat[question];
  if (direct) return direct;
  if (/提前|前置|弱信号|显性/.test(question)) return `系统先在${profile.weakSignal}阶段发现偏离，再由${profile.escalationBasis}收敛风险。按本仿真时间窗，比下游检验理论发现时点前置${profile.leadMinutes}分钟。`;
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
  activeQuestion = question;
  $("dialogue").innerHTML = `
    <div class="bubble system">${item.id} · 已完成本体约束、图谱检索和工艺窗口校验</div>
    <div class="bubble agent">我判断该事件进入 ${item.risk} 处置。首要根因假设为：${item.rootCause}。该结论是可证伪假设，不替代现场确认。</div>
    <div class="bubble user">${question}</div>
    <div class="bubble agent">${dialogueAnswer(question)}</div>
    ${closed ? `<div class="bubble system">事件已关闭：复检、设备处理、责任确认和知识回写字段完整。</div>` : ""}
  `;
  const questions = ["如何提前发现", "为什么升级P1", "因果结论可信吗", "影响哪些VIN", "如何派发飞书任务", "关闭条件是什么"];
  $("quickQuestions").innerHTML = questions.map((question) => `<button data-question="${question}">${question}</button>`).join("");
  document.querySelectorAll("#quickQuestions button").forEach((button) => button.addEventListener("click", () => renderDialogue(button.dataset.question)));
}

function renderTasks() {
  const item = selected();
  $("taskBoard").innerHTML = item.tasks.map((task, index) => {
    const done = closed || taskProgress > index;
    const state = done ? "已完成" : phaseIndex >= 3 ? (index === 0 ? "处理中" : "已派发") : task.status;
    return `<div class="task ${done ? "done" : ""}">
      <div class="meta"><span class="tag">TASK-${index + 1}</span><span class="tag">${task.sla}</span><span class="tag">${state}</span></div>
      <strong>${task.action}</strong><span>${task.owner}</span>
    </div>`;
  }).join("");
  $("actionLog").textContent = closed ? "事件关闭并回写知识图谱；复盘文档进入知识库。" : phaseIndex >= 3 ? `已用 ${item.id} 作为幂等键生成协同对象，等待责任人更新。` : "协同编排尚未启动；当前处于证据推理阶段。";
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
  $("causalHypotheses").innerHTML = profile.hypotheses.map((hypothesis, index) => `
    <article class="hypothesis ${index === 0 ? "primary" : ""}">
      <div><span>H${index + 1}</span><strong>${hypothesis.name}</strong><b>${hypothesis.score}%</b></div>
      <p><i>支持</i>${hypothesis.support}</p>
      <p><i>冲突</i>${hypothesis.conflict}</p>
      <p><i>证伪</i>${hypothesis.test}</p>
    </article>
  `).join("");
  $("guardrailChecks").innerHTML = profile.guards.map(([name, status, detail]) => `
    <div class="guardrail ${status === "通过" ? "pass" : "pending"}"><span>${name}</span><b>${status}</b><small>${detail}</small></div>
  `).join("");

  const checks = [
    ["源数据完整", true, "MES、设备、检测与知识版本可追溯"],
    ["影响范围锁定", phaseIndex >= 2 || closed, `已关联${scopeNumber(selected())}及最后合格校验点`],
    ["物理复检通过", closed, confirmed ? "执行中：等待复检与首件结果" : "待处置确认后启动"],
    ["授权人员确认", confirmed || closed, confirmed || closed ? "质量负责人已确认" : "P1禁止自动放行"],
    ["任务与知识回写", closed, closed ? "证据、结论与时间戳已关联" : "关闭后写回台账与知识库"]
  ];
  const passed = checks.filter((check) => check[1]).length;
  $("validationSummary").textContent = closed ? "5/5 已通过" : `${passed}/5 已通过`;
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
  const times = ["T+0s", "T+5s", "T+12s", "T+20s", closed ? "T+复盘" : "待验证"];
  $("elapsedTime").textContent = closed ? "闭环完成" : times[Math.min(phaseIndex, times.length - 1)];
  $("actionTimeline").innerHTML = phases.map((phase, index) => `
    <div class="timeline-step ${index <= phaseIndex || closed ? "active" : ""}">
      <time>${times[index]}</time><div><strong>${phase.label}</strong><span>${index === 1 ? `${item.station}关联质量知识` : phase.detail}</span></div>
    </div>
  `).join("");
}

function buildRecord() {
  const item = selected();
  return {
    fields: {
      "事件ID": item.id,
      "风险等级": item.risk,
      "任务状态": closed ? "已关闭并回写" : phaseIndex >= 3 ? "已派发" : "处置中",
      "设备": item.equipment,
      "工位": item.station,
      "异常参数": `${item.parameter}=${item.value}${item.unit}`,
      "缺陷显性化前置量": `${assurance().leadMinutes}分钟（仿真）`,
      "检测共识": assurance().consensus,
      "工艺窗口": `${item.lower}-${item.upper}${item.unit}`,
      "影响范围": item.scope,
      "根因假设": item.rootCause,
      "候选根因Top3": assurance().hypotheses.map((hypothesis) => `${hypothesis.score}%:${hypothesis.name}`).join("；"),
      "反证动作": assurance().hypotheses[0].test,
      "证据链": item.evidence.join("；"),
      "处置方案": item.decision,
      "责任任务": item.tasks.map((task) => `${task.owner}:${task.action}`).join("；"),
      "人工确认": confirmed ? "已确认" : "待确认",
      "幂等键": item.id,
      "Aily指令": `@知质灵巡 查询 ${item.id}`
    }
  };
}

function renderFeishu() {
  $("feishuPipeline").innerHTML = [
    ["Base 台账", "记录风险线程"], ["消息卡片", "通知与回传"], ["飞书任务", "责任人与SLA"], ["文档知识库", "复盘与回写"]
  ].map(([name, use], index) => `<div class="pipeline-step ${index <= Math.max(0, phaseIndex - 2) || closed ? "active" : ""}"><b>${name}</b><span>${use}</span></div>`).join("");
  $("capabilityMatrix").innerHTML = feishuCapabilities.map((capability) => `
    <div class="capability-item"><b>${capability.name}</b><span>${capability.use}</span><i>${capability.status}</i></div>
  `).join("");
  $("liveProof").innerHTML = `
    <div><span>在线事件表</span><b>赛力斯质量风险事件闭环</b><code>tblFo5Btaj0IBXiD</code></div>
    <div><span>最近验证记录</span><b>recvrcdCDJe5bP</b><code>Base readback passed</code></div>
    <div><span>飞书任务</span><b><a href="https://applink.feishu.cn/client/todo/detail?guid=f10d51e5-cc8e-4c71-9441-cd29a77feacf" target="_blank" rel="noreferrer">P1拧紧质量风险处置</a></b><code>f10d51e5...feacf</code></div>
    <div><span>复盘文档</span><b><a href="https://larkcommunity.feishu.cn/docx/PjludNq8foBhkrxV8VQccsldneb" target="_blank" rel="noreferrer">CASE-TQ质量事件复盘</a></b><code>PjludNq8...dneb</code></div>
  `;
  $("bitableRecord").textContent = JSON.stringify(buildRecord(), null, 2);
}

function renderValueAndSources() {
  $("valueCards").innerHTML = valueTargets.map((target) => `<article class="value-card"><span>${target.label}</span><strong>${target.value}</strong><p>${target.note}</p></article>`).join("");
  $("replicationMatrix").innerHTML = `
    <div class="replication-row header"><b>工序模板</b><b>感知适配</b><b>知识模块</b><b>确定性验证</b><b>成熟度</b></div>
    ${replicationAssets.map((row) => `<div class="replication-row">${row.map((cell, index) => index === 4 ? `<span class="ready">${cell}</span>` : `<span>${cell}</span>`).join("")}</div>`).join("")}
  `;
  $("sourceSupport").innerHTML = references.map((reference) => `
    <article class="source-item"><strong>${reference.type}｜${reference.title}</strong><p>${reference.detail}</p><a href="${reference.url}" target="_blank" rel="noreferrer">查看来源</a></article>
  `).join("");
}

function renderDrawer() {
  const item = selected();
  const profile = assurance();
  $("drawerContent").innerHTML = `
    <section class="drawer-group"><h3>事件摘要</h3><p>${item.id} · ${item.scene} · ${item.risk}</p><p>${item.decision}</p></section>
    <section class="drawer-group"><h3>原始与派生证据</h3><ol>${item.evidence.map((evidence) => `<li>${evidence}</li>`).join("")}</ol></section>
    <section class="drawer-group"><h3>根因假设</h3><p>${item.rootCause}</p><p>置信度 ${Math.round(item.confidence * 100)}%，必须由点检、复检和维修结果证实或证伪。</p></section>
    <section class="drawer-group"><h3>候选根因与反证动作</h3><ol>${profile.hypotheses.map((hypothesis) => `<li><b>${hypothesis.score}% ${hypothesis.name}</b>：${hypothesis.test}</li>`).join("")}</ol></section>
    <section class="drawer-group"><h3>关闭条件</h3><ol><li>影响车辆或零件完成隔离与复检</li><li>设备/工艺恢复并通过首件确认</li><li>责任任务、时间戳和附件齐全</li><li>质量负责人确认放行或继续升级</li><li>根因与措施写回知识图谱和复盘文档</li></ol></section>
  `;
}

function renderAll() {
  renderScenarioList();
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
  phaseIndex = Math.max(3, phaseIndex);
  taskProgress = 0;
  renderAll();
  showToast(`已按幂等键 ${selected().id} 编排 Base、卡片和飞书任务`);
}

function confirmAction() {
  if (phaseIndex < 3) dispatchFeishu();
  confirmed = true;
  taskProgress = 1;
  renderAll();
  showToast("质量负责人已确认处置；系统开始跟踪复检与设备恢复");
}

function closeEvent() {
  if (!confirmed) {
    showToast("P1事件需要质量负责人先确认处置");
    return;
  }
  closed = true;
  phaseIndex = 4;
  taskProgress = selected().tasks.length;
  activeQuestion = "关闭后如何复盘";
  renderAll();
  showToast("关闭条件校验通过，复盘结果已进入知识沉淀链路");
}

function downloadEvent() {
  const payload = {
    generatedAt: new Date().toISOString(),
    scenario: selected(),
    assurance: assurance(),
    feishuRecord: buildRecord(),
    governance: { humanConfirmed: confirmed, closed, boundary: "decision-support" }
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

function openDrawer() {
  renderDrawer();
  $("drawerBackdrop").hidden = false;
  $("evidenceDrawer").classList.add("open");
  $("evidenceDrawer").setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  $("drawerBackdrop").hidden = true;
  $("evidenceDrawer").classList.remove("open");
  $("evidenceDrawer").setAttribute("aria-hidden", "true");
}

function bindEvents() {
  $("injectBtn").addEventListener("click", () => {
    selectedIndex = (selectedIndex + 1) % qualityScenarios.length;
    simulateRun();
  });
  $("dispatchBtn").addEventListener("click", dispatchFeishu);
  $("confirmBtn").addEventListener("click", confirmAction);
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
  document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.target).scrollIntoView({ behavior: "smooth" });
  }));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function startClock() {
  const tick = () => {
    $("liveClock").textContent = new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());
  };
  tick();
  window.setInterval(tick, 1000);
}

if (!qualityScenarios.length) {
  document.body.innerHTML = "<main><p>场景数据加载失败。</p></main>";
} else {
  renderAll();
  bindEvents();
  startClock();
}
