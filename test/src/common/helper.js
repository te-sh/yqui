import { t } from 'testcafe'
import { selectors as s, mui } from './selectors'

// constant variables
const yquiUrl = process.env.TEST_TARGET || 'http://proxy:8080/'
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

export const closeWindows = async () => {
  while (t.ctx.windows.length > 1) {
    try {
      const w = t.ctx.windows.pop()
      await t.closeWindow(w)
    } catch (e) {
      if (e.code !== 'E74') {
        throw e
      }
    }
  }
}

export const enterRoom = async (index, options = {}) => {
  const current = await t.getCurrentWindow()

  await t.switchToWindow(t.ctx.windows[index])
    .click(s.rooms.row0.find('.enter-room-button'))
    .wait(100)

  const name = options.name || `ゆーた${index}`
  await t.typeText(s.dialog.enterRoom.name, name, { replace: true })

  const observer = s.dialog.enterRoom.observer
  if (options.observer ^ await observer.find('span').hasClass(mui.checked)) {
    await t.click(observer)
  }

  const chatAnswer = s.dialog.enterRoom.chatAnswer
  if (options.chatAnswer ^ await chatAnswer.find('span').hasClass(mui.checked)) {
    await t.click(chatAnswer)
  }

  await t.click(s.dialog.enterRoom.submit)

  if (!options.switchWindow) {
    await t.switchToWindow(current)
  }
}

export const leaveRoom = async (index, options = {}) => {
  const current = await t.getCurrentWindow()

  await t.switchToWindow(t.ctx.windows[index])
    .click(s.topbar.leave)
    .click(s.dialog.confirm.ok)

  if (!options.switchWindow) {
    await t.switchToWindow(current)
  }
}

export const correct = async (playerIndex, masterIndex, options = {}) => {
  const current = await t.getCurrentWindow()

  const master = t.ctx.windows[masterIndex]
  const player = t.ctx.windows[playerIndex]
  const times = options.times || 1

  for (let i = 0; i < times; ++i) {
    await t
      .switchToWindow(player)
      .click(s.actions.player.answer)
      .switchToWindow(master)
      .click(s.actions.master.correct)
  }

  await t.switchToWindow(current)
}

export const wrong = async (playerIndex, masterIndex, options = {}) => {
  const current = await t.getCurrentWindow()

  const master = t.ctx.windows[masterIndex]
  const player = t.ctx.windows[playerIndex]
  const times = options.times || 1

  for (let i = 0; i < times; ++i) {
    await t
      .switchToWindow(player)
      .click(s.actions.player.answer)
      .switchToWindow(master)
      .click(s.actions.master.wrong)
  }

  await t.switchToWindow(current)
}
