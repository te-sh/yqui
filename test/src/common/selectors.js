import { Selector } from 'testcafe'

// selectors
export const selectors = {
  rooms: {
    row0: Selector('.rooms-table tbody tr').nth(0)
  },
  topbar: {
    appName: Selector('header .app-name'),
    assign: Selector('header .begin-assign-button'),
    rule: Selector('header .open-rule-button'),
    master: Selector('header .toggle-master-button'),
    observer: Selector('header .toggle-observer-button'),
    leave: Selector('header .leave-room-button')
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
    team2: Selector('.room .team').nth(2),
    players0: Selector('.room .team').nth(0).find('.players .player'),
    players1: Selector('.room .team').nth(1).find('.players .player'),
    players2: Selector('.room .team').nth(2).find('.players .player')
  },
  actions: {
    visible: {
      player: Selector('.room .actions .player-actions').filterVisible(),
      master: Selector('.room .actions .master-actions').filterVisible(),
      observer: Selector('.room .actions .observer-actions').filterVisible(),
      assign: Selector('.room .actions .assign-actions').filterVisible()
    },
    player: {
      answer: Selector('.room .actions .player-actions .answer-button')
    },
    master: {
      correct: Selector('.room .actions .master-actions .correct-button'),
      wrong: Selector('.room .actions .master-actions .wrong-button')
    },
    assign: {
      endAssign: Selector('.room .actions .assign-actions .end-assign-button'),
      cancelAssign: Selector('.room .actions .assign-actions .cancel-assign-button')
    }
  },
  subactions: {
    visible: {
      player: Selector('.room .subactions .player-subactions').filterVisible(),
      master: Selector('.room .subactions .master-subactions').filterVisible(),
      assign: Selector('.room .subactions .assign-subactions').filterVisible()
    },
    master: {
      allClear: Selector('.room .subactions .master-subactions .all-clear-button')
    },
    assign: {
      numTeams: Selector('.room .subactions .assign-subactions .num-teams'),
      changeNumTeams: Selector('.room .subactions .assign-subactions .change-num-teams-button')
    }
  },
  dialog: {
    enterRoom: {
      name: Selector('.enter-room-dialog .enter-room .name input'),
      observer: Selector('.enter-room-dialog .enter-room .observer-check'),
      chatAnswer: Selector('.enter-room-dialog .enter-room .chat-answer-check'),
      submit: Selector('.enter-room-dialog .submit')
    },
    rule: {
      tab: {
        normal: Selector('.rule-dialog .normal-rule-tab'),
        team: Selector('.rule-dialog .team-rule-tab'),
        board: Selector('.rule-dialog .board-rule-tab'),
        other: Selector('.rule-dialog .other-rule-tab')
      },
      normal: {
        winPoint: {
          active: Selector('.rule-dialog .normal-rule .win-point-active'),
          value: Selector('.rule-dialog .normal-rule .win-point-value')
        },
        losePoint: {
          active: Selector('.rule-dialog .normal-rule .lose-point-active'),
          value: Selector('.rule-dialog .normal-rule .lose-point-value')
        },
        loseBatsu: {
          active: Selector('.rule-dialog .normal-rule .lose-batsu-active'),
          value: Selector('.rule-dialog .normal-rule .lose-batsu-value')
        }
      },
      team: {
        active: Selector('.rule-dialog .team-rule .active-check')
      },
      other: {
        passSeat: Selector('.rule-dialog .other-rule .pass-seat-check')
      },
      submit: Selector('.rule-dialog .submit')
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
