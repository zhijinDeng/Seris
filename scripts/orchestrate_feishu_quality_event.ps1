param(
  [switch]$WriteBase,
  [switch]$CreateTask,
  [switch]$CreateReviewDoc,
  [switch]$SendMessage,
  [switch]$ConfirmMessage,
  [string]$RecipientUserId = "",
  [ValidateSet("user", "bot")][string]$MessageIdentity = "bot",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$nodeRoot = Join-Path $env:USERPROFILE "Tools\nodejs\node-v24.18.1-win-x64"
$node = Join-Path $nodeRoot "node.exe"
$cli = Join-Path $nodeRoot "node_modules\@larksuite\cli\scripts\run.js"
$runner = Join-Path $PSScriptRoot "lark_cli_runner.js"
$eventPath = Join-Path $root "data\feishu_orchestration_event.json"
$docTemplatePath = Join-Path $root "data\feishu_review_doc_template.xml"
$statusPath = Join-Path $root "data\feishu_orchestration.status.json"

if (!(Test-Path $node) -or !(Test-Path $cli)) {
  throw "lark-cli runtime not found. Complete the Feishu-Codex bootstrap first."
}

function Save-Json {
  param([string]$Path, [object]$Value)
  $json = $Value | ConvertTo-Json -Depth 30
  [System.IO.File]::WriteAllText($Path, $json, [System.Text.UTF8Encoding]::new($false))
}

function Invoke-LarkCli {
  param([string[]]$CliArgs)
  $runtime = Join-Path $root "config\.runtime"
  New-Item -ItemType Directory -Path $runtime -Force | Out-Null
  $argsPath = Join-Path $runtime ("lark_args_" + [Guid]::NewGuid().ToString("N") + ".json")
  Save-Json $argsPath ([ordered]@{ node = $node; cli = $cli; args = $CliArgs; cwd = $root })
  $previousErrorAction = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $output = & $node $runner $argsPath 2>&1
    $exitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousErrorAction
  }
  Remove-Item -LiteralPath $argsPath -Force -ErrorAction SilentlyContinue
  $text = $output -join [Environment]::NewLine
  if ($exitCode -ne 0) { throw $text }
  return $text | ConvertFrom-Json
}

function Escape-Xml {
  param([string]$Value)
  return [System.Security.SecurityElement]::Escape($Value)
}

$event = Get-Content -LiteralPath $eventPath -Raw -Encoding UTF8 | ConvertFrom-Json
$auth = Invoke-LarkCli -CliArgs @("auth", "status", "--json", "--verify")
if (!$auth.identities.user -or $auth.identities.user.status -ne "ready") {
  throw "Feishu user authorization is not valid. Run lark-cli auth login before orchestration."
}
$currentUserId = $auth.identities.user.openId
$result = [ordered]@{
  ok = $true
  event_id = $event.event_id
  identity = $auth.identity
  current_user_id = $currentUserId
  base = $null
  task = $null
  document = $null
  message = $null
  dry_run = [bool]$DryRun
  updated_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

if ($WriteBase) {
  if ($DryRun) {
    $result.base = [ordered]@{ status = "planned"; command = "sync_feishu_quality_event.ps1 -WriteRecord" }
  } else {
    $baseJson = & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "sync_feishu_quality_event.ps1") -WriteRecord
    if ($LASTEXITCODE -ne 0) { throw ($baseJson -join [Environment]::NewLine) }
    $result.base = ($baseJson -join [Environment]::NewLine) | ConvertFrom-Json
  }
}

if ($CreateTask) {
  $taskArgs = @(
    "task", "+create",
    "--summary", [string]$event.task.summary,
    "--description", [string]$event.task.description,
    "--due", "+1d",
    "--assignee", $currentUserId,
    "--idempotency-key", ($event.event_id + "-quality-owner"),
    "--as", "user", "--json"
  )
  if ($DryRun) { $taskArgs += "--dry-run" }
  $result.task = Invoke-LarkCli -CliArgs $taskArgs
}

$taskGuid = $null
if ($result.task -and $result.task.data) {
  $taskGuid = $result.task.data.task.guid
  if (!$taskGuid) { $taskGuid = $result.task.data.guid }
}

if ($CreateReviewDoc) {
  $evidenceItems = ($event.evidence | ForEach-Object { "<li>" + (Escape-Xml ([string]$_)) + "</li>" }) -join ""
  $taskBlock = if ($taskGuid) { "<h2>Feishu Task</h2><task task-id=`"$taskGuid`"></task>" } else { "<h2>Feishu Task</h2><p>Task linkage is created after owner and SLA confirmation.</p>" }
  $xml = [System.IO.File]::ReadAllText($docTemplatePath, [System.Text.Encoding]::UTF8)
  $xml = $xml.Replace("{{DOCUMENT_TITLE}}", (Escape-Xml ([string]$event.document_title)))
  $xml = $xml.Replace("{{EVENT_ID}}", (Escape-Xml ([string]$event.event_id)))
  $xml = $xml.Replace("{{RISK}}", (Escape-Xml ([string]$event.risk)))
  $xml = $xml.Replace("{{SCENE}}", (Escape-Xml ([string]$event.scene)))
  $xml = $xml.Replace("{{SIGNAL}}", (Escape-Xml ([string]$event.signal)))
  $xml = $xml.Replace("{{SCOPE}}", (Escape-Xml ([string]$event.scope)))
  $xml = $xml.Replace("{{EVIDENCE_ITEMS}}", $evidenceItems)
  $xml = $xml.Replace("{{HYPOTHESIS}}", (Escape-Xml ([string]$event.hypothesis)))
  $xml = $xml.Replace("{{DECISION}}", (Escape-Xml ([string]$event.decision)))
  $xml = $xml.Replace("{{TASK_BLOCK}}", $taskBlock)
  $docArgs = @("docs", "+create", "--content", $xml, "--as", "user", "--json")
  if ($DryRun) { $docArgs += "--dry-run" }
  $result.document = Invoke-LarkCli -CliArgs $docArgs
}

if ($SendMessage) {
  if (!$ConfirmMessage) {
    throw "Message sending requires -ConfirmMessage after recipient, content, and identity are confirmed."
  }
  if (!$RecipientUserId) {
    throw "RecipientUserId is required when SendMessage is enabled."
  }
  $messageArgs = @(
    "im", "+messages-send",
    "--user-id", $RecipientUserId,
    "--markdown", [string]$event.message,
    "--idempotency-key", ($event.event_id + "-notice"),
    "--as", $MessageIdentity,
    "--json"
  )
  if ($DryRun) { $messageArgs += "--dry-run" }
  $result.message = Invoke-LarkCli -CliArgs $messageArgs
}

Save-Json $statusPath $result
$result | ConvertTo-Json -Depth 30
