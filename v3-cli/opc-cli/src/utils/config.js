import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import os from 'os';

function loadEnv() {
  const cwd = process.cwd();
  const envPaths = [
    path.join(cwd, '.env'),
    path.join(os.homedir(), '.opc', '.env'),
  ];
  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      dotenv.config({ path: p });
      return;
    }
  }
  dotenv.config();
}

loadEnv();

export function getConfig() {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPC_MODEL || 'claude-3-5-sonnet-20241022';

  let hasKey = false;
  if (model.startsWith('claude') && anthropicKey) hasKey = true;
  if (model.startsWith('gpt') && openaiKey) hasKey = true;
  if (model.startsWith('o1') && openaiKey) hasKey = true;

  return {
    anthropicKey,
    openaiKey,
    model,
    hasKey,
    outputDir: process.env.OPC_OUTPUT_DIR || './output',
  };
}

export function validateConfig() {
  const config = getConfig();
  if (!config.hasKey) {
    console.error('❌ 未检测到有效的 API Key。请设置：');
    console.error('  ANTHROPIC_API_KEY=xxx  (for Claude)');
    console.error('  OPENAI_API_KEY=xxx     (for GPT)');
    console.error('或在 .env 文件中配置');
    return false;
  }
  return true;
}
