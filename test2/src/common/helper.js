import { t } from 'testcafe'
import { selectors as s, mui } from './selectors'

// constant variables
const yquiUrl = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/'
const numWindows = 5
const windowWidth = 1440
const windowHeight = 900

// operations
export const createWindows = async (num = numWindows) => {
  await t
    .navigateTo(yquiUrl)
    .resizeWindow(windowWidth, windowHeight)
  t.ctx.w0 = await t.getCurrentWindow()
  t.ctx.windows = [t.ctx.w0]

  for (let i = 1; i < num; i++) {
    await t.switchToWindow(t.ctx.w0)
    const w = await t.openWindow(yquiUrl)
    await t.resizeWindow(windowWidth, windowHeight)
    t.ctx.windows.push(w)
    t.ctx[`w${i}`] = w
  }

  await t.switchToWindow(t.ctx.w0)
}

export const enterRoom = async (index, options = {}) => {
  const current = await t.getCurrentWindow()

  const name = options.name || `ゆーた${index}`

  await t.switchToWindow(t.ctx.windows[index])
    .click(s.rooms.row0.find('.enter-room-button button'))
    .typeText(s.dialog.enterRoom.name, name, { replace: true })

  const observerCheck = s.dialog.enterRoom.observer
  if (options.observer ^ await observerCheck.hasClass(mui.checkbox.checked)) {
    await t.click(observerCheck)
  }

  const chatAnswerCheck = s.dialog.enterRoom.chatAnswer
  if (options.chatAnswer ^ chatAnswerCheck.hasClass(mui.checkbox.checked)) {
    await t.click(chatAnswerCheck)
  }

  await t.click(s.dialog.enterRoom.submit)

  if (!options.switchWindow) {
    await t.switchToWindow(current)
  }
}

export const leaveRoom = async (index, options = {}) => {
  const current = await t.getCurrentWindow()

  await t.switchToWindow(t.ctx.windows[index])
    .click(s.topbar.leaveButton)
    .click(s.dialog.leaveRoom.submit)

  if (!options.switchWindow) {
    await t.switchToWindow(current)
  }
}