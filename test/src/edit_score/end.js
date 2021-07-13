import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.subactions.master.editScore)
}

fixture('edit_score/end').beforeEach(setup).afterEach(closeWindows)

test('change point', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .point input'), '2', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('change batsu', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .batsu input'), '2', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-status').filterVisible().exists).notOk()
})

test('change lock', async t => {
  await t
    .typeText(s.box.players0.nth(0).find('.edit-point .lock input'), '2', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('Lock 2')
})

test('calc comp point', async t => {
  await t
    .click(s.actions.editScore.endEditScore)
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
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.allClear)
    .click(s.subactions.master.editScore)
    .typeText(s.box.players0.nth(0).find('.edit-point .point input'), '3', { replace: true })
    .typeText(s.box.players0.nth(0).find('.edit-point .batsu input'), '9', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('9')
    .expect(s.box.players0.nth(0).find('.player-point .comp-point').innerText).eql('27')
})

test('calc team point', async t => {
  await t
    .click(s.actions.editScore.endEditScore)
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.team)
    .click(s.dialog.rule.team.active)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.editScore)
    .typeText(s.box.players0.nth(0).find('.edit-point .point input'), '2', { replace: true })
    .typeText(s.box.players0.nth(0).find('.edit-point .batsu input'), '1', { replace: true })
    .click(s.actions.editScore.endEditScore)
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.team0.find('.team-point .point').innerText).eql('2')
    .expect(s.box.team0.find('.team-point .batsu').innerText).eql('1')
})
