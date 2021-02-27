import { Selector } from 'testcafe'

// constant variables
const yquiUrl = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/'
const numWindows = 5
const windowWidth = 1024
const windowHeight = 768

// selectors
export const selectors = {
  rooms: Selector('.rooms-table tbody tr').nth(1),
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
      name: '.enter-room-dialog .name input',
      submit: '.enter-room-dialog .submit'
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

export const createWindows = async t => {
  t.ctx.windows = []
  for (let i = 0; i < numWindows; i++) {
    const w = await (i == 0 ? t.getCurrentWindow() : t.openWindow(yquiUrl))
    await t.resizeWindow(windowWindth, windowHeight)
    t.ctx.windows.push(w)
    t.ctx[`w${i}`] = w
  }
  await t.switchToWindow(t.ctx.w0)
    .navigateTo(yquiUrl)
}

export const enterRoom = async (t, index, options = {}) => {
  const name = options.name || `ゆーた${index}`

  await t.switchToWindow(t.ctx.windows[index])
    .click(s.rooms.nth(0).find('.enter-room-button button'))
    .typeText(s.dialog.enterRoom.name, name, { replace: true })
    .click(s.dialog.enterRoom.submit)
}
