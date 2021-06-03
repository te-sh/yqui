export const isContinueingMultiChance = buttons => {
  const pushers = buttons.pushers.length
  const answerers = buttons.answerers.length
  return answerers > 0 && pushers === answerers
}

export const pushOrder = (buttons, player) => {
  const order = buttons.pushers.indexOf(player)
  const delay = order >= 0 ? buttons.pushTimes[order] - buttons.pushTimes[0] : -1
  const myTurn = order === buttons.answerers.length
  return [order, delay, myTurn]
}
