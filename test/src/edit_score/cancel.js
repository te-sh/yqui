import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.subactions.master.editScore)
}

fixture('edit_score/cancel').beforeEach(setup).afterEach(closeWindows)

test('change point', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .point input'), '2', { replace: true })
    .click(s.actions.editScore.cancelEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('change batsu', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .batsu input'), '2', { replace: true })
    .click(s.actions.editScore.cancelEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('change lock', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .lock input'), '2', { replace: true })
    .click(s.actions.editScore.cancelEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})
