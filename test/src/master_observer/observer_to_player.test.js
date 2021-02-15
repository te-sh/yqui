const css = require('../common/css')

describe('master/observer', () => {
  describe('move from observer to player', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
      await p0.yq.clickToggleObserverButton()
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

      await p0.yq.clickToggleObserverButton()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた0')
    })

    test('actions, subactions, chat message', async () => {
      const sa = '.room .actions'
      const sm = '.room .subactions'
      const sc = css.selector.chat.lastMessage

      expect(await p0.yq.$t(`${sa} .observer-actions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.$t(`${sm} .player-subactions`)).toBeTrue()
      expect(await p1.yq.$t(`${sm} .player-subactions`)).toBeTrue()

      await p0.yq.clickToggleObserverButton()
      expect(await p0.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.$t(`${sm} .player-subactions`)).toBeTrue()
      expect(await p1.yq.$t(`${sm} .player-subactions`)).toBeTrue()

      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.mui.iconBtn]

      expect(await p0.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.masterBtn}${c.inherit}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.observerBtn}${c.secondary}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()

      await p0.yq.clickToggleObserverButton()
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
