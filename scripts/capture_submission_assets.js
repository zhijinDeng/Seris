const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const executablePath = process.env.PLAYWRIGHT_CHROME;
const target = process.env.SERIS_URL || pathToFileURL(path.join(root, "app", "index.html")).href;
const outputDir = path.join(root, "docs", "assets", "submission");

async function screenshotElement(page, selector, name) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  await element.screenshot({ path: path.join(outputDir, name) });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true, executablePath });

  for (const [source, output] of [
    ["diagram/function-logic-tree.html", "00-function-logic-tree.png"],
    ["diagram/enterprise-landing-loop.html", "01-enterprise-landing-loop.png"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1500, height: 1160 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(root, source)).href, { waitUntil: "load" });
    await page.locator(".canvas").screenshot({ path: path.join(outputDir, output) });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(target, { waitUntil: target.startsWith("http") ? "networkidle" : "load" });
  await page.addStyleTag({ content: "#toast{display:none!important}" });

  await screenshotElement(page, "#command .incident-focus", "02-active-warning.png");

  await page.locator("#runDataAuditBtn").click();
  await page.waitForTimeout(5400);
  await screenshotElement(page, "#dataset .dataset-console", "03-company-data-audit.png");
  await screenshotElement(page, "#dataset .funnel-zone", "03a-relationship-funnel.png");
  await screenshotElement(page, "#dataset .debt-zone", "03b-knowledge-debt-case.png");
  await screenshotElement(page, "#dataset #dataAuditTrace", "03c-data-audit-trace.png");

  await page.locator("#lifecycleRail .lifecycle-node").nth(10).click();
  await screenshotElement(page, "#lifecycle .lifecycle-console", "04-lifecycle-contract.png");
  await screenshotElement(page, "#lifecycle #lifecycleRail", "04a-lifecycle-rail.png");
  await screenshotElement(page, "#lifecycle #lifecycleDetail", "04b-lifecycle-detail.png");

  await screenshotElement(page, "#reasoning .knowledge-panel", "05-graphrag-evidence-path.png");
  await screenshotElement(page, "#reasoning .impact-panel", "06-vin-impact-chain.png");

  await page.locator("#interventionOptions button").first().click();
  await page.locator("#completeInterventionBtn").click();
  await screenshotElement(page, "#reasoning .causal-panel", "07-top3-causal-guardrails.png");
  await screenshotElement(page, "#reasoning .counterfactual-panel", "08-counterfactual-test.png");

  await page.locator("#dispatchBtn").click();
  await page.locator("#confirmBtn").click();
  await page.locator("#writebackBtn").click();
  await screenshotElement(page, "#reasoning .validation-panel", "09-deterministic-close-gate.png");

  await screenshotElement(page, "#collaboration .feishu-status", "10-feishu-execution-fabric.png");
  await screenshotElement(page, "#collaboration .capability-panel", "11-feishu-capability-matrix.png");
  await screenshotElement(page, "#value .readiness-panel", "12-production-readiness.png");
  await screenshotElement(page, "#value .assurance-grid", "13-failsafe-accountability.png");
  await screenshotElement(page, "#value .replication-panel", "14-replication-package.png");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto(target, { waitUntil: target.startsWith("http") ? "networkidle" : "load" });
  await mobile.addStyleTag({ content: "#toast{display:none!important}" });
  await mobile.screenshot({ path: path.join(outputDir, "15-mobile-workbench.png") });
  await mobile.close();

  await browser.close();
  console.log(JSON.stringify({ outputDir, assets: fs.readdirSync(outputDir).sort() }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
