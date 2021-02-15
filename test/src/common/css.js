module.exports = {
  color: {
    iconBtn: {
      inherit: '.MuiIconButton-colorInherit',
      secondary: '.MuiIconButton-colorSecondary'
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
    chat: {
      lastMessage: '.room .messages .message:last-child .message-body'
    }
  }
}
