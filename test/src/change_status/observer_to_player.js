import { selectors as s, mui } from '../common/selectors'
import { createWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.topbar.observer)
    .click(s.topbar.observer)
}

fixture('change_status/observer_to_player').beforeEach(setup)

test('player box', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた0')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた0')
})

test('actions, subactions, chat message', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.actions.visible.player.exists).ok()
    .expect(s.subactions.visible.player.exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが解答席に移動しました')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.actions.visible.player.exists).ok()
    .expect(s.subactions.visible.player.exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが解答席に移動しました')
})

test('tobar buttons', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assign.hasAttribute('disabled')).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()
  await t.switchToWindow(t.ctx.w1)
    .expect(s.topbar.assign.hasAttribute('disabled')).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()
})