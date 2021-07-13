import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
}

fixture('clear/all_clear').beforeEach(setup).afterEach(closeWindows)

test('clear point', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(1, 0, { times: 1 })
  await t
    .click(s.subactions.master.allClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('clear win', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(1, 0, { times: 1 })
  await correct(1, 0, { times: 5 })
  await t
    .click(s.subactions.master.allClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('clear lose', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(1, 0, { times: 3 })
  await t
    .click(s.subactions.master.allClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('clear win times', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
  await correct(1, 0, { times: 7 })
  await wrong(1, 0, { times: 3 })
  await t
    .click(s.subactions.master.allClear)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(0).find('.win-times .win').count).eql(0)
})
