import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, correct } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
}

fixture('win_times/win').beforeEach(setup).afterEach(closeWindows)

test('win by point', async t => {
  await correct(1, 0, { times: 7 })
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('7')
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(1)
})

test('win by win-top', async t => {
  await correct(1, 0)
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(1)
})
