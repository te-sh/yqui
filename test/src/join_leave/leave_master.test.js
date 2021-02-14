const util = require('../common/util')
const css = require('../common/css')

describe('join/leave', () => {
  describe('leave master', () => {
    beforeEach(async () => {
      await util.enterRoom(p1, 1, 'ゆーた1')
      await util.enterRoom(p2, 1, 'ゆーた2')
    })

    afterEach(async () => {
      p2 = await browser.yq.reopen(p2)
    })

    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users'

      expect(await p0.$eval(s, el => el.textContent)).toBe('2')

      await util.clickToggleMasterButton(p1)
      await util.leaveRoom(p1)
      expect(await p0.$eval(s, el => el.textContent)).toBe('1')

      await util.clickToggleMasterButton(p2)
      await p2.yq.close()
      expect(await p0.$eval(s, el => el.textContent)).toBe('0')
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      await util.enterRoom(p0, 1, 'ゆーた0')
      list = await p0.$$(s)
      expect(list.length).toBe(3)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた2')
      expect(await list[2].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await util.clickToggleMasterButton(p1)
      list = await p0.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた2')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await util.leaveRoom(p1)
      list = await p0.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた2')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await util.clickToggleMasterButton(p2)
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await p2.yq.close()
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      await util.enterRoom(p0, 1, 'ゆーた0')
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await util.clickToggleMasterButton(p1)
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await util.leaveRoom(p1)
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await util.clickToggleMasterButton(p2)
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p2.yq.close()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })

    test('master display', async () => {
      const s = '.room .master-display .master-name'

      await util.enterRoom(p0, 1, 'ゆーた0')
      expect(await p0.$eval(s, el => el.textContent)).toBe('-')

      await util.clickToggleMasterButton(p1)
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1')
      await util.leaveRoom(p1)
      expect(await p0.$eval(s, el => el.textContent)).toBe('-')

      await util.clickToggleMasterButton(p2)
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた2')
      await p2.yq.close()
      expect(await p0.$eval(s, el => el.textContent)).toBe('-')
    })

    test('chat message', async () => {
      const s = css.selector.chat.lastMessage

      await util.enterRoom(p0, 1, 'ゆーた0')

      await util.clickToggleMasterButton(p1)
      await util.leaveRoom(p1)
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1さん (司会) が退室しました')

      await util.clickToggleMasterButton(p2)
      await p2.yq.close()
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた2さん (司会) が退室しました')
    })
  })
})
