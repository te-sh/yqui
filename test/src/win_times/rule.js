import { selectors as s, mui } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
}

fixture('win_times/rule').beforeEach(setup).afterEach(closeWindows)

test('without show win times', async t => {
  await t
    .expect(s.box.players0.nth(0).find('.win-times').exists).notOk()
    .click(s.subactions.master.partialClear)
    .expect(s.dialog.clear.winTimes.hasClass(mui.disabled)).ok()
})

test('with show win times', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
    .expect(s.box.players0.nth(0).find('.win-times').exists).ok()
    .click(s.subactions.master.partialClear)
    .expect(s.dialog.clear.winTimes.hasClass(mui.disabled)).notOk()
})
