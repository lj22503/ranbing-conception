// src/utils/config.js

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import os from 'os';

const cwd = process.cwd();
const envPaths = [
  path.join(cwd, '.env'),
  path.join(cwd, '.env.local'),
  path.join(os.homedir(), '.opc', '.env'),
];
const loaded = envPaths.find((p) => fs.existsSync(p));
if (loaded) dotenv.config({ path: loaded });

export function getConfig() {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPC_MODEL || 'claude-3-5-sonnet-20241022';

  let hasKey = false;
  if (model.startsWith('claude') && anthropicKey) hasKey = true;
  if (model.startsWith('gpt') && openaiKey) hasKey = true;
  if (model.startsWith('o1') && openaiKey) hasKey = true;

  return { anthropicKey, openaiKey, model, hasKey };
}

export function validateConfig() {
  const config = getConfig();
  if (!config.hasKey) {
    console.error('\u274c 未检测到有效的 API Key。请设置：');
    console.error('  ANTHROPIC_API_KEY=***  (for Claude)');
    console.error('  OPENAI_API_KEY=***     (for GPT)');
    console.error('\n或在 .env 文件中配置。');
    return false;
  }
  return true;
}
