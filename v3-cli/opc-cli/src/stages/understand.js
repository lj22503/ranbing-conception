export function parse(response, context) {
  let data = {};
  try {
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      data = JSON.parse(jsonMatch[1]);
    } else {
      data = JSON.parse(response);
    }
  } catch {
    const typeMatch = response.match(/type[：:]\s*(.+)/i);
    const summaryMatch = response.match(/summary[：:]\s*(.+)/i);
    const conflictMatch = response.match(/conflict[：:]\s*(.+)/i);
    const migrationMatch = response.match(/migration[：:]\s*(.+)/i);
    data = {
      type: typeMatch ? typeMatch[1].trim() : 'concept',
      summary: summaryMatch ? summaryMatch[1].trim() : response.slice(0, 200),
      conflict: conflictMatch ? conflictMatch[1].trim() : '识别到的冲突点',
      migration: migrationMatch ? migrationMatch[1].trim() : '可迁移的场景',
    };
  }

  return {
    type: data.type || 'concept',
    summary: data.summary || '理解完成',
    conflict: data.conflict || '识别到的冲突点',
    migration: data.migration || '可迁移的场景',
  };
}
