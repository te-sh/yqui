const css = require('../common/css')

describe('master/observer', () => {
  describe('move from player to observer', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      list = await p0.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      list = await p1.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')

      await p0.yq.clickToggleObserverButton()
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      list = await p1.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
    })

    test('actions area', async () => {
      const s = '.room .actions'

      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$(`${s} .observer-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)
    })

    test('subactions area', async () => {
      const s = '.room .subactions'

      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null)

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null)
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.secondary}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })

    test('chat message', async () => {
      const s = css.selector.chat.lastMessage

      await p0.yq.clickToggleObserverButton()
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0さんが観戦席に移動しました')
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0さんが観戦席に移動しました')
    })
  })
})
