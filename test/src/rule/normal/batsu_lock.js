import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
}

fixture('rule/normal/batsu_wrong').beforeEach(setup).afterEach(closeWindows)

test('wrong', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).notMatch(/誤答.*0休/)
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).notOk()
})

test('change batsu wrong', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.lockWrong, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await t
    .expect(s.ruleDisplay.normal.content.innerText).match(/誤答.*2休/)
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-status').hasClass('lock')).ok()
    .expect(s.box.players0.nth(0).find('.player-status').innerText).eql('Lock 2')
})
