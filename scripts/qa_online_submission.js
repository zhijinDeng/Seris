const fs = require("fs");
const path = require("path");

const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "output", "playwright", "online-submission");
const target = process.env.SERIS_ONLINE_URL
  || "https://larkcommunity.feishu.cn/wiki/T737wm3gyiw2xGkc2YIcPf6SnLN";
const executablePath = process.env.PLAYWRIGHT_CHROME;

const sections = [
  { label: /^2\.1 已实现功能全清单$/, file: "01-feature-inventory.png", minImages: 0, scroll: 0 },
  { label: /^3\.2 主动感知、事件准入与企业知识债审计$/, file: "02-active-audit.png", minImages: 1, scroll: 650 },
  { label: /^3\.4 AI推理链、影响圈定与确定性关闭$/, file: "03-reasoning-and-close.png", minImages: 1, scroll: 650 },
  { label: /^3\.7 企业落地运行模型、生产就绪与跨工序复制$/, file: "04-enterprise-landing.png", minImages: 1, scroll: 600 },
  { label: /^4\.3 年度价值测算模型$/, file: "05-value-model.png", minImages: 0, scroll: 0 },
  { label: /^5\. 方案体验入口/, file: "06-experience-entry.png", minImages: 0, scroll: 0 },
];

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function visibleImageMetrics(page) {
  return page.evaluate(() => Array.from(document.images)
    .filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    })
    .map((image) => ({
      alt: image.alt,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    })));
}

async function gotoWithRetry(page, url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      return;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await page.waitForTimeout(attempt * 3000);
    }
  }
  throw lastError;
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  const ignoredPageErrors = [];

  page.on("pageerror", (error) => {
    if (error.message === "PermFail") ignoredPageErrors.push(error.message);
    else errors.push(`pageerror: ${error.message}`);
  });
  await gotoWithRetry(page, target);
  await page.waitForTimeout(7000);

  const body = await page.locator("body").innerText();
  expect(body.includes("知质·灵巡"), "在线终稿标题未加载");
  expect(body.includes("参赛方案信息卡"), "赛事模板必填章节未加载");

  const report = [];
  for (const section of sections) {
    const outlineItem = page.getByText(section.label).first();
    expect(await outlineItem.count() === 1, `未找到章节：${section.label}`);
    await outlineItem.click();
    await page.waitForTimeout(4000);
    if (section.scroll) await page.evaluate((distance) => window.scrollBy(0, distance), section.scroll);
    await page.waitForTimeout(6000);

    const images = await visibleImageMetrics(page);
    const loadedImages = images.filter((image) => image.complete && image.naturalWidth > 0);
    expect(
      loadedImages.length >= section.minImages,
      `${section.file} 可见清晰图片不足：${loadedImages.length}/${section.minImages}`,
    );
    await page.screenshot({ path: path.join(outputDir, section.file) });
    report.push({ section: section.label.source, loadedImages });
  }

  expect(errors.length === 0, errors.join("\n"));
  await browser.close();
  console.log(JSON.stringify({ target, outputDir, ignoredPageErrors, sections: report }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
