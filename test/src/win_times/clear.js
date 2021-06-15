import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, correct } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
  await correct(1, 0, { times: 7 })
}

fixture('win_times/clear').beforeEach(setup).afterEach(closeWindows)

test('all clear', async t => {
  await t
    .click(s.subactions.master.allClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(0)
})

test('score clear', async t => {
  await t
    .click(s.subactions.master.scoreClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(1)
})
