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
    validation: document.querySelectorAll(".validation-item").length
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
  await desktop.screenshot({ path: path.join(outputDir, "final-desktop.png") });
  await desktop.locator("#reasoning").screenshot({ path: path.join(outputDir, "final-reasoning.png") });

  const expectedLeads = ["22 分钟", "31 分钟", "18 分钟", "46 分钟"];
  const scenarios = desktop.locator("#scenarioList .scenario");
  for (let index = 0; index < expectedLeads.length; index += 1) {
    await scenarios.nth(index).click();
    expect((await desktop.locator("#leadTime").textContent()).trim() === expectedLeads[index], `场景${index + 1}前置量不一致`);
  }
  await scenarios.nth(0).click();
  await desktop.locator("#traceSelector button").nth(1).click();
  expect((await desktop.locator("#impactChain").textContent()).includes("VIN 8124"), "VIN级因果链切换失败");
  await desktop.locator("#dispatchBtn").click();
  await desktop.locator("#confirmBtn").click();
  expect((await desktop.locator("#validationSummary").textContent()).includes("3/5"), "人工确认后的关闭门状态错误");
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
