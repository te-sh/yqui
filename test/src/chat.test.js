const css = require('./common/css')

describe('chat', () => {
  beforeEach(async () => {
    await p0.yq.enterRoom()
    await p1.yq.enterRoom()
  })

  test('chat', async () => {
    const s = css.selector.chat.lastMessage

    await p1.yq.fillText('.room .chat .chat-text input', 'おはようございます')
    await p1.click('.room .chat .send-chat-button')
    await p1.yq.waitForTimeout()
    expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1 > おはようございます')
    expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた1 > おはようございます')

    await p0.yq.fillText('.room .chat .chat-text input', 'こんにちは')
    await p0.click('.room .chat .send-chat-button')
    await p0.yq.waitForTimeout()
    expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0 > こんにちは')
    expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0 > こんにちは')
  })
})
