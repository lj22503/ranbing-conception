import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { getConfig } from '../utils/config.js';

export async function callLLM(prompt, model) {
  const config = getConfig();

  if (model.startsWith('claude')) {
    if (!config.anthropicKey) throw new Error('ANTHROPIC_API_KEY 未设置');
    const client = new Anthropic({ apiKey: config.anthropicKey });
    const response = await client.messages.create({
      model,
      system: prompt.system,
      messages: [{ role: 'user', content: prompt.user }],
      max_tokens: 4096,
      temperature: 0.3,
    });
    return response.content[0].text;
  }

  if (model.startsWith('gpt') || model.startsWith('o1')) {
    if (!config.openaiKey) throw new Error('OPENAI_API_KEY 未设置');
    const client = new OpenAI({ apiKey: config.openaiKey });
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user },
      ],
      max_tokens: model.startsWith('o1') ? 32000 : 4096,
    });
    return response.choices[0].message.content;
  }

  throw new Error(`不支持的模型: ${model}`);
}
