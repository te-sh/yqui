const css = require('./common/css')

describe('enter room params', () => {
  afterEach(async () => {
    p0 = await browser.yq.reopen(p0)
  })

  test('save name', async () => {
    const sr = css.selector.dialog.enterRoom

    await p0.yq.enterRoom()

    await p0.yq.close()
    p0 = await browser.yq.reopen(p0)
    await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')
    await p0.yq.waitForTimeout()

    expect(await p0.$eval(sr.name, el => el.value)).toBe('ゆーた0')
    expect(await p0.yq.checked(sr.chatAnswer)).toBeFalse()
  })

  test('save chat answer', async () => {
    const sr = css.selector.dialog.enterRoom

    await p0.yq.enterRoom({ name: 'ゆーた1', chatAnswer: true })

    await p0.yq.close()
    p0 = await browser.yq.reopen(p0)
    await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')
    await p0.yq.waitForTimeout()

    expect(await p0.$eval(sr.name, el => el.value)).toBe('ゆーた1')
    expect(await p0.yq.checked(sr.chatAnswer)).toBeTrue()
  })
})
