export const SET_OPEN_TAG = 'SET_OPEN_TAG'
export const SET_OPEN_RULE = 'SET_OPEN_RULE'
export const SET_OPEN_SETTING = 'SET_OPEN_SETTING'
export const SET_OPEN_HELP = 'SET_OPEN_HELP'
export const SET_OPEN_CLEAR = 'SET_OPEN_CLEAR'

export const setOpenTag = open => {
  return { type: SET_OPEN_TAG, open }
}

export const setOpenRule = open => {
  return { type: SET_OPEN_RULE, open }
}

export const setOpenSetting = open => {
  return { type: SET_OPEN_SETTING, open }
}

export const setOpenHelp = open => {
  return { type: SET_OPEN_HELP, open }
}

export const setOpenClear = open => {
  return { type: SET_OPEN_CLEAR, open }
}
