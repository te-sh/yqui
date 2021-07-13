import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3)
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.showWinTimes)
    .click(s.dialog.rule.submit)
  await correct(1, 0, { times: 2 })
  await wrong(1, 0, { times: 1 })
  await wrong(2, 0, { times: 2 })
  await correct(2, 0, { times: 7 })
  await correct(3, 0, { times: 3 })
  await wrong(3, 0, { times: 3 })
}

fixture('clear/partial_clear').beforeEach(setup).afterEach(closeWindows)

test('all clear', async t => {
  await t
    .click(s.subactions.master.partialClear)
    .click(s.dialog.clear.submit)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.win-times .win').count).eql(0)
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('clear except win', async t => {
  await t
    .click(s.subactions.master.partialClear)
    .click(s.dialog.clear.win)
    .click(s.dialog.clear.submit)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('7')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('2')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).ok()
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.win-times .win').count).eql(0)
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('clear except lose', async t => {
  await t
    .click(s.subactions.master.partialClear)
    .click(s.dialog.clear.lose)
    .click(s.dialog.clear.submit)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.win-times .win').count).eql(0)
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('3')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).ok()
    .expect(s.box.players0.nth(2).find('.player-status').innerText).eql('Lose')
})

test('clear except win times', async t => {
  await t
    .click(s.subactions.master.partialClear)
    .click(s.dialog.clear.winTimes)
    .click(s.dialog.clear.submit)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.win-times .win').count).eql(1)
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})
