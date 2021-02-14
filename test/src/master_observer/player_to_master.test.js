const util = require('../common/util')
const css = require('../common/css')

describe('master/observer', () => {
  describe('move from player to master', () => {
    beforeEach(async () => {
      await util.enterRoom(p0, 1, 'ゆーた0')
      await util.enterRoom(p1, 1, 'ゆーた1')
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

      await util.clickToggleMasterButton(p0)
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

      await util.clickToggleMasterButton(p0)
      expect(await p0.$(`${s} .master-actions`)).not.toBe(null)
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)
    })

    test('subactions area', async () => {
      const s = '.room .subactions'

      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null)

      await util.clickToggleMasterButton(p0)
      expect(await p0.$(`${s} .master-subactions`)).not.toBe(null)
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

      await util.clickToggleMasterButton(p0)
      expect(await p0.$(`${s.ruleBtn}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.secondary}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })

    test('master display', async () => {
      const s = '.room .master-display .master-name'

      expect(await p0.$eval(s, el => el.textContent)).toBe('-')
      expect(await p1.$eval(s, el => el.textContent)).toBe('-')

      await util.clickToggleMasterButton(p0)
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0')
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0')
    })

    test('chat message', async () => {
      const s = css.selector.chat.lastMessage

      await util.clickToggleMasterButton(p0)
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0さんが司会席に移動しました')
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0さんが司会席に移動しました')
    })
  })
})