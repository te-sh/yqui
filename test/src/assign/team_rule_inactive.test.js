const css = require('../common/css')

describe('assign', () => {
  describe('team rule is inactive', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
      await p2.yq.enterRoom()
      await p3.yq.enterRoom({ observer: true })
      await p0.yq.clickToggleMasterButton()
    })

    describe('begin assign', () => {
      test('player box', async () => {
        await p0.yq.clickBeginAssignButton()

        const teams = await p0.yq.$$('.room .team')
        expect(teams.length).toBe(2)
        expect(await teams[0].yq.textContent('.team-title')).toBe('解答席')
        expect(await teams[1].yq.textContent('.team-title')).toBe('観戦席')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(2)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた1')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた2')

        players = await teams[1].yq.$$('.player-container')
        expect(players.length).toBe(1)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた3')
      })

      test('actions, subactions', async () => {
        const [sa, ss] = [css.selector.actions, css.selector.subactions]

        expect(await p0.yq.$t(sa.master)).toBeTrue()
        expect(await p0.yq.$t(ss.master)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.$t(sa.assign)).toBeTrue()
        expect(await p0.yq.$t(ss.assign)).toBeTrue()
        expect(await p0.yq.$t(`${ss.assign} .team-component`)).toBeFalse()
      })

      test('topbar buttons', async () => {
        const [s, c] = [css.selector.topbar, css.mui.iconBtn]

        expect(await p0.yq.disabled(s.assignBtn)).toBeFalse()
        expect(await p0.yq.disabled(s.ruleBtn)).toBeFalse()
        expect(await p0.yq.disabled(s.masterBtn)).toBeFalse()
        expect(await p0.yq.className(s.masterBtn)).toContain(c.secondary)
        expect(await p0.yq.disabled(s.observerBtn)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.disabled(s.assignBtn)).toBeTrue()
        expect(await p0.yq.disabled(s.ruleBtn)).toBeTrue()
        expect(await p0.yq.disabled(s.masterBtn)).toBeTrue()
        expect(await p0.yq.disabled(s.observerBtn)).toBeTrue()
      })
    })

    describe('join/leave during assign', () => {
      test('join a player', async () => {
        await p0.yq.clickBeginAssignButton()
        await p4.yq.enterRoom()

        const teams = await p0.yq.$$('.room .team')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(3)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた1')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた2')
        expect(await players[2].yq.textContent('.player-name')).toBe('ゆーた4')

        players = await teams[1].yq.$$('.player-container')
        expect(players.length).toBe(1)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた3')
      })

      test('join a observer', async () => {
        await p0.yq.clickBeginAssignButton()
        await p4.yq.enterRoom({ observer: true })

        const teams = await p0.yq.$$('.room .team')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(2)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた1')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた2')

        players = await teams[1].yq.$$('.player-container')
        expect(players.length).toBe(2)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた3')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた4')
      })

      test('leave a player', async () => {
        await p0.yq.clickBeginAssignButton()
        await p1.yq.leaveRoom()

        const teams = await p0.yq.$$('.room .team')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(1)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた2')

        players = await teams[1].yq.$$('.player-container')
        expect(players.length).toBe(1)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた3')
      })

      test('leave a observer', async () => {
        await p0.yq.clickBeginAssignButton()
        await p3.yq.leaveRoom()

        const teams = await p0.yq.$$('.room .team')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(2)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた1')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた2')

        players = await teams[1].yq.$$('.player-container')
        expect(players.length).toBe(0)
      })
    })
  })
})
