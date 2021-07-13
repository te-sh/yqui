import { selectors as s, mui } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointWrong, '-3', { replace: true })
    .click(s.dialog.rule.specialWrong.open)
    .click(s.dialog.rule.specialWrong.belowLock)
    .click(s.dialog.rule.specialWrong.open)
    .click(s.dialog.rule.submit)
}

fixture('rule/special_wrong/below_lock').beforeEach(setup).afterEach(closeWindows)

test('rule display, special button, etc', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).contains('BelowLock')
    .click(s.topbar.rule)
    .expect(s.dialog.rule.specialWrong.open.hasClass(mui.button.contained)).ok()
    .expect(s.dialog.rule.normal.lockWrong.find('input').hasClass(mui.disabled)).ok()
})

test('wrong on 0 point', async t => {
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).ok()
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('Lock 3')
})

test('wrong on 1 point', async t => {
  await correct(1, 0)
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).ok()
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('Lock 2')
})

test('wrong on 3 point', async t => {
  await correct(1, 0, { times: 3 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).notOk()
})

test('wrong on 4 point', async t => {
  await correct(1, 0, { times: 4 })
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).notOk()
})

test('change init point', async t => {
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.initValue.open)
    .typeText(s.dialog.rule.initValue.point, '1', { replace: true })
    .click(s.dialog.rule.initValue.open)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.allClear)
  await correct(1, 0)
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).ok()
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('Lock 2')
})
