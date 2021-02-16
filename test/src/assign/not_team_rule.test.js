const css = require('../common/css')

describe('assign', () => {
  describe('not team rule', () => {
    beforeEach(async () => {
      await p0.yq.enterRoom()
      await p1.yq.enterRoom()
      await p2.yq.enterRoom()
    })

    describe('begin assign', () => {
      test('actions, subactions', async () => {
        const sa = '.room .actions'
        const sm = '.room .subactions'

        await p0.yq.clickToggleMasterButton()
        expect(await p0.yq.$t(`${sa} .master-actions:not(.hidden)`)).toBeTrue()
        expect(await p0.yq.$t(`${sm} .master-subactions:not(.hidden)`)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.$t(`${sa} .assign-actions:not(.hidden)`)).toBeTrue()
        expect(await p0.yq.$t(`${sm} .assign-subactions:not(.hidden)`)).toBeTrue()
      })

      test('topbar buttons', async () => {
        const [s, c] = [css.selector.topbar, css.mui.iconBtn]

        await p0.yq.clickToggleMasterButton()
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

      test('actions, subactions', async () => {
        const [sa, ss] = [css.selector.actions, css.selector.subactions]

        await p0.yq.clickToggleMasterButton()
        expect(await p0.yq.$t(sa.master)).toBeTrue()
        expect(await p0.yq.$t(ss.master)).toBeTrue()

        await p0.yq.clickBeginAssignButton()
        expect(await p0.yq.$t(sa.assign)).toBeTrue()
        expect(await p0.yq.$t(ss.assign)).toBeTrue()
      })
    })
  })
})
