import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(1)
  await enterRoom(0)
}

fixture('rule_display/normal/correct_wrong').beforeEach(setup).afterEach(closeWindows)

test('default', async t => {
  await t
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('正解1ポイント')
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('誤答1バツ')
})

test('change correct setting', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointCorrect, '2', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('正解2ポイント')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointCorrect, '0', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).notContains('正解')
})

test('change wrong setting', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.batsuWrong, '2', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('誤答2バツ')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.lockWrong, '1', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('誤答2バツ1休')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointWrong, '-1', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).contains('誤答-1ポイント2バツ1休')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.pointWrong, '0', { replace: true })
    .typeText(s.dialog.rule.normal.batsuWrong, '0', { replace: true })
    .typeText(s.dialog.rule.normal.lockWrong, '0', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.correctWrong.innerText).notContains('誤答')
})
