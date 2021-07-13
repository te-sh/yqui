import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
}

fixture('edit_score/begin').beforeEach(setup).afterEach(closeWindows)

test('default', async t => {
  await t
    .click(s.subactions.master.editScore)
    .expect(s.actions.visible.editScore.exists).ok()
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('0')
})

test('set point', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .click(s.subactions.master.editScore)
    .expect(s.actions.visible.editScore.exists).ok()
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('2')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('0')
})

test('set batsu', async t => {
  await wrong(1, 0)
  await t
    .click(s.subactions.master.editScore)
    .expect(s.actions.visible.editScore.exists).ok()
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('1')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('0')
})

test('set lock', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.lockWrong, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await wrong(1, 0)
  await t
    .click(s.subactions.master.editScore)
    .expect(s.actions.visible.editScore.exists).ok()
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.edit-point').exists).ok()
    .expect(s.box.players0.nth(0).find('.edit-point .point input').getAttribute('value')).eql('0')
    .expect(s.box.players0.nth(0).find('.edit-point .batsu input').getAttribute('value')).eql('1')
    .expect(s.box.players0.nth(0).find('.edit-point .lock input').getAttribute('value')).eql('2')
})
