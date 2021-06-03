import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(1)
  await enterRoom(0)
  await t.click(s.topbar.master)
}

fixture('rule_display/normal/win_lose').beforeEach(setup).afterEach(closeWindows)

test('default', async t => {
  await t
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('勝抜7ポイント以上')
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('失格3バツ以上')
})

test('change win setting', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.winPoint.value, '5', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('勝抜5ポイント以上')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.winPlayers, '2', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('勝抜5ポイント以上2人')
    .click(s.topbar.rule)
    .click(s.dialog.rule.normal.winPoint.active)
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('勝抜2人')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.winPlayers, '0', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).notContains('勝抜')
})

test('change lose setting', async t => {
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.loseBatsu.value, '2', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('失格2バツ以上')
    .click(s.topbar.rule)
    .click(s.dialog.rule.normal.losePoint.active)
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('失格0ポイント以下2バツ以上')
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.losePoint.value, '-2', { replace: true })
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('失格-2ポイント以下2バツ以上')
    .click(s.topbar.rule)
    .click(s.dialog.rule.normal.loseBatsu.active)
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).contains('失格-2ポイント以下')
    .click(s.topbar.rule)
    .click(s.dialog.rule.normal.losePoint.active)
    .click(s.dialog.rule.submit)
    .expect(s.ruleDisplay.normal.winLose.innerText).notContains('失格')
})
