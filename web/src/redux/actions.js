export const ENTER_ROOM_OPEN = 'ENTER_ROOM_OPEN'
export const ENTER_ROOM = 'ENTER_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const SETTING_OPEN = 'SETTING_OPEN'
export const SETTING_CLOSE = 'SETTING_CLOSE'
export const RULE_OPEN = 'RULE_OPEN'
export const RULE_CLOSE = 'RULE_CLOSE'
export const RECV_RULE = 'RECV_RULE'
export const RECV_ANSWERS = 'RECV_ANSWERS'
export const RECV_ANSWER_TIMES = 'RECV_ANSWER_TIMES'
export const RECV_RIGHT = 'RECV_RIGHT'
export const RECV_SELF_ID = 'RECV_SELF_ID'
export const RECV_ROOM = 'RECV_ROOM'
export const RECV_MESSAGE = 'RECV_MESSAGE'

export const enterRoomOpen = () => {
  return { type: ENTER_ROOM_OPEN }
}

export const enterRoom = name => {
  return { type: ENTER_ROOM, name }
}

export const settingOpen = () => {
  return { type: SETTING_OPEN }
}

export const settingClose = () => {
  return { type: SETTING_CLOSE }
}

export const leaveRoom = () => {
  return { type: LEAVE_ROOM }
}

export const ruleOpen = () => {
  return { type: RULE_OPEN }
}

export const ruleClose = () => {
  return { type: RULE_CLOSE }
}

export const recvRule = rule => {
  return { type: RECV_RULE, rule }
}

export const recvAnswers = answers => {
  return { type: RECV_ANSWERS, answers }
}

export const recvAnswerTimes = answerTimes => {
  return { type: RECV_ANSWER_TIMES, answerTimes }
}

export const recvRight = right => {
  return { type: RECV_RIGHT, right }
}

export const recvSelfID = selfID => {
  return { type: RECV_SELF_ID, selfID }
}

export const recvRoom = room => {
  return { type: RECV_ROOM, room }
}

export const recvMessage = message => {
  return { type: RECV_MESSAGE, message }
}
