const messages = {
  boardLock: JSON.stringify({ c: 'k' })
}

export const send = {
  user: (ws, user) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'z', a: user }))
    }
  },
  teams: (ws, teams) => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'p', a: teams }))
    }
  }
}

export const SEND_JOIN = 'join'
export const SEND_LEAVE = 'leave'
export const SEND_PUSH = 'push'
export const SEND_CORRECT = 'correct'
export const SEND_WRONG = 'wrong'
export const SEND_THROUGH = 'through'
export const SEND_ALL_CLEAR = 'all-clear'
export const SEND_RESET = 'reset'
export const SEND_UNDO = 'undo'
export const SEND_REDO = 'redo'
export const SEND_BOARDS = 'boards'
export const SEND_BOARD = 'board'
export const SEND_BOARD_LOCK = 'board-lock'
export const SEND_TOGGLE_MASTER = 'toggle-master'
export const SEND_RULE = 'rule'
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
