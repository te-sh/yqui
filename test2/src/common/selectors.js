import { Selector } from 'testcafe'

// selectors
export const selectors = {
  rooms: {
    row0: Selector('.rooms-table tbody tr').nth(0)
  },
  topbar: {
    appName: Selector('header .app-name'),
    assignButton: Selector('header .begin-assign-button'),
    ruleButton: Selector('header .open-rule-button'),
    masterButton: Selector('header .toggle-master-button'),
    observerButton: Selector('header .toggle-observer-button'),
    leaveButton: Selector('header .leave-room-button')
  },
  masterDisplay: {
    name: Selector('.room .master-display .master-name')
  },
  chat: {
    messages: Selector('.room .messages .message'),
    lastMessage: Selector('.room .messages .message:last-child .message-body'),
    chatText: Selector('.room .chat .chat-text input'),
    sendChatButton: Selector('.room .chat .send-chat-button')
  },
  box: {
    teams: Selector('.room .team'),
    team0: Selector('.room .team').nth(0),
    team1: Selector('.room .team').nth(1),
    players0: Selector('.room .team').nth(0).find('.players .player'),
    players1: Selector('.room .team').nth(1).find('.players .player')
  },
  actions: {
    player: Selector('.room .actions .player-actions'),
    master: Selector('.room .actions .master-actions'),
    observer: Selector('.room .actions .observer-actions'),
    assign: Selector('.room .actions .assign-actions'),
    answerButton: Selector('.room .actions .player-actions .answer-button'),
    correctButton: Selector('.room .actions .master-actions .correct-button'),
    wrongButton: Selector('.room .actions .master-actions .wrong-button'),
    endAssignButton: Selector('.room .actions .assign-actions .end-assign-button'),
    cancelAssignButton: Selector('.room .actions .assign-actions .cancel-assign-button')
  },
  subactions: {
    player: Selector('.room .subactions .player-subactions'),
    master: Selector('.room .subactions .master-subactions'),
    assign: Selector('.room .subactions .assign-subactions'),
    allClearButton: Selector('.room .subactions .master-subactions .all-clear-button')
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
