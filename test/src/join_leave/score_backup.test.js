const util = require('../common/util')

describe('join/leave', () => {
  describe('score backup', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p0.yq.clickToggleMasterButton()
      await p1.yq.enterRoom()
      await util.clickAnswerButton(p1)
      await util.clickCorrectButton(p0)
      await util.clickAnswerButton(p1)
      await util.clickCorrectButton(p0)
      await util.clickAnswerButton(p1)
      await util.clickWrongButton(p0)
    })

    afterEach(async () => {
      p1 = await browser.yq.reopen(p1)
    })

    test('leave and join', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')

      await p1.yq.close()
      p1 = await browser.yq.reopen(p1)
      await p1.yq.enterRoom()

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')
    })

    test('leave and join after all clear', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')

      await p1.yq.close()
      p1 = await browser.yq.reopen(p1)
      await util.clickAllClearButton(p0)
      await p1.yq.enterRoom()

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('0')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('0')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('0')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('0')
    })

    test('leave and join with changing name', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('2')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1')

      await p1.yq.close()
      p1 = await browser.yq.reopen(p1)
      await p1.yq.enterRoom({ name: 'ゆーた2' })

      list = await p0.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('0')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('0')
      list = await p1.$$(s)
      expect(await list[0].$eval('.point', el => el.textContent)).toBe('0')
      expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('0')
    })
  })
})
