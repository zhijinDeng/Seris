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
  { label: "异常定位时间", value: "下降 40%–60%", note: "对比人工跨MES、设备、维修与FMEA查询耗时。" },
  { label: "P1任务派发", value: "小于 1 分钟", note: "从风险触发到飞书任务和卡片生成的系统时间戳。" },
  { label: "根因 Top-3 命中", value: "不低于 80%", note: "以质量工程师最终复盘根因为金标准进行盲测。" },
  { label: "复盘知识沉淀", value: "不低于 90%", note: "关闭事件的根因、措施、复检与责任确认字段完整率。" }
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

const $ = (id) => document.getElementById(id);
const selected = () => qualityScenarios[selectedIndex];

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
  renderChart();
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
  const direct = item.chat[question];
  if (direct) return direct;
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
  const questions = ["为什么升级P1", "影响哪些VIN", "证据链是什么", "如何派发飞书任务", "关闭后如何复盘"];
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
  const labels = ["产线", "工位", "设备", "参数", "质量风险", "案例", "根因"];
  const relations = ["包含", "配置", "产生", "影响", "命中", "指向"];
  $("kgPath").innerHTML = item.kgPath.map((node, index) => `
    <div class="kg-node ${index >= 4 ? "active" : ""}"><small>${labels[index] || `节点${index + 1}`}</small><strong>${node}</strong></div>
    ${index < item.kgPath.length - 1 ? `<div class="kg-edge"><span>${relations[index] || "关联"}</span></div>` : ""}
  `).join("");
  $("evidenceList").innerHTML = item.evidence.map((evidence, index) => `<li><b>E${index + 1}</b> ${evidence}</li>`).join("");
  const entity = item.id.includes("DC") ? "零件批次" : "VIN/车辆";
  $("impactMode").textContent = item.id.includes("DC") ? "批次追溯" : "VIN 追溯";
  $("impactChain").innerHTML = [
    ["触发点", `${item.station} / ${item.equipment}`],
    ["时间窗", item.trend],
    [entity, item.scope],
    ["风险", item.decision],
    ["关闭门", "复检合格 + 设备恢复 + 责任确认"]
  ].map(([key, value]) => `<div class="impact-step"><b>${key}</b><span>${value}</span></div>`).join("");
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
      "工艺窗口": `${item.lower}-${item.upper}${item.unit}`,
      "影响范围": item.scope,
      "根因假设": item.rootCause,
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
  $("sourceSupport").innerHTML = references.map((reference) => `
    <article class="source-item"><strong>${reference.type}｜${reference.title}</strong><p>${reference.detail}</p><a href="${reference.url}" target="_blank" rel="noreferrer">查看来源</a></article>
  `).join("");
}

function renderDrawer() {
  const item = selected();
  $("drawerContent").innerHTML = `
    <section class="drawer-group"><h3>事件摘要</h3><p>${item.id} · ${item.scene} · ${item.risk}</p><p>${item.decision}</p></section>
    <section class="drawer-group"><h3>原始与派生证据</h3><ol>${item.evidence.map((evidence) => `<li>${evidence}</li>`).join("")}</ol></section>
    <section class="drawer-group"><h3>根因假设</h3><p>${item.rootCause}</p><p>置信度 ${Math.round(item.confidence * 100)}%，必须由点检、复检和维修结果证实或证伪。</p></section>
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
