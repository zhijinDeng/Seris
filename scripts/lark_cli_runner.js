const fs = require("fs");
const { spawnSync } = require("child_process");

const argsFile = process.argv[2];
if (!argsFile) {
  console.error("Missing args file.");
  process.exit(2);
}

const payload = JSON.parse(fs.readFileSync(argsFile, "utf8"));
const node = payload.node;
const cli = payload.cli;
const args = payload.args || [];
const cwd = payload.cwd || process.cwd();

const result = spawnSync(node, [cli, ...args], {
  encoding: "utf8",
  cwd,
  env: {
    ...process.env,
    LARKSUITE_CLI_NO_UPDATE_NOTIFIER: "1",
    LARKSUITE_CLI_NO_SKILLS_NOTIFIER: "1",
  },
});

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exit(result.status ?? 1);
