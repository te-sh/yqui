import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.master)
}

fixture('win_times/rule').beforeEach(setup).afterEach(closeWindows)

test('without show win times', async t => {
  await t
    .expect(s.subactions.master.scoreClear.exists).notOk()
    .expect(s.box.players0.nth(0).find('.win-times').exists).notOk()
})

test('with show win times', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
    .expect(s.subactions.master.scoreClear.exists).ok()
    .expect(s.box.players0.nth(0).find('.win-times').exists).ok()
})
