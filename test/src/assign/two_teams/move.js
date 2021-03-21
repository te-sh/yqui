import { selectors as s } from '../../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(7)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await enterRoom(4, { observer: true })
  await enterRoom(5)
  await enterRoom(6)
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
    .dragToElement(s.box.players0.nth(1), s.box.team1)
    .click(s.actions.assign.endAssign)
    .click(s.topbar.assign)
}

fixture('assign/two_teams/move').beforeEach(setup).afterEach(closeWindows)

test('in player area', async t => {
  const x0 = Math.trunc((await s.box.players0.nth(0).boundingClientRect).left)
  const x1 = Math.trunc((await s.box.players0.nth(1).boundingClientRect).left)
  const player0 = await s.box.players2.nth(0).find('.player-name').innerText
  const player1 = await s.box.players2.nth(1).find('.player-name').innerText
  await t
    .drag(s.box.players0.nth(0), x1 - x0 + 5, 0)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた2')
    .drag(s.box.players1.nth(1), x0 - x1 - 5, 0)
    .expect(s.box.players1.count).eql(2)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
})

test('to observer area', async t => {
  const player0 = await s.box.players2.nth(0).find('.player-name').innerText
  const player1 = await s.box.players2.nth(1).find('.player-name').innerText
  await t
    .dragToElement(s.box.players0.nth(0), s.box.team2.find('.players'))
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players1.count).eql(2)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players2.count).eql(3)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
    .expect(s.box.players2.nth(2).find('.player-name').innerText).eql('ゆーた2')
    .dragToElement(s.box.players1.nth(1), s.box.team2.find('.players'))
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players2.count).eql(4)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
    .expect(s.box.players2.nth(2).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players2.nth(3).find('.player-name').innerText).eql('ゆーた5')
})

test('to player area', async t => {
  const player0 = await s.box.players2.nth(0).find('.player-name').innerText
  const player1 = await s.box.players2.nth(1).find('.player-name').innerText
  await t
    .dragToElement(s.box.players2.nth(1), s.box.team0.find('.players'))
    .expect(s.box.players0.count).eql(3)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players0.nth(2).find('.player-name').innerText).eql(player1)
    .expect(s.box.players1.count).eql(2)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players2.count).eql(1)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .dragToElement(s.box.players2.nth(0), s.box.team1.find('.players'))
    .expect(s.box.players0.count).eql(3)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players0.nth(2).find('.player-name').innerText).eql(player1)
    .expect(s.box.players1.count).eql(3)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players1.nth(2).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.count).eql(0)
})

test('inter player area', async t => {
  const player0 = await s.box.players2.nth(0).find('.player-name').innerText
  const player1 = await s.box.players2.nth(1).find('.player-name').innerText
  await t
    .dragToElement(s.box.players0.nth(1), s.box.team1.find('.players'))
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players1.count).eql(3)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players1.nth(2).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
    .dragToElement(s.box.players1.nth(1), s.box.team0.find('.players'))
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた5')
    .expect(s.box.players1.count).eql(2)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players1.nth(1).find('.player-name').innerText).eql('ゆーた6')
    .expect(s.box.players2.count).eql(2)
    .expect(s.box.players2.nth(0).find('.player-name').innerText).eql(player0)
    .expect(s.box.players2.nth(1).find('.player-name').innerText).eql(player1)
})
