export const RECV_CHAT = 'RECV_CHAT'

export const recvChat = chat => {
  return { type: RECV_CHAT, chat }
}
