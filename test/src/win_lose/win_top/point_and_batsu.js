import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3)
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.other)
    .click(s.dialog.rule.other.pointAndBatsu)
    .click(s.dialog.rule.submit)
}

fixture('win_lose/win_top/point_and_batsu').beforeEach(setup).afterEach(closeWindows)

test('single', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('same point and same batsu', async t => {
  await correct(1, 0, { times: 2 })
  await correct(2, 0, { times: 2 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})

test('same point and different batsu', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(1, 0)
  await correct(2, 0, { times: 2 })
  await t
    .click(s.subactions.master.winTop)
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('1st')
    .expect(s.box.players0.nth(2).find('.player-status').filterVisible().exists).notOk()
})
