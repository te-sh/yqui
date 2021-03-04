import { selectors as s } from './common/selectors'
import { createWindows, enterRoom, leaveRoom, correct, wrong } from './common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t.click(s.topbar.masterButton)
  await correct(1, 0, { times: 2 })
  await wrong(1, 0, { times: 1 })
}

fixture('score backup').beforeEach(setup)

test('join', async t => {
  await leaveRoom(1)
  await enterRoom(1)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
})

test('join after all clear', async t => {
  await leaveRoom(1)
  await t
    .click(s.subactions.allClearButton)
  await enterRoom(1)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
})

test('join with different name', async t => {
  await leaveRoom(1)
  await enterRoom(1, { name: 'ゆーた2' })
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
})
