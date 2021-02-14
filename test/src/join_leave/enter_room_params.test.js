describe('join/leave', () => {
  describe('enter room params', () => {
    test('save name', async () => {
      await p0.yq.enterRoom()

      await p0.yq.close()
      p0 = await browser.yq.reopen(p0)
      await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')

      expect(await p0.$eval('.enter-room .name input', el => el.value)).toBe('ゆーた0')
      expect(await p0.$('.enter-room .chat-answer-check input:not([checked])')).not.toBe(null)
    })

    test('save chat answer', async () => {
      await p0.yq.enterRoom({ name: 'ゆーた1', chatAnswer: true })

      await p0.yq.close()
      p0 = await browser.yq.reopen(p0)
      await p0.click('.rooms-table tbody tr:nth-child(1) .enter-room-button button')

      expect(await p0.$eval('.enter-room .name input', el => el.value)).toBe('ゆーた1')
      expect(await p0.$('.enter-room .chat-answer-check input[checked]')).not.toBe(null)
    })
  })
})
