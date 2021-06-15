import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.topbar.master)
}

fixture('win_times/edit').beforeEach(setup).afterEach(closeWindows)

test('without show win times', async t => {
  await t
    .click(s.subactions.master.editScore)
    .expect(s.box.players0.nth(0).find('.edit-point .win-times').exists).notOk()
})

test('with show win times', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.winTop)
    .click(s.subactions.master.editScore)
    .expect(s.box.players0.nth(0).find('.edit-point .win-times').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .win-times input').getAttribute('value')).eql('1')
    .typeText(s.box.players0.nth(0).find('.edit-point .win-times input'), '2', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(2)
})
