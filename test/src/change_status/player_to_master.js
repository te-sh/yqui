import { selectors as s, mui } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t.click(s.topbar.master)
}

fixture('change_status/player_to_master').beforeEach(setup).afterEach(closeWindows)

test('player box', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
})

test('actions, subactions, chat message, room info', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.actions.visible.master.exists).ok()
    .expect(s.subactions.visible.master.exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが司会席に移動しました')
    .expect(s.roomInfo.masterName.innerText).eql('ゆーた0')
    .expect(s.roomInfo.numPlayers.innerText).eql('1人')
    .expect(s.roomInfo.numObservers.innerText).eql('0人')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.actions.visible.player.exists).ok()
    .expect(s.subactions.visible.player.exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが司会席に移動しました')
    .expect(s.roomInfo.masterName.innerText).eql('ゆーた0')
    .expect(s.roomInfo.numPlayers.innerText).eql('1人')
    .expect(s.roomInfo.numObservers.innerText).eql('0人')
})

test('tobar buttons', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.rule.hasAttribute('disabled')).notOk()
    .expect(s.topbar.rule.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.secondary)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).ok()
  await t.switchToWindow(t.ctx.w1)
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()
})
