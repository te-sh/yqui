import { selectors as s } from '../../common/selectors'
import { createWindows, enterRoom, wrong } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t.click(s.topbar.master)
}

fixture('rule/normal/batsu_wrong').beforeEach(setup)

test('rule display', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).match(/誤答.*1バツ/)
})

test('wrong', async t => {
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('1')
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('2')
})

test('change batsu wrong', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.batsuWrong, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await t
    .expect(s.ruleDisplay.normal.content.innerText).match(/誤答.*2バツ/)
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('2')
  await wrong(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('0')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('4')
})
