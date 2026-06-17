import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export async function callLLM(prompt, model) {
  if (model.startsWith('claude')) {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
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
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
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
