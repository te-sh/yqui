const util = require('../common/util')

describe('join/leave', () => {
  describe('enter room params', () => {
    beforeEach(async () => {
      await util.gotoYqui(...pages)
    })

    test('save name', async () => {
      await util.enterRoom(p0, 1, 'ゆーた0')

      await util.closePage(p0)
      p0 = await util.newPage(0)
      await util.gotoYqui(p0)
      await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')

      expect(await p0.$eval('.enter-room .name input', el => el.value)).toBe('ゆーた0')
      expect(await p0.$('.enter-room .chat-answer-check input:not([checked])')).not.toBe(null)
    })

    test('save chat answer', async () => {
      await util.enterRoom(p0, 1, 'ゆーた1', { chatAnswer: true })

      await util.closePage(p0)
      p0 = await util.newPage(0)
      await util.gotoYqui(p0)
      await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')

      expect(await p0.$eval('.enter-room .name input', el => el.value)).toBe('ゆーた1')
      expect(await p0.$('.enter-room .chat-answer-check input[checked]')).not.toBe(null)
    })
  })
})
