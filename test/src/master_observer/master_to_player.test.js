const css = require('../common/css')

describe('master/observer', () => {
  describe('move from master to player', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
      await p0.yq.clickToggleMasterButton()
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')

      await p0.yq.clickToggleMasterButton()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')
    })

    test('actions, subactions, master display, chat message', async () => {
      const [sa, ss] = [css.selector.actions, css.selector.subactions]
      const sm = '.room .master-display .master-name'
      const sc = css.selector.chat.lastMessage

      expect(await p0.yq.$t(sa.master)).toBeTrue()
      expect(await p1.yq.$t(sa.player)).toBeTrue()
      expect(await p0.yq.$t(ss.master)).toBeTrue()
      expect(await p1.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sm)).toBe('ゆーた0')
      expect(await p1.yq.textContent(sm)).toBe('ゆーた0')

      await p0.yq.clickToggleMasterButton()
      expect(await p0.yq.$t(sa.player)).toBeTrue()
      expect(await p1.yq.$t(sa.player)).toBeTrue()
      expect(await p0.yq.$t(ss.player)).toBeTrue()
      expect(await p1.yq.$t(ss.player)).toBeTrue()
      expect(await p0.yq.textContent(sm)).toBe('-')
      expect(await p1.yq.textContent(sm)).toBe('-')

      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.mui.iconBtn]

      expect(await p0.yq.disabled(s.assignBtn)).toBeFalse()
      expect(await p0.yq.disabled(s.ruleBtn)).toBeFalse()
      expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
      expect(await p0.yq.className(s.masterBtn)).toContain(c.secondary)
      expect(await p0.yq.disabled(s.observerBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.assignBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.ruleBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.masterBtn)).toBeTrue()
      expect(await p1.yq.disabled(s.observerBtn)).toBeFalse()
      expect(await p1.yq.className(s.observerBtn)).toContain(c.inherit)

      await p0.yq.clickToggleMasterButton()
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
})
