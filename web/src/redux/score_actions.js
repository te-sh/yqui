export const RECV_SG = 'RECV_SG'
export const SET_EDIT_SCORES = 'SET_EDIT_SCORES'
export const UNSET_EDIT_SCORES = 'UNSET_EDIT_SCORES'
export const SET_EDIT_SCORE = 'SET_EDIT_SCORE'

export const recvSg = sg => {
  return { type: RECV_SG, sg }
}

export const setEditScores = () => {
  return { type: SET_EDIT_SCORES }
}

export const unsetEditScores = () => {
  return { type: UNSET_EDIT_SCORES }
}

export const setEditScore = (id, score) => {
  return { type: SET_EDIT_SCORE, id, score }
}
