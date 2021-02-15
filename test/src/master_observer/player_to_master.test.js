const css = require('../common/css')

describe('master/observer', () => {
  describe('move from player to master', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた1')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた0')
      expect(await list[1].yq.textContent('.player-name')).toBe('ゆーた1')

      await p0.yq.clickToggleMasterButton()
      list = await p0.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
      list = await p1.yq.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].yq.textContent('.player-name')).toBe('ゆーた1')
    })

    test('actions, subactions, master display, chat message', async () => {
      const sa = '.room .actions'
      const ss = '.room .subactions'
      const sm = '.room .master-display .master-name'
      const sc = css.selector.chat.lastMessage

      expect(await p0.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.$t(`${ss} .player-subactions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${ss} .player-subactions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.textContent(sm)).toBe('-')
      expect(await p1.yq.textContent(sm)).toBe('-')

      await p0.yq.clickToggleMasterButton()
      expect(await p0.yq.$t(`${sa} .master-actions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${sa} .player-actions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.$t(`${ss} .master-subactions:not(.hidden)`)).toBeTrue()
      expect(await p1.yq.$t(`${ss} .player-subactions:not(.hidden)`)).toBeTrue()
      expect(await p0.yq.textContent(sm)).toBe('ゆーた0')
      expect(await p1.yq.textContent(sm)).toBe('ゆーた0')

      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが司会席に移動しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた0さんが司会席に移動しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.mui.iconBtn]

      expect(await p0.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p0.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.masterBtn}${c.inherit}:not([disabled])`)).toBeTrue()
      expect(await p1.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()

      await p0.yq.clickToggleMasterButton()
      expect(await p0.yq.$t(`${s.assignBtn}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.ruleBtn}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.masterBtn}${c.secondary}:not([disabled])`)).toBeTrue()
      expect(await p0.yq.$t(`${s.observerBtn}${c.inherit}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.assignBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.ruleBtn}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.masterBtn}${c.inherit}[disabled]`)).toBeTrue()
      expect(await p1.yq.$t(`${s.observerBtn}${c.inherit}:not([disabled])`)).toBeTrue()
    })
  })
})
