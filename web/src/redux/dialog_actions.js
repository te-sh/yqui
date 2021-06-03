export const SET_ALERT = 'SET_ALERT'
export const SET_CONFIRM = 'SET_CONFIRM'
export const SET_PROMPT = 'SET_PROMPT'

export const setAlert = alert => {
  return { type: SET_ALERT, alert }
}

export const setConfirm = confirm => {
  return { type: SET_CONFIRM, confirm }
}

export const setPrompt = prompt => {
  return { type: SET_PROMPT, prompt }
}
