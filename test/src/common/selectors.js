import { Selector } from 'testcafe'

// selectors
export const selectors = {
  rooms: {
    row0: Selector('.rooms-table tbody tr').nth(0)
  },
  topbar: {
    appName: Selector('header .app-name'),
    roomName: Selector('header .room-name'),
    tag: Selector('header .open-tag-button'),
    assign: Selector('header .begin-assign-button'),
    rule: Selector('header .open-rule-button'),
    master: Selector('header .toggle-master-button'),
    observer: Selector('header .toggle-observer-button'),
    leave: Selector('header .leave-room-button')
  },
  roomInfo: {
    masterName: Selector('.room .room-info .master-name'),
    numPlayers: Selector('.room .room-info .num-players'),
    numObservers: Selector('.room .room-info .num-observers')
  },
  ruleDisplay: {
    normal: {
      content: Selector('.room .rule-display .normal-rule .content'),
      correctWrong: Selector('.room .rule-display .normal-rule .content .correct-wrong'),
      winLose: Selector('.room .rule-display .normal-rule .content .win-lose')
    },
    team: {
      content: Selector('.room .rule-display .team-rule .content')
    },
    board: {
      content: Selector('.room .rule-display .board-rule .content')
    }
  },
  chat: {
    messages: Selector('.room .messages .message'),
    lastMessage: Selector('.room .messages .message:last-child .message-body'),
    chatText: Selector('.room .chat .chat-text'),
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
    alert: {
      message: Selector('.alert-dialog .message')
    },
    enterRoom: {
      name: Selector('.enter-room-dialog .enter-room .name'),
      password: Selector('.enter-room-dialog .enter-room .password'),
      observer: Selector('.enter-room-dialog .enter-room .observer'),
      chatAnswer: Selector('.enter-room-dialog .enter-room .chat-answer'),
      submit: Selector('.enter-room-dialog .submit')
    },
    tag: {
      title: Selector('.tag-dialog .title'),
      password: Selector('.tag-dialog .password'),
      submit: Selector('.tag-dialog .submit')
    },
    rule: {
      tab: {
        normal: Selector('.rule-dialog .normal-rule-tab'),
        team: Selector('.rule-dialog .team-rule-tab'),
        board: Selector('.rule-dialog .board-rule-tab'),
        other: Selector('.rule-dialog .other-rule-tab')
      },
      normal: {
        pointCorrect: Selector('.rule-dialog .normal-rule .point-correct'),
        pointWrong: Selector('.rule-dialog .normal-rule .point-wrong'),
        batsuWrong: Selector('.rule-dialog .normal-rule .batsu-wrong'),
        lockWrong: Selector('.rule-dialog .normal-rule .lock-wrong'),
        winPoint: {
          active: Selector('.rule-dialog .normal-rule .win-point-active'),
          value: Selector('.rule-dialog .normal-rule .win-point-value'),
          above: Selector('.rule-dialog .normal-rule .win-point-above')
        },
        losePoint: {
          active: Selector('.rule-dialog .normal-rule .lose-point-active'),
          value: Selector('.rule-dialog .normal-rule .lose-point-value'),
          above: Selector('.rule-dialog .normal-rule .lose-point-above')
        },
        loseBatsu: {
          active: Selector('.rule-dialog .normal-rule .lose-batsu-active'),
          value: Selector('.rule-dialog .normal-rule .lose-batsu-value'),
          above: Selector('.rule-dialog .normal-rule .lose-batsu-above')
        },
        winPlayers: Selector('.rule-dialog .normal-rule .win-players')
      },
      initValue: {
        open: Selector('.rule-dialog .normal-rule .init-value-button'),
        point: Selector('.special-rule.init-value .point'),
        batsu: Selector('.special-rule.init-value .batsu')
      },
      specialCorrect: {
        open: Selector('.rule-dialog .normal-rule .special-correct-button'),
        consBonus: Selector('.special-rule.special-correct .cons-bonus'),
        passQuiz: Selector('.special-rule.special-correct .pass-quiz'),
        survival: {
          active: Selector('.special-rule.special-correct .survival-active'),
          value: Selector('.special-rule.special-correct .survival-value')
        }
      },
      specialWrong: {
        open: Selector('.rule-dialog .normal-rule .special-wrong-button'),
        updown: Selector('.special-rule.special-wrong .updown'),
        swedish: Selector('.special-rule.special-wrong .swedish'),
        backstream: Selector('.special-rule.special-wrong .backstream'),
        divide: Selector('.special-rule.special-wrong .divide'),
        belowLock: Selector('.special-rule.special-wrong .below-lock')
      },
      team: {
        active: Selector('.rule-dialog .team-rule .active')
      },
      submit: Selector('.rule-dialog .submit')
    },
    confirm: {
      ok: Selector('.confirm-dialog .ok')
    }
  }
}

// material-ui classes
export const mui = {
  disabled: 'Mui-disabled',
  checked: 'Mui-checked',
  button: {
    outlined: 'MuiButton-outlined',
    contained: 'MuiButton-contained'
  },
  iconButton: {
    inherit: 'MuiIconButton-colorInherit',
    secondary: 'MuiIconButton-colorSecondary'
  }
}
