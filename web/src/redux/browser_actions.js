export const SET_MOBILE = 'SET_MOBILE'
export const SET_WEB_SOCKET = 'SET_WEB_SOCKET'

export const setMobile = mobile => {
  return { type: SET_MOBILE, mobile }
}

export const setWebSocket = ws => {
  return { type: SET_WEB_SOCKET, ws }
}
