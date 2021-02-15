const css = require('../common/css')

describe('join/leave', () => {
  describe('join as player', () => {
    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users'

      expect(await p0.yq.textContent(s)).toBe('0')

      await p1.yq.enterRoom()
      expect(await p0.yq.textContent(s)).toBe('1')

      await p2.yq.enterRoom()
      expect(await p0.yq.textContent(s)).toBe('2')
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      await p0.yq.enterRoom()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')

      await p1.yq.enterRoom()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた1')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた1')
    })

    test('actions, subactions, chat message', async () => {
      const [sa, ss] = [css.selector.actions, css.selector.subactions]
      const sc = css.selector.chat.lastMessage

      await p0.yq.enterRoom()
      expect(await p0.yq.$t(sa.player)).toBeTrue()
      expect(await p0.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが入室しました')

      await p1.yq.enterRoom()
      expect(await p0.yq.$t(sa.player)).toBeTrue()
      expect(await p1.yq.$t(sa.player)).toBeTrue()
      expect(await p0.yq.$t(ss.player)).toBeTrue()
      expect(await p1.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sc)).toBe('ゆーた1さんが入室しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた1さんが入室しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.mui.iconBtn]

      await p0.yq.enterRoom()
      expect(await p0.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()

      await p1.yq.enterRoom()
      expect(await p0.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()
    })
  })
})
