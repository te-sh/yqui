import { selectors as s } from '../../common/selectors'
import { createWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await t
    .click(s.topbar.masterButton)
    .click(s.topbar.assignButton)
}

fixture('assign/inactive/begin').beforeEach(setup)

test('player box', async t => {
  await t
    .expect(s.box.teams.count).eql(2)
    .expect(s.box.team0.find('.team-title').innerText).eql('解答席')
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.team1.find('.team-title').innerText).eql('観戦席')
    .expect(s.box.players1.count).eql(1)
    .expect(s.box.players1.nth(0).find('.player-name').innerText).eql('ゆーた3')
})

test('actions, subactions', async t => {
  await t
    .expect(s.actions.assign.filterVisible().exists).ok()
    .expect(s.actions.assign.find('.team-component').exists).notOk()
    .expect(s.subactions.assign.filterVisible().exists).ok()
})

test('tobar buttons', async t => {
  await t
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).ok()
})
