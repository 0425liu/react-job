export function getRedirecPath({ type, avatar }) {
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(userId, targeId) {
  return [userId, targeId].sort().join('_')
}