const messages = {
  pushButton: JSON.stringify({ c: 'a' }),
  correct: JSON.stringify({ c: 's' }),
  wrong: JSON.stringify({ c: 'f' }),
  through: JSON.stringify({ c: 'n' }),
  reset: JSON.stringify({ c: 'r' }),
  allClear: JSON.stringify({ c: 'e' }),
  undo: JSON.stringify({ c: 'u' }),
  redo: JSON.stringify({ c: 'o' }),
  toggleMaster: JSON.stringify({ c: 'm' })
}

export const send = {
  pushButton: ws => {
    if (ws) {
      ws.send(messages.pushButton)
    }
  },
  correct: ws => {
    if (ws) {
      ws.send(messages.correct)
    }
  },
  wrong: ws => {
    if (ws) {
      ws.send(messages.wrong)
    }
  },
  through: ws => {
    if (ws) {
      ws.send(messages.through)
    }
  },
  reset: ws => {
    if (ws) {
      ws.send(messages.reset)
    }
  },
  allClear: ws => {
    if (ws) {
      ws.send(messages.allClear)
    }
  },
  undo: ws => {
    if (ws) {
      ws.send(messages.undo)
    }
  },
  redo: ws => {
    if (ws) {
      ws.send(messages.redo)
    }
  },
  toggleMaster: ws => {
    if (ws) {
      ws.send(messages.toggleMaster)
    }
  },
  user: (ws, user) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'z', a: user }))
    }
  },
  teams: (ws, teams) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'p', a: teams }))
    }
  },
  rule: (ws, rule) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'l', a: rule }))
    }
  },
  chat: (ws, text) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'c', a: text }))
    }
  }
}
