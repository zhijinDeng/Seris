const fs = require("fs");
const path = require("path");

const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "output", "playwright");
const target = process.env.SERIS_URL || "http://127.0.0.1:8766/app/index.html";
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
    responsibilityRows: document.querySelectorAll(".responsibility-row").length
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
  await desktop.screenshot({ path: path.join(outputDir, "final-desktop.png") });
  await desktop.locator("#reasoning").screenshot({ path: path.join(outputDir, "final-reasoning.png") });

  await desktop.locator("#modeSelector button[data-mode='shadow']").click();
  expect((await desktop.locator("#permissionLevel").textContent()).includes("L0"), "影子模式权限未切换");
  expect(await desktop.locator("#dispatchBtn").isDisabled(), "L0影子模式必须阻断外部派单");
  await desktop.locator("#modeSelector button[data-mode='collaborative']").click();
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
  await desktop.locator("#interventionOptions button").nth(1).click();
  await desktop.locator("#completeInterventionBtn").click();
  expect((await desktop.locator("#causalHypotheses .hypothesis").first().textContent()).includes("二次回路"), "反事实干预后H2未升为H1");

  await scenarios.nth(0).click();
  await desktop.locator("#resilienceOptions button[data-resilience='feishu-down']").click();
  await desktop.locator("#dispatchBtn").click();
  expect((await desktop.locator("#taskBoard").textContent()).includes("待补偿"), "飞书中断时任务未进入Outbox");
  expect((await desktop.locator("#resilienceOutcome").textContent()).includes("Outbox：1条待补偿"), "缺少幂等补偿记录");
  await desktop.locator("#resilienceOptions button[data-resilience='feishu-down']").click();
  await desktop.locator("#traceSelector button").nth(1).click();
  expect((await desktop.locator("#impactChain").textContent()).includes("VIN 8124"), "VIN级因果链切换失败");
  await desktop.locator("#dispatchBtn").click();
  await desktop.locator("#confirmBtn").click();
  expect((await desktop.locator("#validationSummary").textContent()).includes("3/5"), "人工确认后的关闭门状态错误");
  expect(await desktop.locator("#resolveBtn").isDisabled(), "缺少反事实证据时关闭按钮不应可用");
  await desktop.locator("#interventionOptions button").first().click();
  expect((await desktop.locator("#interventionStatus").textContent()).includes("待实测"), "干预不应在未签署时直接通过");
  expect(await desktop.locator("#resolveBtn").isDisabled(), "缺少检测签署时关闭按钮不应可用");
  await desktop.locator("#completeInterventionBtn").click();
  expect((await desktop.locator("#interventionStatus").textContent()).includes("已签署"), "干预实测未签署");
  expect((await desktop.locator("#validationSummary").textContent()).includes("4/5"), "干预后的关闭门状态错误");
  expect(!(await desktop.locator("#resolveBtn").isDisabled()), "干预证据和人工确认完成后应允许申请关闭");
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

  expect(errors.length === 0, errors.join("\n"));
  await browser.close();
  console.log(JSON.stringify({ desktop: { width: 1600, overflow: false }, mobile: { width: 390, overflow: false }, scenarios: 4, workflow: "closed", screenshots: 4 }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
