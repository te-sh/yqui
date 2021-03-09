import { selectors as s, mui } from '../../common/selectors'
import { createWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.specialCorrect.consBonus)
    .click(s.dialog.rule.specialCorrect.open)
    .click(s.dialog.rule.submit)
}

fixture('rule/special_correct/cons_bonus').beforeEach(setup)

test('rule display, special button', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).contains('連答ボーナス')
    .click(s.topbar.rule)
    .expect(s.dialog.rule.specialCorrect.open.hasClass(mui.button.contained)).ok()
})

test('correct once', async t => {
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('1')
})

test('correct consequently', async t => {
  await correct(1, 0, { times: 2 })
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('2')

  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('6')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('3')
})

test('wrong on consequence', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).notOk()
})

test('correct other on consequence', async t => {
  await correct(1, 0, { times: 2 })
  await correct(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).notOk()
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(1).find('.cons-correct').innerText).eql('1')
})

test('wrong other on consequence', async t => {
  await correct(1, 0, { times: 2 })
  await wrong(2, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('3')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('2')
    .expect(s.box.players0.nth(1).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(1).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(1).find('.cons-correct').exists).notOk()
})

test('change point correct', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointCorrect, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('1')
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('6')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.cons-correct').exists).ok()
    .expect(s.box.players0.nth(0).find('.cons-correct').innerText).eql('2')
})
