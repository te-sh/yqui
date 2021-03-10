import { selectors as s, mui } from '../../common/selectors'
import { createWindows, enterRoom } from '../../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3, { observer: true })
  await t
    .click(s.topbar.master)
    .click(s.topbar.assign)
    .dragToElement(s.box.players0.nth(0), s.box.team1.find('.players'))
    .dragToElement(s.box.players1.nth(0), s.box.team0.find('.players'))
    .click(s.actions.assign.endAssign)
}

fixture('assign/no_team/end').beforeEach(setup)

test('player box', async t => {
  await t
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた3')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた3')
})

test('actions, subactions', async t => {
  await t
    .expect(s.actions.visible.master.exists).ok()
    .expect(s.subactions.visible.master.exists).ok()
})

test('tobar buttons', async t => {
  await t
    .expect(s.topbar.assign.hasAttribute('disabled')).notOk()
    .expect(s.topbar.assign.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).notOk()
    .expect(s.topbar.rule.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.secondary)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).ok()
})