const events = [
  {
    id: "E-20260717-001",
    scene: "总装拧紧",
    equipment: "TQ-17智能拧紧枪",
    parameter: "M12底盘螺栓扭矩",
    value: "86.4 N·m",
    range: "92-108 N·m",
    risk: "P1",
    summary: "连续3辆车同点位低于下限",
    scope: "VIN尾号 8123-8125",
    path: ["总装一线", "底盘合装", "TQ-17", "扭矩偏低", "预紧力不足"],
    evidence: ["参数低于工艺窗口下限", "同工位连续出现，非孤立点", "历史案例C-009指向套筒磨损/校准偏移"],
    actions: ["暂停该点位自动放行", "隔离并复检3辆车", "校准TQ-17并检查套筒磨损", "复盘结果写入知识图谱"]
  },
  {
    id: "E-20260717-002",
    scene: "焊装焊点",
    equipment: "RB-42焊接机器人",
    parameter: "焊点电流",
    value: "7.1 kA",
    range: "7.4-8.2 kA",
    risk: "P1",
    summary: "电流低位漂移",
    scope: "VIN尾号 8151-8168",
    path: ["焊装二线", "侧围焊接", "RB-42", "电流漂移", "焊点强度风险"],
    evidence: ["电流低于下限", "电极帽寿命接近阈值", "历史案例C-021建议检查二次回路"],
    actions: ["抽检焊核直径", "检查电极帽寿命", "检查二次线接触电阻", "复核焊接参数"]
  },
  {
    id: "E-20260717-003",
    scene: "涂装烘干",
    equipment: "OV-03烘房",
    parameter: "烘房三区温度",
    value: "148 ℃",
    range: "152-160 ℃",
    risk: "P2",
    summary: "低温持续8分钟",
    scope: "VIN尾号 8201-8216",
    path: ["涂装一线", "中涂烘干", "OV-03", "温度偏低", "附着力风险"],
    evidence: ["低温持续超过观察阈值", "影响时间窗内存在同批车辆", "历史案例C-033指向温控回路/风门异常"],
    actions: ["隔离在制车", "复测膜厚与附着力", "检查风门与温控回路", "生成趋势观察任务"]
  }
];

let selected = events[0];

function renderEvents() {
  document.getElementById("events").innerHTML = events.map(e => `
    <div class="event ${e.id === selected.id ? "active" : ""}" onclick="selectEvent('${e.id}')">
      <div class="id">${e.id}</div>
      <strong>${e.scene}：${e.summary}</strong>
      <span class="tag ${e.risk.toLowerCase()}">${e.risk}</span>
      <span class="tag">${e.equipment}</span>
      <p>${e.parameter}：${e.value}，窗口 ${e.range}</p>
    </div>
  `).join("");
}

function renderReasoning() {
  document.getElementById("reasoning").innerHTML = `
    <h3>${selected.scene} Graph RAG证据链</h3>
    <div class="path">
      ${selected.path.map((n, i) => `<div class="node"><span>节点${i + 1}</span>${n}</div>`).join("")}
    </div>
    <div class="evidence">
      <strong>证据</strong>
      <ol>${selected.evidence.map(x => `<li>${x}</li>`).join("")}</ol>
    </div>
    <div class="evidence">
      <strong>处置建议</strong>
      <ol>${selected.actions.map(x => `<li>${x}</li>`).join("")}</ol>
    </div>
  `;
}

function renderTasks() {
  document.getElementById("tasks").innerHTML = selected.actions.map((a, i) => `
    <div class="task">
      <div class="id">TASK-${selected.id.slice(-3)}-${i + 1}</div>
      <strong>${a}</strong>
      <span class="tag risk">${selected.risk}</span>
      <span class="tag">${i === 0 ? "待确认" : "待执行"}</span>
      <p>影响范围：${selected.scope}</p>
    </div>
  `).join("");
}

function renderFeishu() {
  const record = {
    "事件ID": selected.id,
    "风险等级": selected.risk,
    "异常摘要": `${selected.scene}：${selected.summary}`,
    "影响范围": selected.scope,
    "证据链": selected.evidence.join("；"),
    "处置建议": selected.actions.join("；"),
    "状态": selected.risk === "P1" ? "待质量负责人确认" : "待当班工程师处理"
  };
  const actions = [
    ["多维表格", "写入质量事件表", `POST /bitable/v1/apps/:app_token/tables/:table_id/records`],
    ["机器人卡片", "推送风险证据链", `Webhook群通知 ${selected.risk}`],
    ["Aily技能", "解释事件并追问处置进展", `@质量AI 解释 ${selected.id}`],
    ["复盘回写", "关闭任务后沉淀知识", "更新FMEA与质量图谱"]
  ];
  document.getElementById("feishu").innerHTML = `
    <div class="integration-grid">
      ${actions.map(a => `
        <div class="integration">
          <span class="tag">${a[0]}</span>
          <strong>${a[1]}</strong>
          <p>${a[2]}</p>
        </div>
      `).join("")}
    </div>
    <div class="evidence">
      <strong>多维表格记录预览</strong>
      <pre>${JSON.stringify({ fields: record }, null, 2)}</pre>
    </div>
  `;
}

function selectEvent(id) {
  selected = events.find(e => e.id === id);
  renderEvents();
  renderReasoning();
  renderTasks();
  renderFeishu();
}

renderEvents();
renderReasoning();
renderTasks();
renderFeishu();
