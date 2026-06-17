// src/stages/understand.js

export function parse(response, context) {
  let data = {};
  try {
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      data = JSON.parse(jsonMatch[1]);
    } else {
      // 尝试从响应开头找到 JSON 对象
      const firstBrace = response.indexOf('{');
      if (firstBrace !== -1) {
        data = JSON.parse(response.slice(firstBrace));
      }
    }
  } catch {
    // 回退：用正则提取
    const summaryMatch = response.match(/"summary"\s*:\s*"([^"]*)"/);
    const conflictMatch = response.match(/"conflict"\s*:\s*"([^"]*)"/);
    const migrationMatch = response.match(/"migration"\s*:\s*"([^"]*)"/);
    const typeMatch = response.match(/"type"\s*:\s*"([^"]*)"/);
    data = {
      type: typeMatch ? typeMatch[1] : 'concept',
      summary: summaryMatch ? summaryMatch[1] : response.slice(0, 200),
      conflict: conflictMatch ? conflictMatch[1] : '',
      migration: migrationMatch ? migrationMatch[1] : '',
    };
  }

  return {
    type: data.type || 'concept',
    summary: data.summary || response.split('\n')[0],
    conflict: data.conflict || '',
    migration: data.migration || '',
    raw: response,
  };
}
