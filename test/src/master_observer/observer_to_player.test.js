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

      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      list = await p1.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')

      await p0.yq.clickToggleObserverButton()
      list = await p0.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      list = await p1.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
    })

    test('actions, subactions, chat message', async () => {
      const sa = '.room .actions'
      const sm = '.room .subactions'
      const sc = css.selector.chat.lastMessage

      expect(await p0.$(`${sa} .observer-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${sm} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${sm} .player-subactions`)).not.toBe(null)

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${sm} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${sm} .player-subactions`)).not.toBe(null)

      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた0さんが解答席に移動しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.secondary}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })
  })
})
