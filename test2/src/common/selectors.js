import { Selector } from 'testcafe'

// selectors
export const selectors = {
  rooms: {
    row0: Selector('.rooms-table tbody tr').nth(0)
  },
  box: {
    teams: Selector('.room .team'),
    team0: Selector('.room .team').nth(0),
    team1: Selector('.room .team').nth(1),
    players0: Selector('.room .team').nth(0).find('.players .player'),
    players1: Selector('.room .team').nth(1).find('.players .player')
  },
  topbar: {
    appName: Selector('header .app-name'),
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
