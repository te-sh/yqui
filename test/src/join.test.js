const css = require('./common/css')

describe('join', () => {
  describe('as player', () => {
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
      expect(await p0.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p0.yq.className(s.masterBtn)).toContain(c.inherit)
      expect(await p0.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p0.yq.className(s.observerBtn)).toContain(c.inherit)

      await p1.yq.enterRoom()
      expect(await p0.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p0.yq.className(s.masterBtn)).toContain(c.inherit)
      expect(await p0.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p0.yq.className(s.observerBtn)).toContain(c.inherit)
      expect(await p1.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p1.yq.className(s.masterBtn)).toContain(c.inherit)
      expect(await p1.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p1.yq.className(s.observerBtn)).toContain(c.inherit)
    })
  })

  describe('as observer', () => {
    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users'

      expect(await p0.yq.textContent(s)).toBe('0')

      await p1.yq.enterRoom()
      expect(await p0.yq.textContent(s)).toBe('1')

      await p2.yq.enterRoom({ observer: true })
      expect(await p0.yq.textContent(s)).toBe('2')
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      await p0.yq.enterRoom()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')

      await p1.yq.enterRoom({ observer: true })
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
    })

    test('actions, subactions, chat message', async () => {
      const [sa, ss] = [css.selector.actions, css.selector.subactions]
      const sc = css.selector.chat.lastMessage

      await p0.yq.enterRoom()
      expect(await p0.yq.$t(sa.player)).toBeTrue()
      expect(await p0.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが入室しました')

      await p1.yq.enterRoom({ observer: true })
      expect(await p0.yq.$t(sa.player)).toBeTrue()
      expect(await p1.yq.$t(sa.observer)).toBeTrue()
      expect(await p0.yq.$t(ss.player)).toBeTrue()
      expect(await p1.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sc)).toBe('ゆーた1さん (観戦) が入室しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた1さん (観戦) が入室しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.mui.iconBtn]

      await p0.yq.enterRoom()
      expect(await p0.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p0.yq.className(s.masterBtn)).toContain(c.inherit)
      expect(await p0.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p0.yq.className(s.observerBtn)).toContain(c.inherit)

      await p1.yq.enterRoom({ observer: true })
      expect(await p0.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p0.yq.className(s.masterBtn)).toContain(c.inherit)
      expect(await p0.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p0.yq.className(s.observerBtn)).toContain(c.inherit)
      expect(await p1.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.masterBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p1.yq.className(s.observerBtn)).toContain(c.secondary)
    })
  })
})