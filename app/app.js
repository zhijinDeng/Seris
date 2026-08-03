const scenarios = [
  {
    "id": "CASE-TQ-20260719-01",
    "scene": "总装底盘合装拧紧",
    "equipment": "TQ-17智能拧紧枪",
    "station": "GA-12底盘合装工位",
    "parameter": "M12关键螺栓扭矩",
    "value": 86.4,
    "unit": "N·m",
    "lower": 92,
    "upper": 108,
    "trend": "连续3辆车同点位低于下限，角度补偿波动同步扩大",
    "risk": "P1",
    "scope": "VIN尾号8123-8125，含2辆待下线、1辆待路试",
    "rootCause": "套筒磨损叠加设备校准漂移，导致实际预紧力不足",
    "decision": "暂停该点位自动放行，隔离影响车辆并启动复检",
    "confidence": 0.86,
    "kgPath": [
      "总装一线",
      "底盘合装工位",
      "TQ-17智能拧紧枪",
      "M12关键螺栓扭矩",
      "预紧力不足风险",
      "历史案例C-009",
      "套筒磨损/校准漂移"
    ],
    "evidence": [
      "参数86.4N·m低于92-108N·m工艺窗口",
      "同一设备、同一工位、连续3辆车重复出现，排除单车偶发优先级下降",
      "角度补偿波动与扭矩下探同步，符合套筒磨损与校准偏移组合特征",
      "历史案例C-009记录相同工位症状，关闭措施为校准设备并更换套筒"
    ],
    "tasks": [
      {
        "owner": "总装质量工程师",
        "action": "锁定8123-8125三辆车并执行复检",
        "sla": "30分钟",
        "status": "待确认"
      },
      {
        "owner": "设备工程师",
        "action": "校准TQ-17并检查套筒磨损",
        "sla": "45分钟",
        "status": "待执行"
      },
      {
        "owner": "班组长",
        "action": "切换备用拧紧枪并复核首件",
        "sla": "20分钟",
        "status": "待执行"
      },
      {
        "owner": "质量知识管理员",
        "action": "关闭后回写FMEA控制计划",
        "sla": "当班",
        "status": "待回写"
      }
    ],
    "chat": {
      "为什么升级P1": "风险来自三重证据叠加：关键安全连接件、连续车辆同点位越界、历史案例指向设备侧根因。若仅看单点数值是P2，加入时空重复和质量影响后升为P1。",
      "影响哪些VIN": "当前锁定VIN尾号8123-8125，时间窗为14:18至14:26。后续会按设备恢复前最后一次合格校验向前扩展核查5辆车。",
      "证据链是什么": "证据链为：TQ-17设备告警、扭矩窗口越界、角度补偿波动、同工位连续复现、历史案例C-009、FMEA条目FM-TQ-04。",
      "如何派发飞书任务": "系统写入多维表格质量事件表，向总装质量群发送机器人卡片，并通过Aily入口接受责任人更新。P1任务带30分钟SLA和车辆隔离状态。",
      "关闭后如何复盘": "关闭条件包括复检合格、设备校准完成、备用设备首件合格、责任人确认。复盘结果会写回图谱的设备-症状-根因-措施关系。"
    }
  },
  {
    "id": "CASE-WD-20260719-02",
    "scene": "焊装侧围点焊",
    "equipment": "RB-42焊接机器人",
    "station": "BIW-07侧围焊接工位",
    "parameter": "焊点电流",
    "value": 7.1,
    "unit": "kA",
    "lower": 7.4,
    "upper": 8.2,
    "trend": "电流低位漂移12分钟，电极帽寿命接近阈值",
    "risk": "P1",
    "scope": "VIN尾号8151-8168，待抽检焊核直径",
    "rootCause": "电极帽磨损或二次回路接触电阻升高导致热输入不足",
    "decision": "拦截影响批次，抽检焊核并检查二次回路",
    "confidence": 0.79,
    "kgPath": [
      "焊装二线",
      "侧围焊接",
      "RB-42",
      "焊点电流",
      "热输入不足",
      "焊点强度风险",
      "电极帽寿命"
    ],
    "evidence": [
      "焊点电流7.1kA低于7.4kA下限",
      "漂移持续12分钟，覆盖18辆车的关键连接区域",
      "电极帽寿命达到92%，与电流补偿失败的历史模式一致",
      "点检记录显示二次回路接触电阻上升，需要现场确认"
    ],
    "tasks": [
      {
        "owner": "焊装质量工程师",
        "action": "按批次抽检焊核直径并记录结果",
        "sla": "40分钟",
        "status": "待执行"
      },
      {
        "owner": "设备工程师",
        "action": "更换电极帽并检查二次线连接",
        "sla": "30分钟",
        "status": "待执行"
      },
      {
        "owner": "工艺工程师",
        "action": "复核焊接规范与补偿参数",
        "sla": "60分钟",
        "status": "待确认"
      }
    ],
    "chat": {
      "为什么升级P1": "焊点属于车身结构强度关键质量项，电流越界持续时间长且覆盖批次较大，因此直接进入P1处置。",
      "影响哪些VIN": "当前批次锁定VIN尾号8151-8168。若首轮焊核抽检不合格，会向前扩展至上一次电极帽更换后的全部车辆。",
      "证据链是什么": "证据链为：RB-42电流漂移、焊点热输入不足、结构强度风险、电极帽寿命记录、二次回路点检记录。",
      "如何派发飞书任务": "多维表格生成焊装质量事件，机器人卡片同步焊装质量群，Aily跟踪抽检和设备处理进展。",
      "关闭后如何复盘": "系统记录抽检结果、电极帽状态、参数恢复曲线，并更新电极帽寿命阈值与提前维护规则。"
    }
  },
  {
    "id": "CASE-PA-20260719-03",
    "scene": "涂装中涂烘干",
    "equipment": "OV-03烘房",
    "station": "PA-05中涂烘干工位",
    "parameter": "三区温度",
    "value": 148,
    "unit": "℃",
    "lower": 152,
    "upper": 160,
    "trend": "温度低于下限8分钟，风门开度反馈滞后",
    "risk": "P2",
    "scope": "VIN尾号8201-8216，进入附着力复测队列",
    "rootCause": "风门执行机构响应滞后或温控回路调节不足",
    "decision": "隔离时间窗车辆，执行膜厚与附着力复测",
    "confidence": 0.72,
    "kgPath": [
      "涂装一线",
      "中涂烘干",
      "OV-03烘房",
      "三区温度",
      "固化不足",
      "附着力风险",
      "风门执行机构"
    ],
    "evidence": [
      "三区温度148℃低于152℃工艺下限",
      "低温持续8分钟且与风门反馈滞后同窗发生",
      "同批车辆需补充膜厚、附着力和外观复测",
      "历史案例C-033显示风门执行机构卡滞会造成同类趋势"
    ],
    "tasks": [
      {
        "owner": "涂装质量工程师",
        "action": "隔离影响车辆并完成附着力复测",
        "sla": "当班",
        "status": "待执行"
      },
      {
        "owner": "设备工程师",
        "action": "检查风门执行机构与温控回路",
        "sla": "60分钟",
        "status": "待执行"
      },
      {
        "owner": "工艺工程师",
        "action": "复核烘干曲线并确认放行条件",
        "sla": "当班",
        "status": "待确认"
      }
    ],
    "chat": {
      "为什么升级P1": "当前未升为P1，因为温度越界持续时间和质量影响仍可通过复测控制；若附着力复测不合格或连续批次复现，将升为P1。",
      "影响哪些VIN": "当前锁定VIN尾号8201-8216，依据为烘房三区低温时间窗与MES过站记录交叉结果。",
      "证据链是什么": "证据链为：三区温度越界、风门反馈滞后、MES过站窗口、历史案例C-033、附着力复测结果。",
      "如何派发飞书任务": "系统生成P2质量观察任务，通知涂装质量群，并在多维表格中跟踪复测数据和放行结论。",
      "关闭后如何复盘": "关闭后回写温控趋势、风门检修结果和放行依据，形成后续早期信号识别规则。"
    }
  },
  {
    "id": "CASE-DC-20260719-04",
    "scene": "一体化压铸冷却",
    "equipment": "DC-9000T压铸单元",
    "station": "DC-02后车体压铸工位",
    "parameter": "模温差",
    "value": 18,
    "unit": "℃",
    "lower": 0,
    "upper": 12,
    "trend": "模温差扩大并伴随局部冷却水流量波动",
    "risk": "P1",
    "scope": "同模次后车体件6件，等待X光与尺寸复核",
    "rootCause": "冷却水路局部堵塞或温控阀响应异常，引发缩孔和尺寸稳定性风险",
    "decision": "冻结同模次零件，执行X光检测与尺寸复核",
    "confidence": 0.81,
    "kgPath": [
      "压铸单元",
      "模温控制",
      "冷却水路",
      "模温差扩大",
      "凝固不均",
      "缩孔/尺寸风险",
      "X光复核"
    ],
    "evidence": [
      "模温差18℃超过12℃控制上限",
      "局部冷却水流量波动与模温差扩大同窗出现",
      "压铸件为结构承载部件，质量影响等级高",
      "工艺知识库记录冷却不均与缩孔、变形风险强相关"
    ],
    "tasks": [
      {
        "owner": "压铸质量工程师",
        "action": "冻结同模次零件并安排X光检测",
        "sla": "45分钟",
        "status": "待执行"
      },
      {
        "owner": "设备工程师",
        "action": "检查冷却水路、过滤器和温控阀响应",
        "sla": "60分钟",
        "status": "待执行"
      },
      {
        "owner": "尺寸工程师",
        "action": "复核关键安装点尺寸稳定性",
        "sla": "当班",
        "status": "待执行"
      }
    ],
    "chat": {
      "为什么升级P1": "压铸后车体件为关键结构件，模温差越界叠加水流量波动，缺陷可能在后续工序才暴露，因此采用P1前置拦截。",
      "影响哪些VIN": "当前影响范围不是VIN而是同模次后车体件6件；完成装配绑定后会自动映射到车辆级一车一档。",
      "证据链是什么": "证据链为：模温差越界、冷却水流量波动、结构件质量等级、工艺规则、X光与尺寸复核记录。",
      "如何派发飞书任务": "系统把零件批次写入多维表格并生成跨专业任务，压铸、设备和尺寸工程角色各自接收卡片。",
      "关闭后如何复盘": "复盘会沉淀水路堵塞、模温差、X光结果和尺寸偏差之间的关系，优化下一次告警阈值。"
    }
  }
];

window.qualityScenarios = scenarios;

// Compatibility renderer retained for the original lightweight demo.
// The enterprise dashboard in dashboard.js is the active experience.
if (false) {
let selected = scenarios[0];
let activeQuestion = "证据链是什么";
let closed = false;

const factoryFacts = [
  { value: "3000+", label: "机器人协同", note: "支撑高节拍与多点位自动化" },
  { value: "100%", label: "关键工序自动化", note: "适合事件流连续捕捉" },
  { value: "一车一档", label: "车辆级追溯", note: "把设备风险映射到VIN" },
  { value: "46类", label: "AI检测场景", note: "形成质量主动感知入口" }
];

const sourceSupport = [
  {
    title: "赛力斯超级工厂公开资料",
    detail: "质量自动化管理系统已覆盖全过程数据采集、异常特征提取、控线、异常设备定位和一车一档。",
    use: "方案把这些基础升级为主动研判、任务派发和知识回写。"
  },
  {
    title: "华为智慧园区案例",
    detail: "AI、联接、计算、存储、数字能源和云共同支撑园区数据资产汇聚，AIoT检测点进入制造流程。",
    use: "方案采用事件流加知识图谱，将现场信号转化为可执行质量事件。"
  },
  {
    title: "制造质量知识图谱研究",
    detail: "HCP知识图谱、PPR-FMEA图谱和GraphRAG研究均指向多源知识组织、多跳检索和根因分析。",
    use: "方案用设备-工艺-质量图谱承接根因假设、证据链和复盘沉淀。"
  },
  {
    title: "飞书开放能力",
    detail: "多维表格记录、机器人卡片和Aily入口可承接事件、任务、责任人、SLA和关闭依据。",
    use: "当前演示保留字段映射；凭证接入后可写入在线表格和群消息。"
  }
];

const feishuLive = {
  status: "本机已完成Feishu CLI用户授权",
  base: "larkcommunity.feishu.cn/base/DYAabhZeiagT0ZsjGaTcWFPrn7b",
  table: "赛力斯质量风险事件闭环",
  tableId: "tblFo5Btaj0IBXiD",
  lastRecordId: "recvrcdCDJe5bP",
  script: "powershell -ExecutionPolicy Bypass -File D:\\赛力斯\\scripts\\sync_feishu_quality_event.ps1 -WriteRecord",
  command: "@知质灵巡 查询 CASE-TQ-20260719-01",
  flow: [
    "异常事件写入质量事件表",
    "P1/P2风险等级驱动责任任务",
    "Aily问答返回证据链和关闭条件",
    "复检与维修结果回写知识图谱"
  ]
};

const $ = (id) => document.getElementById(id);

function riskTag(risk) {
  return `<span class="tag ${risk}">${risk}</span>`;
}

function renderScenarioList() {
  const compact = window.innerWidth <= 760;
  $("scenarioList").innerHTML = scenarios.map((item, index) => {
    const trend = compact && item.trend.length > 18 ? `${item.trend.slice(0, 18)}...` : item.trend;
    return `
      <div class="scenario ${item.id === selected.id ? "active" : ""}" data-index="${index}">
        <div class="meta">${riskTag(item.risk)}<span class="tag">${item.equipment}</span></div>
        <strong>${item.scene}</strong>
        <p>${trend}</p>
      </div>
    `;
  }).join("");
  document.querySelectorAll(".scenario").forEach((node) => {
    node.addEventListener("click", () => {
      selected = scenarios[Number(node.dataset.index)];
      activeQuestion = "证据链是什么";
      closed = false;
      renderAll();
    });
  });
}

function renderHeader() {
  $("caseTitle").innerHTML = `<span>${selected.scene}</span><span>${selected.parameter}异常</span>`;
  const compactHeader = window.innerWidth <= 760;
  $("caseSummary").innerHTML = compactHeader
    ? `<span>已捕捉：${selected.equipment} / ${selected.parameter}</span><span>处置：${selected.decision}。</span>`
    : `<span>已捕捉：${selected.equipment}在${selected.station}出现${selected.trend}。</span><span>处置：${selected.decision}。</span>`;
  $("riskLevel").textContent = selected.risk;
  $("confidence").textContent = `${Math.round(selected.confidence * 100)}%`;
  $("scope").textContent = selected.scope;
}

function renderFactoryFacts() {
  $("factoryFacts").innerHTML = factoryFacts.map((item) => `
    <article>
      <strong>${item.value}</strong>
      <span>${item.label}</span>
      <p>${item.note}</p>
    </article>
  `).join("");
}

function renderDialogue() {
  const answer = selected.chat[activeQuestion];
  $("dialogue").innerHTML = `
    <div class="bubble agent">我已完成本体约束校验、历史案例检索和工艺窗口比对。当前事件进入${selected.risk}处置，根因假设为：${selected.rootCause}。</div>
    <div class="bubble user">${activeQuestion}</div>
    <div class="bubble agent">${answer}</div>
    ${closed ? `<div class="bubble agent">任务关闭信号已收到：复检、设备处理和责任确认字段齐全，复盘结果进入质量知识图谱。</div>` : ""}
  `;
  $("quickQuestions").innerHTML = Object.keys(selected.chat).map((q) => `<button data-q="${q}">${q}</button>`).join("");
  document.querySelectorAll("#quickQuestions button").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeQuestion = btn.dataset.q;
      renderDialogue();
    });
  });
}

function renderEvidence() {
  $("kgPath").innerHTML = selected.kgPath.map((node, index) => `
    <div class="node"><small>节点${index + 1}</small>${node}</div>
  `).join("");
  $("evidenceList").innerHTML = selected.evidence.map((item) => `<li>${item}</li>`).join("");
}

function renderTasks() {
  $("taskBoard").innerHTML = selected.tasks.map((task, index) => `
    <div class="task">
      <div class="meta"><span class="tag">TASK-${index + 1}</span><span class="tag">${task.sla}</span><span class="tag">${closed ? "已关闭" : task.status}</span></div>
      <strong>${task.action}</strong>
      <span>${task.owner}</span>
    </div>
  `).join("");
}

function riskFactors() {
  const range = `${selected.lower}-${selected.upper}${selected.unit}`;
  const over = selected.value < selected.lower || selected.value > selected.upper ? "越界" : "接近边界";
  const repeat = selected.trend.includes("连续") || selected.trend.includes("持续") || selected.trend.includes("漂移") ? "重复/持续" : "单次";
  const impact = selected.risk === "P1" ? "关键质量项" : "可复测控制";
  return [
    { name: "工艺窗口", value: `${selected.value}${selected.unit} / ${range}`, level: over },
    { name: "时空模式", value: selected.trend, level: repeat },
    { name: "质量影响", value: selected.scope, level: impact },
    { name: "知识命中", value: selected.rootCause, level: `${Math.round(selected.confidence * 100)}%` }
  ];
}

function renderRiskFactors() {
  $("riskFactors").innerHTML = riskFactors().map((item) => `
    <article>
      <div><b>${item.name}</b><span>${item.level}</span></div>
      <p>${item.value}</p>
    </article>
  `).join("");
}

function timelineItems() {
  return [
    { time: "T+0s", title: "主动捕捉", detail: `${selected.equipment} / ${selected.parameter}触发事件流` },
    { time: "T+5s", title: "图谱定位", detail: `${selected.station}关联工艺窗口、质量特性和历史案例` },
    { time: "T+12s", title: "证据生成", detail: `${selected.evidence.length}条证据形成GraphRAG上下文` },
    { time: "T+20s", title: "任务派发", detail: `${selected.tasks.length}个角色进入飞书协同任务` },
    { time: closed ? "已关闭" : "进行中", title: "复盘回写", detail: closed ? "关闭依据完整，根因与措施回写知识图谱" : "等待复检、设备处理和责任确认" }
  ];
}

function renderTimeline() {
  $("actionTimeline").innerHTML = timelineItems().map((item) => `
    <div>
      <time>${item.time}</time>
      <strong>${item.title}</strong>
      <span>${item.detail}</span>
    </div>
  `).join("");
}

function renderSourceSupport() {
  $("sourceSupport").innerHTML = sourceSupport.map((item) => `
    <article>
      <strong>${item.title}</strong>
      <p>${item.detail}</p>
      <span>${item.use}</span>
    </article>
  `).join("");
}

function renderBitable() {
  const record = {
    fields: {
      "事件ID": selected.id,
      "风险等级": selected.risk,
      "设备": selected.equipment,
      "工位": selected.station,
      "异常参数": `${selected.parameter}=${selected.value}${selected.unit}`,
      "工艺窗口": `${selected.lower}-${selected.upper}${selected.unit}`,
      "影响范围": selected.scope,
      "根因假设": selected.rootCause,
      "处置决策": selected.decision,
      "证据链": selected.evidence.join("；"),
      "责任任务数": selected.tasks.length,
      "任务状态": closed ? "已关闭并回写" : "处置中",
      "Aily入口": `@知质灵巡 查询 ${selected.id}`,
      "机器人卡片": `${selected.risk} ${selected.scene} ${selected.decision}`
    }
  };
  $("bitableRecord").textContent = JSON.stringify(record, null, 2);
}

function renderFeishuLive() {
  $("feishuLive").innerHTML = `
    <div class="live-grid">
      <article><span>授权状态</span><strong>${feishuLive.status}</strong></article>
      <article><span>目标Base</span><strong>${feishuLive.base}</strong></article>
      <article><span>事件表</span><strong>${feishuLive.table}<br>${feishuLive.tableId}</strong></article>
      <article><span>最新记录</span><strong>${feishuLive.lastRecordId}</strong></article>
      <article><span>Aily入口</span><strong>${feishuLive.command}</strong></article>
    </div>
    <div class="live-command">${feishuLive.script}</div>
    <ol class="live-flow">${feishuLive.flow.map((item) => `<li>${item}</li>`).join("")}</ol>
  `;
}

function renderAll() {
  renderScenarioList();
  renderHeader();
  renderFactoryFacts();
  renderDialogue();
  renderEvidence();
  renderTasks();
  renderRiskFactors();
  renderTimeline();
  renderBitable();
  renderFeishuLive();
  renderSourceSupport();
}

$("injectBtn").addEventListener("click", () => {
  const current = scenarios.findIndex((item) => item.id === selected.id);
  selected = scenarios[(current + 1) % scenarios.length];
  activeQuestion = "为什么升级P1";
  closed = false;
  renderAll();
});

$("resolveBtn").addEventListener("click", () => {
  closed = true;
  activeQuestion = "关闭后如何复盘";
  renderAll();
});

renderAll();
}
