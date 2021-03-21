import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom, correct } from '../../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await t.click(s.topbar.master)
}

fixture('rule/normal/point_correct').beforeEach(setup).afterEach(closeWindows)

test('correct', async t => {
  await t
    .expect(s.ruleDisplay.normal.content.innerText).match(/正解.*1ポイント/)
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
})

test('change point correct', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointCorrect, '2', { replace: true })
    .click(s.dialog.rule.submit)
  await t
    .expect(s.ruleDisplay.normal.content.innerText).match(/正解.*2ポイント/)
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('2')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
  await correct(1, 0)
  await t
    .expect(s.box.players0.nth(0).find('.player-point .point').innerText).eql('4')
    .expect(s.box.players0.nth(0).find('.player-point .batsu').innerText).eql('0')
})
