import { toIntMap } from './util'

export const initBg = {
  boards: new Map(),
  lock: false
}

export const initBoard = {
  id: -1,
  text: '',
  correct: 'none',
  open: false
}

export const mergeBgWithJson = ({ bg, editBoards }, json) => {
  if (json === undefined) {
    return bg
  }

  const newBoards = toIntMap(json.boards)
  return {
    boards: new Map([...newBoards.keys()].map(id => {
      if (bg.boards.has(id) && editBoards.has(id) &&
          bg.boards.get(id).text === newBoards.get(id).text) {
        return [id, bg.boards.get(id)]
      } else {
        return [id, newBoards.get(id)]
      }
    })),
    lock: json.lock
  }
}
