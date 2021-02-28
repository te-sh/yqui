import { Selector, t } from 'testcafe'

// constant variables
const yquiUrl = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/'
const numWindows = 5
const windowWidth = 1440
const windowHeight = 900

// selectors
export const selectors = {
  roomRow0: Selector('.rooms-table tbody tr').nth(0),
  teams: Selector('.room .team'),
  topbar: {
    assignButton: Selector('header .begin-assign-button'),
    ruleButton: Selector('header .open-rule-button'),
    masterButton: Selector('header .toggle-master-button'),
    observerButton: Selector('header .toggle-observer-button'),
    leaveButton: Selector('header .leave-room-button')
  },
  actions: {
    player: Selector('.room .actions .player-actions'),
    master: Selector('.room .actions .master-actions'),
    observer: Selector('.room .actions .observer-actions'),
    assign: Selector('.room .actions .assign-actions')
  },
  subactions: {
    player: Selector('.room .subactions .player-subactions'),
    master: Selector('.room .subactions .master-subactions'),
    assign: Selector('.room .subactions .assign-subactions')
  },
  chat: {
    lastMessage: Selector('.room .messages .message:last-child .message-body')
  },
  dialog: {
    enterRoom: {
      name: Selector('.enter-room-dialog .enter-room .name input'),
      observer: Selector('.enter-room-dialog .enter-room .observer-check'),
      chatAnswer: Selector('.enter-room-dialog .enter-room .chat-answer-check'),
      submit: Selector('.enter-room-dialog .submit')
    },
    leaveRoom: {
      submit: Selector('.leave-room-dialog .submit')
    }
  }
}

// material-ui classes
export const mui = {
  iconButton: {
    inherit: 'MuiIconButton-colorInherit',
    secondary: 'MuiIconButton-colorSecondary'
  },
  checkbox: {
    checked: 'Mui-checked'
  }
}

// operations
const s = selectors

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
    .click(s.roomRow0.find('.enter-room-button button'))
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