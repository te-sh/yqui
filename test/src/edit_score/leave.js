import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, leaveRoom } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.master)
    .click(s.subactions.master.editScore)
}

fixture('edit_score/leave').beforeEach(setup).afterEach(closeWindows)

test('default', async t => {
  await leaveRoom(2)
  await t
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('0')
})

test('after change point', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .point input'), '2', { replace: true })
    .click('body')
  await leaveRoom(2)
  await t
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('2')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('0')
})
