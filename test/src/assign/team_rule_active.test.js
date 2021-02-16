const css = require('../common/css')

describe('assign', () => {
  describe('team rule is active', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
      await p2.yq.enterRoom()
      await p0.yq.clickToggleMasterButton()

      const s = css.selector.dialog.rule
      await p0.yq.clickOpenRuleButton()
      await p0.click(s.tab.team)
      await p0.click(s.team.active)
      await p0.click(s.submit)
      await p0.yq.waitForTimeout()
    })

    describe('begin assign', () => {
      test('actions, subactions', async () => {
        const sa = '.room .actions'
        const sm = '.room .subactions'

        expect(await p0.yq.$t(`${sa} .master-actions:not(.hidden)`)).toBeTrue()
        expect(await p0.yq.$t(`${sm} .master-subactions:not(.hidden)`)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.$t(`${sa} .assign-actions:not(.hidden)`)).toBeTrue()
        expect(await p0.yq.$t(`${sm} .assign-subactions:not(.hidden)`)).toBeTrue()
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

      test('player box', async () => {
        await p0.yq.clickBeginAssignButton()

        const s = '.room .team'
        const teams = await p0.yq.$$(s)
        expect(teams.length).toBe(2)
        expect(await teams[0].yq.textContent('.team-title')).toBe('チーム1')
        expect(await teams[1].yq.textContent('.team-title')).toBe('観戦席')

        let players
        players = await teams[0].yq.$$('.player-container')
        expect(players.length).toBe(2)
        expect(await players[0].yq.textContent('.player-name')).toBe('ゆーた1')
        expect(await players[1].yq.textContent('.player-name')).toBe('ゆーた2')

        players = teams[1].yq.$$('.player-container')
        expect(players.length).toBeUndefined()
      })

      test('actions, subactions', async () => {
        const [sa, ss] = [css.selector.actions, css.selector.subactions]

        expect(await p0.yq.$t(sa.master)).toBeTrue()
        expect(await p0.yq.$t(ss.master)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.$t(sa.assign)).toBeTrue()
        expect(await p0.yq.$t(ss.assign)).toBeTrue()
        expect(await p0.yq.$t(`${ss.assign} .team-component`)).toBeTrue()
      })
    })
  })
})
