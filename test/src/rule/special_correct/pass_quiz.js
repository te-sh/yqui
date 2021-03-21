import { selectors as s, mui } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.winPoint.value, '3', { replace: true })
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.specialCorrect.passQuiz)
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.submit)
}

fixture('rule/special_correct/pass_quiz').beforeEach(setup).afterEach(closeWindows)

test('rule display, special button', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).contains('通過クイズ')
    .click(s.topbar.rule)
    .expect(s.dialog.rule.specialCorrect.open.hasClass(mui.button.contained)).ok()
})

test('get on pass seat', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).notOk()
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).ok()
})

test('correct on pass seat', async t => {
  await correct(1, 0, { times: 3 })
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('win')).ok()
})

test('wrong on pass seat', async t => {
  await correct(1, 0, { times: 3 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('win')).notOk()
})

test('correct other on pass seat', async t => {
  await correct(1, 0, { times: 3 })
  await correct(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('win')).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').hasClass('win')).notOk()
})

test('wrong other on pass seat', async t => {
  await correct(1, 0, { times: 3 })
  await wrong(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).ok()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('win')).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(1).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-status').hasClass('win')).notOk()
})

test('change init point', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.initValue.open)
    .typeText(s.dialog.rule.initValue.point, '1', { replace: true })
    .click(s.dialog.rule.initValue.open)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.allClear)
  await correct(1, 0, { times: 2 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.pass-seat').exists).notOk()
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('win')).notOk()
})
