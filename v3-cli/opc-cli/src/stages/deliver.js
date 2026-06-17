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
    const typeMatch = response.match(/类型[：:]\s*(.+)/);
    const formatMatch = response.match(/形态[：:]\s*(.+)/);
    const recipientMatch = response.match(/接收方[：:]\s*(.+)/);
    const confirmedMatch = response.match(/确认[：:]\s*(.+)/);
    data = {
      type: typeMatch ? typeMatch[1].trim() : 'external',
      format: formatMatch ? formatMatch[1].trim() : 'document',
      recipient: recipientMatch ? recipientMatch[1].trim() : '未指定',
      confirmed: confirmedMatch ? confirmedMatch[1].includes('是') || confirmedMatch[1].includes('y') : false,
    };
  }

  return {
    type: data.type || 'external',
    format: data.format || 'document',
    recipient: data.recipient || '未指定',
    confirmed: data.confirmed || false,
    raw: response,
  };
}
