import { toIntMap } from './util'

export const initSg = {
  player: {
    scores: new Map()
  },
  team: {
    scores: new Map()
  }
}

export const initScore = {
  point: 0,
  batsu: 0,
  lock: 0,
  consCorrect: 0,
  passSeat: false,
  win: 0,
  lose: 0
}

export const mergeSgWithJson = ({ sg }, json) => {
  return {
    player: { scores: json.player ? toIntMap(json.player.scores) : sg.player },
    team: { scores: json.team ? toIntMap(json.team.scores) : sg.team }
  }
}
