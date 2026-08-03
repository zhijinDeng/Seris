param(
  [string]$BaseUrl = "https://larkcommunity.feishu.cn/base/DYAabhZeiagT0ZsjGaTcWFPrn7b?table=tblahGgI2WkXrEAv&view=vewkBHSuIJ",
  [string]$TableId = "",
  [switch]$CreateTable,
  [switch]$WriteRecord
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$nodeRoot = Join-Path $env:USERPROFILE "Tools\nodejs\node-v24.18.1-win-x64"
$node = Join-Path $nodeRoot "node.exe"
$cli = Join-Path $nodeRoot "node_modules\@larksuite\cli\scripts\run.js"
$configDir = Join-Path $root "config"
$configPath = Join-Path $configDir "feishu_live_base.json"
$fieldsPath = Join-Path $root "data\feishu_quality_event_fields.json"
$recordPath = Join-Path $root "data\feishu_live_quality_event_record.json"
$tableNamePath = Join-Path $root "data\feishu_live_table_name.txt"
$statusPath = Join-Path $root "data\feishu_live_connection.status.json"
$lastUpsertPath = Join-Path $root "data\feishu_last_record_upsert_response.json"
$runner = Join-Path $PSScriptRoot "lark_cli_runner.js"

if (!(Test-Path $node) -or !(Test-Path $cli)) {
  throw "lark-cli runtime not found. Run feishu_codex_link_worktree\install\bootstrap_node_feishu.ps1 first."
}

New-Item -ItemType Directory -Path $configDir -Force | Out-Null
$env:LARKSUITE_CLI_NO_UPDATE_NOTIFIER = "1"
$env:LARKSUITE_CLI_NO_SKILLS_NOTIFIER = "1"

function Invoke-LarkCli {
  param([string[]]$CliArgs)
  $runtime = Join-Path $root "config\.runtime"
  New-Item -ItemType Directory -Path $runtime -Force | Out-Null
  $argsPath = Join-Path $runtime ("lark_args_" + [Guid]::NewGuid().ToString("N") + ".json")
  Save-Json $argsPath ([ordered]@{ node = $node; cli = $cli; args = $CliArgs })
  $out = & $node $runner $argsPath 2>&1
  $exitCode = $LASTEXITCODE
  Remove-Item -LiteralPath $argsPath -Force -ErrorAction SilentlyContinue
  $text = $out -join [Environment]::NewLine
  if ($exitCode -ne 0) {
    throw $text
  }
  return $text | ConvertFrom-Json
}

function Save-Json {
  param([string]$Path, [object]$Value)
  $json = $Value | ConvertTo-Json -Depth 20
  [System.IO.File]::WriteAllText($Path, $json, [System.Text.UTF8Encoding]::new($false))
}

$resolved = Invoke-LarkCli -CliArgs @("base", "+url-resolve", "--url", $BaseUrl, "--as", "user", "--json")
$baseToken = $resolved.data.base_token
$tableName = [System.IO.File]::ReadAllText($tableNamePath, [System.Text.Encoding]::UTF8).Trim()

$config = [ordered]@{
  base_url = $BaseUrl
  base_token = $baseToken
  quality_event_table_id = $TableId
  quality_event_table_name = $tableName
  last_record_id = ""
  last_synced_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
}

if ((Test-Path $configPath) -and !$TableId) {
  $old = Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($old.quality_event_table_id) {
    $config.quality_event_table_id = $old.quality_event_table_id
  }
}

if ($CreateTable -or !$config.quality_event_table_id) {
  $fields = [System.IO.File]::ReadAllText($fieldsPath, [System.Text.Encoding]::UTF8)
  $created = Invoke-LarkCli -CliArgs @(
    "base", "+table-create",
    "--base-token", $baseToken,
    "--name", $config.quality_event_table_name,
    "--fields", $fields,
    "--as", "user",
    "--json"
  )
  $config.quality_event_table_id = $created.data.table.table_id
  if (!$config.quality_event_table_id) {
    $config.quality_event_table_id = $created.data.table.id
  }
}

$recordId = ""
if ($WriteRecord) {
  $recordJson = [System.IO.File]::ReadAllText($recordPath, [System.Text.Encoding]::UTF8)
  $record = Invoke-LarkCli -CliArgs @(
    "base", "+record-upsert",
    "--base-token", $baseToken,
    "--table-id", $config.quality_event_table_id,
    "--json", $recordJson,
    "--as", "user"
  )
  Save-Json $lastUpsertPath $record
  $recordId = $record.data.record.record_id
  if (!$recordId) {
    $recordId = $record.data.record.id
  }
  if (!$recordId -and $record.data.record.record_id_list) {
    $recordId = $record.data.record.record_id_list[0]
  }
  if (!$recordId) {
    $recordId = $record.data.record_id
  }
  if (!$recordId -and $record.data.record_id_list) {
    $recordId = $record.data.record_id_list[0]
  }
  $config.last_record_id = $recordId
}

Save-Json $configPath $config
Save-Json $statusPath ([ordered]@{
  ok = $true
  identity = "user"
  base_token = $baseToken
  table_id = $config.quality_event_table_id
  table_name = $config.quality_event_table_name
  record_id = $recordId
  updated_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
  note = "Local lark-cli auth is valid; quality event table and optional sample record are synced."
})

$config | ConvertTo-Json -Depth 20
