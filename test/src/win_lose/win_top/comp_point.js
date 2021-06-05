import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3)
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.initValue.open)
    .typeText(s.dialog.rule.initValue.point, '1', { replace: true })
    .typeText(s.dialog.rule.initValue.batsu, '5', { replace: true })
    .click(s.dialog.rule.initValue.open)
    .click(s.dialog.rule.comprehensive.open)
    .click(s.dialog.rule.comprehensive.active)
    .click(s.dialog.rule.comprehensive.open)
    .typeText(s.dialog.rule.normal.batsuWrong, '-1', { replace: true })
    .typeText(s.dialog.rule.normal.loseBatsu.value, '0', { replace: true })
    .click(s.dialog.rule.normal.loseBatsu.active)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.compPoint)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.allClear)
}

fixture('win_lose/win_top/comp_point').beforeEach(setup).afterEach(closeWindows)

test('single', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('same comp point and same point', async t => {
  await correct(1, 0, { times: 2 })
  await correct(2, 0, { times: 2 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('same comp point and different point', async t => {
  await correct(1, 0, { times: 1 })
  await wrong(1, 0, { times: 1 })
  await correct(2, 0, { times: 3 })
  await wrong(2, 0, { times: 3 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})
