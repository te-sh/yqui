const css = require('../common/css')

describe('join/leave', () => {
  describe('leave master', () => {
    beforeEach(async () => {
      await p1.yq.enterRoom()
      await p2.yq.enterRoom()
    })

    afterEach(async () => {
      p2 = await browser.yq.reopen(p2)
    })

    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users'

      expect(await p0.yq.textContent(s)).toBe('2')

      await p1.yq.clickToggleMasterButton()
      await p1.yq.leaveRoom()
      expect(await p0.yq.textContent(s)).toBe('1')

      await p2.yq.clickToggleMasterButton()
      await p2.yq.close()
      expect(await p0.yq.textContent(s)).toBe('0')
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      await p0.yq.enterRoom()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(3)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた2')
      expect(await list[2].yq.textContent('.player-name')).toBe('ゆーた0')

      await p1.yq.clickToggleMasterButton()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた2')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')

      await p1.yq.leaveRoom()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた2')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')

      await p2.yq.clickToggleMasterButton()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')

      await p2.yq.close()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      await p0.yq.enterRoom()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p1.yq.clickToggleMasterButton()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p1.yq.leaveRoom()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p2.yq.clickToggleMasterButton()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p2.yq.close()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })

    test('master display, chat message', async () => {
      const sm = '.room .master-display .master-name'
      const sc = css.selector.chat.lastMessage

      await p0.yq.enterRoom()
      expect(await p0.yq.textContent(sm)).toBe('-')

      await p1.yq.clickToggleMasterButton()
      expect(await p0.yq.textContent(sm)).toBe('ゆーた1')
      await p1.yq.leaveRoom()
      expect(await p0.yq.textContent(sm)).toBe('-')
      expect(await p0.yq.textContent(sc)).toBe('ゆーた1さん (司会) が退室しました')

      await p2.yq.clickToggleMasterButton()
      expect(await p0.yq.textContent(sm)).toBe('ゆーた2')
      await p2.yq.close()
      expect(await p0.yq.textContent(sm)).toBe('-')
      expect(await p0.yq.textContent(sc)).toBe('ゆーた2さん (司会) が退室しました')
    })
  })
})
