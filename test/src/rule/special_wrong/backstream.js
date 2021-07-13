import { selectors as s, mui } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.normal.loseBatsu.active)
    .click(s.dialog.rule.specialWrong.open)
    .click(s.dialog.rule.specialWrong.backstream)
    .click(s.dialog.rule.specialWrong.open)
    .click(s.dialog.rule.submit)
}

fixture('rule/special_wrong/backstream').beforeEach(setup).afterEach(closeWindows)

test('rule display, special button, etc', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).contains('Backstream')
    .click(s.topbar.rule)
    .expect(s.dialog.rule.specialWrong.open.hasClass(mui.button.contained)).ok()
    .expect(s.dialog.rule.normal.pointWrong.find('input').hasClass(mui.disabled)).ok()
})

test('wrong on 0 batsu', async t => {
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('-1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
})

test('wrong on 1 batsu', async t => {
  await wrong(1, 0)
  await correct(1, 0, { times: 3 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('2')
})

test('wrong on 2 batsu', async t => {
  await wrong(1, 0, { times: 2 })
  await correct(1, 0, { times: 5 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('-1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('3')
})
