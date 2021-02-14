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
      const sa = '.room .actions'
      const ss = '.room .subactions'
      const sm = '.room .master-display .master-name'
      const sc = css.selector.chat.lastMessage

      expect(await p0.$(`${sa} .master-actions`)).not.toBe(null)
      expect(await p1.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${ss} .master-subactions`)).not.toBe(null)
      expect(await p1.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p0.yq.textContent(sm)).toBe('ゆーた0')
      expect(await p1.yq.textContent(sm)).toBe('ゆーた0')

      await p0.yq.clickToggleMasterButton()
      expect(await p0.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p0.yq.textContent(sm)).toBe('-')
      expect(await p1.yq.textContent(sm)).toBe('-')

      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      expect(await p0.$(`${s.ruleBtn}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.secondary}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p0.yq.clickToggleMasterButton()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })
  })
})
