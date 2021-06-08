export const RESET = 'RESET'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_ROOM = 'RECV_ROOM'
export const SET_TEAMS = 'SET_EDIT_TEAMS'
export const UPDATE_DISP_TEAMS = 'UPDATE_DISP_TEAMS'

export const reset = () => {
  return { type: RESET }
}

export const recvSelfID = selfID => {
  return { type: RECV_SELF_ID, selfID }
}

export const recvRoom = room => {
  return { type: RECV_ROOM, room }
}

export const setTeams = payload => {
  return { type: SET_TEAMS, payload }
}

export const updateDispTeams = () => {
  return { type: UPDATE_DISP_TEAMS }
}
