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
    const frameworkMatch = response.match(/框架[：:]\s*(.+)/);
    const conclusionMatch = response.match(/结论[：:]\s*(.+)/);
    const planMatch = response.match(/行动方案[：:]\s*(.+)/);
    data = {
      framework: frameworkMatch ? frameworkMatch[1].trim() : '未识别',
      conclusion: conclusionMatch ? conclusionMatch[1].trim() : response.slice(0, 200),
      actionPlan: planMatch ? planMatch[1].trim() : '详见分析结果',
    };
  }

  return {
    framework: data.framework || '未指定',
    conclusion: data.conclusion || '分析完成',
    actionPlan: data.actionPlan || data.plan || '待行动',
    raw: response,
  };
}
