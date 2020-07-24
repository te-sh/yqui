import { toIntMap } from './util'

export const initSg = {
  player: {
    scores: new Map()
  },
  team: {
    scores: new Map()
  }
}

export const mergeSgWithJson = ({ sg }, json) => {
  return {
    player: { scores: json.player ? toIntMap(json.player.scores) : sg.player },
    team: { scores: json.team ? toIntMap(json.team.scores) : sg.team }
  }
}
