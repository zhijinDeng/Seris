const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "output", "playwright");
const target = process.env.SERIS_URL || "http://127.0.0.1:8878/app/index.html";
const executablePath = process.env.PLAYWRIGHT_CHROME;

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function pageMetrics(page) {
  return page.evaluate(() => ({
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    lead: document.getElementById("leadTime")?.textContent.trim(),
    hypotheses: document.querySelectorAll(".hypothesis").length,
    guardrails: document.querySelectorAll(".guardrail").length,
    validation: document.querySelectorAll(".validation-item").length,
    interventions: document.querySelectorAll("#interventionOptions button").length,
    responsibilityRows: document.querySelectorAll(".responsibility-row").length,
    pipelineSteps: document.querySelectorAll(".pipeline-step").length,
    readinessRows: document.querySelectorAll(".readiness-row").length,
    citationButtons: document.querySelectorAll(".bubble-citations button").length
    ,companyMetrics: document.querySelectorAll("#companyDatasetMetrics > div").length
    ,funnelRows: document.querySelectorAll("#relationshipFunnel .funnel-row").length
  }));
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  const errors = [];

  const desktop = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  desktop.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  desktop.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  await desktop.goto(target, { waitUntil: "networkidle" });
  let metrics = await pageMetrics(desktop);
  expect(metrics.scrollWidth <= metrics.width, `桌面端横向溢出：${metrics.scrollWidth}/${metrics.width}`);
  expect(metrics.lead === "22 分钟", `首场景前置量错误：${metrics.lead}`);
  expect(metrics.hypotheses === 3 && metrics.guardrails === 5 && metrics.validation === 5, "因果保障组件数量错误");
  expect(metrics.interventions === 2 && metrics.responsibilityRows === 6, "反事实验证或责任链组件数量错误");
  expect(metrics.pipelineSteps === 6 && metrics.readinessRows === 7, "飞书六对象或生产就绪门数量错误");
  expect(metrics.citationButtons === 4, "数字员工回答缺少证据引用");
  expect(metrics.companyMetrics === 5 && metrics.funnelRows === 4, "企业脱敏数据规模或关系漏斗缺失");
  expect(await desktop.locator("#confirmBtn").isDisabled(), "未派发前不得直接确认处置");
  await desktop.locator("#runDataAuditBtn").click();
  await desktop.waitForTimeout(3300);
  expect((await desktop.locator("#dataAuditTrace").textContent()).includes("P2知识债务事件"), "闭而未解审计未形成受控结论");
  expect((await desktop.locator("#dataAuditTrace").textContent()).includes("不自动写入唯一根因"), "企业审计缺少人工确认边界");
  await desktop.locator("#companyEvidenceBtn").click();
  expect((await desktop.locator("#evidenceDrawer").getAttribute("aria-hidden")) === "false", "企业数据证据链未打开");
  expect((await desktop.locator("#drawerContent").textContent()).includes("121张") && (await desktop.locator("#drawerContent").textContent()).includes("均未关联失效模式"), "企业数据证据链事实不完整");
  await desktop.locator("#drawerCloseBtn").click();
  expect((await desktop.locator("[data-plant='assembly'] b").textContent()).includes("P1"), "首场景未动态点亮总装产线");
  expect((await desktop.locator("[data-plant='welding'] b").textContent()).includes("稳定"), "非当前焊装产线状态错误");
  expect((await desktop.locator("#liveClock").textContent()).trim() === "14:16", "首场景回放时钟错误");
  await desktop.screenshot({ path: path.join(outputDir, "final-desktop.png") });
  await desktop.locator("#reasoning").screenshot({ path: path.join(outputDir, "final-reasoning.png") });

  await desktop.locator("#modeSelector button[data-mode='shadow']").click();
  expect((await desktop.locator("#permissionLevel").textContent()).includes("L0"), "影子模式权限未切换");
  expect(await desktop.locator("#dispatchBtn").isDisabled(), "L0影子模式必须阻断外部派单");
  await desktop.locator("#modeSelector button[data-mode='collaborative']").click();
  await desktop.locator("#modeSelector button[data-mode='controlled']").click();
  expect((await desktop.locator("#permissionLevel").textContent()).includes("L2"), "浏览器不应自行授予L3生产权限");
  await desktop.locator("#resilienceOptions button[data-resilience='data-delay']").click();
  expect((await desktop.locator("#resilienceStatus").textContent()).includes("安全降级"), "数据延迟降级演练失败");
  expect(await desktop.locator("#dispatchBtn").isDisabled(), "数据过期时必须阻断派单");
  await desktop.locator("#resilienceOptions button[data-resilience='data-delay']").click();

  const expectedLeads = ["22 分钟", "31 分钟", "18 分钟", "46 分钟"];
  const scenarios = desktop.locator("#scenarioList .scenario");
  for (let index = 0; index < expectedLeads.length; index += 1) {
    await scenarios.nth(index).click();
    expect((await desktop.locator("#leadTime").textContent()).trim() === expectedLeads[index], `场景${index + 1}前置量不一致`);
  }
  await scenarios.nth(1).click();
  expect((await desktop.locator("[data-plant='welding'] b").textContent()).includes("P1"), "焊装场景未动态切换产线态势");
  expect((await desktop.locator("#liveClock").textContent()).trim() === "09:53", "焊装场景回放时钟错误");
  await desktop.locator("#interventionOptions button").nth(1).click();
  await desktop.locator("#completeInterventionBtn").click();
  const leadingHypothesis = await desktop.locator("#causalHypotheses .hypothesis").first().textContent();
  expect(leadingHypothesis.includes("H2") && leadingHypothesis.includes("Rank 1") && leadingHypothesis.includes("二次回路"), "反事实干预后H2未升为Rank 1");
  expect((await desktop.locator(".rank-shift").textContent()).includes("Rank 2 → Rank 1"), "缺少反事实排序变化对照");

  await scenarios.nth(0).click();
  await desktop.locator("#resilienceOptions button[data-resilience='feishu-down']").click();
  await desktop.locator("#dispatchBtn").click();
  expect((await desktop.locator("#taskBoard").textContent()).includes("待补偿"), "飞书中断时任务未进入Outbox");
  expect((await desktop.locator("#resilienceOutcome").textContent()).includes("Outbox：1条待补偿"), "缺少幂等补偿记录");
  await desktop.locator("#resilienceOptions button[data-resilience='feishu-down']").click();
  expect((await desktop.locator("#feishuStatusTitle").textContent()).includes("补偿完成"), "飞书恢复后未形成补偿完成状态");
  expect((await desktop.locator("#resilienceOutcome").textContent()).includes("补偿完成"), "Outbox补偿回执未展示");
  await desktop.locator("#traceSelector button").nth(1).click();
  expect((await desktop.locator("#impactChain").textContent()).includes("VIN 8124"), "VIN级因果链切换失败");
  await desktop.locator(".bubble-citations button").first().click();
  expect((await desktop.locator("#evidenceDrawer").getAttribute("aria-hidden")) === "false", "回答依据未打开证据包");
  expect(await desktop.locator("#drawerContent .focused").count() === 1, "回答依据未定位到对应证据段");
  await desktop.locator("#drawerCloseBtn").click();
  await desktop.locator("#confirmBtn").click();
  expect((await desktop.locator("#validationSummary").textContent()).includes("3/5"), "人工确认后的关闭门状态错误");
  expect(await desktop.locator("#resolveBtn").isDisabled(), "缺少反事实证据时关闭按钮不应可用");
  await desktop.locator("#interventionOptions button").first().click();
  expect((await desktop.locator("#interventionStatus").textContent()).includes("待实测"), "干预不应在未签署时直接通过");
  expect(await desktop.locator("#resolveBtn").isDisabled(), "缺少检测签署时关闭按钮不应可用");
  await desktop.locator("#completeInterventionBtn").click();
  expect((await desktop.locator("#interventionStatus").textContent()).includes("已签署"), "干预实测未签署");
  expect((await desktop.locator("#validationSummary").textContent()).includes("4/5"), "干预后的关闭门状态错误");
  expect(await desktop.locator("#resolveBtn").isDisabled(), "任务与知识草案未验收时关闭按钮必须禁用");
  await desktop.locator("#writebackBtn").click();
  expect((await desktop.locator("#validationSummary").textContent()).includes("5/5"), "独立任务与知识草案验收后的关闭门状态错误");
  expect(!(await desktop.locator("#resolveBtn").isDisabled()), "五项独立证据完成后应允许申请关闭");
  await desktop.locator("#resolveBtn").click();
  expect((await desktop.locator("#validationSummary").textContent()).includes("5/5"), "关闭后的确定性校验未全部通过");
  expect((await desktop.locator("#gateStatus").textContent()).includes("已验证关闭"), "安全门关闭状态错误");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on("pageerror", (error) => errors.push(`mobile pageerror: ${error.message}`));
  mobile.on("console", (message) => { if (message.type() === "error") errors.push(`mobile console: ${message.text()}`); });
  await mobile.goto(target, { waitUntil: "networkidle" });
  metrics = await pageMetrics(mobile);
  expect(metrics.scrollWidth <= metrics.width, `移动端横向溢出：${metrics.scrollWidth}/${metrics.width}`);
  await mobile.screenshot({ path: path.join(outputDir, "final-mobile.png") });
  await mobile.locator(".early-warning-console").screenshot({ path: path.join(outputDir, "final-mobile-warning.png") });

  const local = await browser.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 });
  await local.goto(pathToFileURL(path.join(root, "app", "index.html")).href, { waitUntil: "load" });
  expect((await local.locator("#leadTime").textContent()).trim() === "22 分钟", "file://直接启动失败");
  expect(await local.locator("#writebackBtn").count() === 1, "file://入口缺少完整闭环控件");
  await local.screenshot({ path: path.join(outputDir, "final-projection-1366.png") });

  expect(errors.length === 0, errors.join("\n"));
  await browser.close();
  console.log(JSON.stringify({ desktop: { width: 1600, overflow: false }, mobile: { width: 390, overflow: false }, projection: { width: 1366, fileProtocol: true }, scenarios: 4, companyAudit: "closed-but-unresolved-verified", workflow: "field-close-plus-knowledge-debt", screenshots: 5 }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
