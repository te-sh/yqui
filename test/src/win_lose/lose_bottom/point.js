import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3)
}

fixture('win_lose/lose_bottom/point').beforeEach(setup).afterEach(closeWindows)

test('single', async t => {
  await correct(1, 0, { times: 2 })
  await correct(2, 0, { times: 2 })
  await t
    .click(s.subactions.master.loseBottom)
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(2).find('.player-status').innerText).eql('Lose')
})

test('same point and same batsu', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .click(s.subactions.master.loseBottom)
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('Lose')
    .expect(s.box.players0.nth(2).find('.player-status').innerText).eql('Lose')
})

test('same point and different batsu', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(2, 0)
  await t
    .click(s.subactions.master.loseBottom)
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').innerText).eql('Lose')
    .expect(s.box.players0.nth(2).find('.player-status').innerText).eql('Lose')
})
