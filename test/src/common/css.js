module.exports = {
  mui: {
    iconBtn: {
      inherit: '.MuiIconButton-colorInherit',
      secondary: '.MuiIconButton-colorSecondary'
    },
    checkbox: {
      checked: '.Mui-checked'
    }
  },
  selector: {
    topbar: {
      assignBtn: 'header .begin-assign-button',
      ruleBtn: 'header .open-rule-button',
      masterBtn: 'header .toggle-master-button',
      observerBtn: 'header .toggle-observer-button',
      leaveBtn: 'header .leave-room-button'
    },
    actions: {
      player: '.room .actions .player-actions:not(.hidden)',
      master: '.room .actions .master-actions:not(.hidden)',
      observer: '.room .actions .observer-actions:not(.hidden)',
      assign: '.room .actions .assign-actions:not(.hidden)'
    },
    subactions: {
      player: '.room .subactions .player-subactions:not(.hidden)',
      master: '.room .subactions .master-subactions:not(.hidden)',
      assign: '.room .subactions .assign-subactions:not(.hidden)'
    },
    chat: {
      lastMessage: '.room .messages .message:last-child .message-body'
    }
  }
}
