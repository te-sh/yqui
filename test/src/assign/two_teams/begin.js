import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
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

fixture('assign/two_teams/begin').beforeEach(setup).afterEach(closeWindows)

test('player box', async t => {
  await t
    .expect(s.box.teams.count).eql(3)
    .expect(s.box.team0.find('.team-title').innerText).eql('チーム1')
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.team1.find('.team-title').innerText).eql('チーム2')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.team2.find('.team-title').innerText).eql('観戦席')
    .expect(s.box.players2.count).eql(1)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql('ゆーた3')
})

test('actions, subactions', async t => {
  await t
    .expect(s.actions.visible.assign.exists).ok()
    .expect(s.subactions.visible.assign.exists).ok()
    .expect(s.subactions.visible.assign.find('.team-component').exists).ok()
    .expect(s.subactions.assign.numTeams.find('input').getAttribute('value')).eql('2')
})

test('tobar buttons', async t => {
  await t
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).ok()
})
