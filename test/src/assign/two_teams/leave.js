import { selectors as s } from '../../common/selectors'
import { createWindows, enterRoom, leaveRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(5)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await enterRoom(4, { observer: true })
  await t
    .click(s.topbar.master)
    .click(s.topbar.rule)
    .click(s.dialog.rule.tab.team)
    .click(s.dialog.rule.team.active)
    .click(s.dialog.rule.submit)
    .click(s.topbar.assign)
    .typeText(s.subactions.assign.numTeams, '2', { replace: true })
    .click(s.subactions.assign.changeNumTeams)
    .dragToElement(s.box.players0.nth(0), s.box.team1)
    .click(s.actions.assign.endAssign)
    .click(s.topbar.assign)
}

fixture('assign/two_teams/leave').beforeEach(setup)

test('leave player', async t => {
  const player0 = await s.box.players2.nth(0).find('.player-name').innerText
  const player1 = await s.box.players2.nth(1).find('.player-name').innerText
  await leaveRoom(1)
  await t
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players1.count).eql(0)
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)

  await t.closeWindow(t.ctx.w2)
    .expect(s.box.players0.count).eql(0)
    .expect(s.box.players1.count).eql(0)
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
})

test('leave observer', async t => {
  await leaveRoom(3)
  await t
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(1)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql('ゆーた4')

  await t.closeWindow(t.ctx.w4)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(0)
})
