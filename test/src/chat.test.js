const css = require('./common/css')

describe('chat', () => {
  beforeEach(async () => {
    await Promise.all([
      p0.yq.enterRoom({ delay: STEP_TIME * 0 }),
      p1.yq.enterRoom({ delay: STEP_TIME * 1 })
    ])
  })

  test('chat', async () => {
    const s = css.selector.chat.lastMessage

    await p1.yq.fillText('.room .chat .chat-text input', 'おはようございます')
    await p1.click('.room .chat .send-chat-button')
    await p1.yq.waitForTimeout()
    expect(await p0.yq.textContent(s)).toBe('ゆーた1 > おはようございます')
    expect(await p1.yq.textContent(s)).toBe('ゆーた1 > おはようございます')

    await p0.yq.fillText('.room .chat .chat-text input', 'こんにちは')
    await p0.click('.room .chat .send-chat-button')
    await p0.yq.waitForTimeout()
    expect(await p0.yq.textContent(s)).toBe('ゆーた0 > こんにちは')
    expect(await p1.yq.textContent(s)).toBe('ゆーた0 > こんにちは')
  })
})
