import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(5)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await t
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.team)
    .click(s.dialog.rule.team.active)
    .click(s.dialog.rule.submit)
    .click(s.subactions.master.assign)
    .typeText(s.subactions.assign.numTeams, '2', { replace: true })
    .click(s.subactions.assign.changeNumTeams)
    .dragToElement(s.box.players0.nth(0), s.box.team1)
    .click(s.actions.assign.endAssign)
    .click(s.subactions.master.assign)
}

fixture('assign/two_teams/join').beforeEach(setup).afterEach(closeWindows)

test('join player', async t => {
  await enterRoom(4)
  await t
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた4')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(1)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql('ゆーた3')
})

test('join observer', async t => {
  await enterRoom(4, { observer: true })
  await t
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql('ゆーた3')
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql('ゆーた4')
})
