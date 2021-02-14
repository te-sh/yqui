const css = require('../common/css')

describe('join/leave', () => {
  describe('join as observer', () => {
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
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await p1.yq.enterRoom({ observer: true })
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      list = await p1.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
    })

    test('actions, subactions, chat message', async () => {
      const sa = '.room .actions'
      const ss = '.room .subactions'
      const sc = css.selector.chat.lastMessage

      await p0.yq.enterRoom()
      expect(await p0.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p0.yq.textContent(sc)).toBe('ゆーた0さんが入室しました')

      await p1.yq.enterRoom({ observer: true })
      expect(await p0.$(`${sa} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${sa} .observer-actions:not(.hidden)`)).not.toBe(null)
      expect(await p0.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${ss} .player-subactions`)).not.toBe(null)
      expect(await p0.yq.textContent(sc)).toBe('ゆーた1さん (観戦) が入室しました')
      expect(await p1.yq.textContent(sc)).toBe('ゆーた1さん (観戦) が入室しました')
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      await p0.yq.enterRoom()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p1.yq.enterRoom({ observer: true })
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.secondary}:not([disabled])`)).not.toBe(null)
    })
  })
})
