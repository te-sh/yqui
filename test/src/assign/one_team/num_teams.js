import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.team)
    .click(s.dialog.rule.team.active)
    .click(s.dialog.rule.submit)
    .click(s.topbar.assign)
    .typeText(s.subactions.assign.numTeams, '2', { replace: true })
    .click(s.subactions.assign.changeNumTeams)
}

fixture('assign/one_team/num_teams').beforeEach(setup).afterEach(closeWindows)

test('player box', async t => {
  await t
    .expect(s.box.teams.count).eql(3)
    .expect(s.box.team0.find('.team-title').innerText).eql('チーム1')
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.team1.find('.team-title').innerText).eql('チーム2')
    .expect(s.box.players1.count).eql(0)
    .expect(s.box.team2.find('.team-title').innerText).eql('観戦席')
    .expect(s.box.players2.count).eql(1)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql('ゆーた3')
})
