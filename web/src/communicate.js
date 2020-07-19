const messages = {
  through: JSON.stringify({ c: 'n' }),
  reset: JSON.stringify({ c: 'r' }),
  allClear: JSON.stringify({ c: 'e' }),
  undo: JSON.stringify({ c: 'u' }),
  redo: JSON.stringify({ c: 'o' }),
  toggleMaster: JSON.stringify({ c: 'm' }),
  boardLock: JSON.stringify({ c: 'k' })
}

export const send = {
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
  boards: (ws, boards) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'b', a: boards }))
    }
  },
  board: (ws, board) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 't', a: board }))
    }
  },
  boardLock: (ws) => {
    if (ws) {
      ws.send(messages.boardLock)
    }
  },
  rule: (ws, rule) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'l', a: rule }))
    }
  }
}

export const SEND_JOIN = 'join'
export const SEND_LEAVE = 'leave'
export const SEND_PUSH = 'push'
export const SEND_CORRECT = 'correct'
export const SEND_WRONG = 'wrong'
export const SEND_CHAT = 'chat'

export const sendWs = (ws, cmd, arg) => {
  if (ws) {
    if (arg === undefined) {
      ws.send(JSON.stringify({ c: cmd }))
    } else {
      ws.send(JSON.stringify({ c: cmd, a: arg }))
    }
  }
}
