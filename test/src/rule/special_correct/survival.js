import { selectors as s, mui } from '../../common/selectors'
import { createWindows, enterRoom, correct, wrong } from '../../common/helper'

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
    .typeText(s.dialog.rule.initValue.point, '5', { replace: true })
    .click(s.dialog.rule.initValue.open)
    .typeText(s.dialog.rule.normal.pointCorrect, '0', { replace: true })
    .click(s.dialog.rule.normal.winPoint.active)
    .click(s.dialog.rule.normal.losePoint.active)
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.specialCorrect.survival.active)
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.allClear)
}

fixture('rule/special_correct/survival').beforeEach(setup)

test('rule display, special button', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).contains('サバイバル (-1ポイント)')
    .click(s.topbar.rule)
    .expect(s.dialog.rule.specialCorrect.open.hasClass(mui.button.contained)).ok()
})

test('correct', async t => {
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('5')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')

  await correct(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
})

test('lose multple at the same time', async t => {
  await correct(1, 0, { times: 5 })
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('5')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lose')).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-status').hasClass('lose')).ok()
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-status').hasClass('lose')).ok()
})

test('lose during lock', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.lockWrong, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await correct(2, 0, { times: 4 })
  await wrong(1, 0)
  await correct(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).notOk()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lose')).ok()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('5')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-status').hasClass('lock')).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').hasClass('lose')).notOk()
    .expect(s.box.players0.nth(2).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(2).find('.player-status').hasClass('lock')).notOk()
    .expect(s.box.players0.nth(2).find('.player-status').hasClass('lose')).ok()
})
