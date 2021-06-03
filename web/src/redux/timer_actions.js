export const RECV_TIMER = 'RECV_TIMER'

export const recvTimer = timer => {
  return { type: RECV_TIMER, timer }
}
