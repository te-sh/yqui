import store from '../redux/store'

export const JOIN = 'join'
export const LEAVE = 'leave'
export const USER = 'user'
export const TAG = 'tag'
export const TEAMS = 'teams'
export const PUSH = 'push'
export const CORRECT = 'correct'
export const WRONG = 'wrong'
export const THROUGH = 'through'
export const ALL_CLEAR = 'all-clear'
export const RESET = 'reset'
export const UNDO = 'undo'
export const REDO = 'redo'
export const WIN_TOP = 'win-top'
export const LOSE_BOTTOM = 'lose-bottom'
export const BOARDS = 'boards'
export const BOARD = 'board'
export const BOARD_LOCK = 'board-lock'
export const TOGGLE_OBSERVER = 'toggle-observer'
export const TOGGLE_MASTER = 'toggle-master'
export const RULE = 'rule'
export const TOGGLE_TIMER = 'toggle-timer'
export const CHAT = 'chat'

export const sendWs = (cmd, arg) => {
  const { browser: { ws } } = store.getState()
  if (ws) {
    if (arg === undefined) {
      ws.send(JSON.stringify({ c: cmd }))
    } else {
      ws.send(JSON.stringify({ c: cmd, a: arg }))
    }
  }
}
