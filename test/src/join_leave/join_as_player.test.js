const css = require('../common/css')

describe('join/leave', () => {
  describe('join as player', () => {
    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users'

      expect(await p0.$eval(s, el => el.textContent)).toBe('0')

      await p1.yq.enterRoom()
      expect(await p0.$eval(s, el => el.textContent)).toBe('1')

      await p2.yq.enterRoom()
      expect(await p0.$eval(s, el => el.textContent)).toBe('2')
    })

    test('player box', async () => {
      const s = '.room .team .player-container'
      let list

      await p0.yq.enterRoom()
      list = await p0.$$(s)
      expect(list.length).toBe(1)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')

      await p1.yq.enterRoom()
      list = await p0.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
      list = await p1.$$(s)
      expect(list.length).toBe(2)
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0')
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1')
    })

    test('actions area', async () => {
      const s = '.room .actions'

      await p0.yq.enterRoom()
      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)

      await p1.yq.enterRoom()
      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null)
    })

    test('subactions area', async () => {
      const s = '.room .subactions'

      await p0.yq.enterRoom()
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null)

      await p1.yq.enterRoom()
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null)
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null)
    })

    test('topbar buttons', async () => {
      const [s, c] = [css.selector.topbar, css.color.iconBtn]

      await p0.yq.enterRoom()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)

      await p1.yq.enterRoom()
      expect(await p0.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p0.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p0.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.ruleBtn}[disabled]`)).not.toBe(null)
      expect(await p1.$(`${s.masterBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
      expect(await p1.$(`${s.observerBtn}${c.inherit}:not([disabled])`)).not.toBe(null)
    })

    test('chat message', async () => {
      const s = css.selector.chat.lastMessage

      await p0.yq.enterRoom()
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0さんが入室しました')

      await p1.yq.enterRoom()
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1さんが入室しました')
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた1さんが入室しました')
    })
  })
})
