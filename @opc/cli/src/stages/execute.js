// src/stages/execute.js

export function parse(response, context) {
  let data = {};
  try {
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      data = JSON.parse(jsonMatch[1]);
    } else {
      const firstBrace = response.indexOf('{');
      if (firstBrace !== -1) {
        data = JSON.parse(response.slice(firstBrace));
      }
    }
  } catch {
    const methodMatch = response.match(/方法[：:]\s*(.+)/);
    const outputMatch = response.match(/产出[：:]\s*(.+)/);
    const pathMatch = response.match(/路径[：:]\s*(.+)/);
    data = {
      method: methodMatch ? methodMatch[1].trim() : 'plan-driven',
      output: outputMatch ? outputMatch[1].trim() : response.slice(0, 200),
      outputPath: pathMatch ? pathMatch[1].trim() : null,
    };
  }

  return {
    method: data.method || 'plan-driven',
    output: data.output || '执行完成',
    outputPath: data.outputPath || data.path || null,
    raw: response,
  };
}
