const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const playwright = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const target = process.env.SERIS_URL || "http://127.0.0.1:8878/app/index.html";
const executablePath = process.env.PLAYWRIGHT_CHROME;
const ffmpegPath = process.env.FFMPEG_PATH;
const outputDir = path.join(root, "output", "demo");
const frameDir = path.join(outputDir, "frames");
const videoPath = path.join(outputDir, "seris-quality-agent-demo.mp4");

let frameNumber = 0;

async function capture(page) {
  frameNumber += 1;
  await page.screenshot({
    path: path.join(frameDir, `frame-${String(frameNumber).padStart(4, "0")}.jpg`),
    type: "jpeg",
    quality: 72,
  });
}

async function hold(page, seconds) {
  for (let index = 0; index < seconds * 2; index += 1) {
    await capture(page);
    await page.waitForTimeout(500);
  }
}

async function setCaption(page, title, body) {
  await page.evaluate(({ title, body }) => {
    let caption = document.getElementById("demoTourCaption");
    if (!caption) {
      caption = document.createElement("div");
      caption.id = "demoTourCaption";
      caption.style.cssText = [
        "position:fixed",
        "left:24px",
        "bottom:20px",
        "z-index:99999",
        "width:min(720px,calc(100vw - 48px))",
        "padding:14px 18px",
        "background:rgba(17,24,39,.94)",
        "border-left:5px solid #0f8a7b",
        "box-shadow:0 12px 30px rgba(0,0,0,.24)",
        "color:#fff",
        "font-family:'Microsoft YaHei',sans-serif",
      ].join(";");
      document.body.appendChild(caption);
    }
    caption.innerHTML = `<div style="font-size:20px;font-weight:700;margin-bottom:5px">${title}</div><div style="font-size:14px;line-height:1.65;color:#dbe4ee">${body}</div>`;
  }, { title, body });
}

async function moveTo(page, selector, title, body) {
  await setCaption(page, title, body);
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await hold(page, 3);
}

async function main() {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const browser = await playwright.chromium.launch({ headless: true, executablePath });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(target, { waitUntil: "networkidle" });

  await setCaption(page, "知质·灵巡｜质量风险主动管控AI数字员工", "以主动感知、证据推理、受控执行、确定关闭和知识回写补齐超级工厂质量风险决策层。");
  await hold(page, 5);

  await moveTo(page, "#command", "01 主动发现｜缺陷显性化前建立风险线程", "EWMA、CUSUM、硬规则与知识关系共同判断，只有能够圈定影响对象时才升级为可行动事件。");
  await hold(page, 4);

  await moveTo(page, "#dataset", "02 企业数据审计｜主动寻找“闭而未解”知识债", "审计625类设备、9673台实例、1287条失效模式和406张工单的关系完整性，不把工单状态关闭等同于问题已解决。");
  await page.locator("#runDataAuditBtn").click();
  await hold(page, 7);
  await page.locator("#companyEvidenceBtn").click();
  await hold(page, 4);
  await page.locator("#drawerCloseBtn").click();

  await moveTo(page, "#lifecycle", "03 现场生命周期｜12步责任、证据与权限门", "从异常发现到有效性观察，每一步固定责任岗位、AI职责、必备证据与飞书对象，禁止跨越人工签署节点。");
  await page.locator("#lifecycleRail .lifecycle-node").nth(10).click();
  await hold(page, 4);

  await moveTo(page, "#reasoning", "04 GraphRAG｜Top-3根因、支持证据与冲突证据", "先由质量知识图谱限定检索子图，再组合工艺记录与历史案例；候选根因必须可追溯、可证伪。");
  await hold(page, 4);
  await page.locator("#interventionOptions button").first().click();
  await hold(page, 3);
  await page.locator("#completeInterventionBtn").click();
  await hold(page, 5);

  await moveTo(page, "#collaboration", "05 飞书协同｜同一事件ID贯穿台账、任务和复盘", "Base写入回读已经在线核验；任务与复盘文档提供对象样例；Aily、卡片、审批和事件订阅待企业应用部署。");
  await hold(page, 4);

  await moveTo(page, "#value", "06 确定性关闭与90天试点", "物理复检、授权确认、责任任务和知识草案缺一不可。现场处置关闭后，标准变更仍需审批和有效性观察。");
  await hold(page, 6);

  await setCaption(page, "体验入口", "公开源码：https://github.com/zhijinDeng/Seris　｜　下载后直接打开 app/index.html，无需安装依赖。");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(900);
  await hold(page, 5);
  await browser.close();

  if (!ffmpegPath) throw new Error("FFMPEG_PATH is required");
  const result = spawnSync(ffmpegPath, [
    "-y",
    "-framerate", "2",
    "-i", path.join(frameDir, "frame-%04d.jpg"),
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-pix_fmt", "yuv420p",
    "-r", "30",
    "-movflags", "+faststart",
    videoPath,
  ], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || "ffmpeg failed");

  console.log(JSON.stringify({ videoPath, frames: frameNumber, durationSeconds: frameNumber / 2 }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
