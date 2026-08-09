const path = require("path");
const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

async function main() {
  const root = path.resolve(__dirname, "..");
  const source = `file:///${path.join(root, "diagram", "quality-ai-architecture.svg").replace(/\\/g, "/")}`;
  const output = path.join(root, "diagram", "quality-ai-architecture.png");
  const browser = await playwright.chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROME });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await page.goto(source, { waitUntil: "load" });
  await page.screenshot({ path: output, omitBackground: false });
  await browser.close();
  console.log(output);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
