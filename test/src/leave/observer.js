import { selectors as s, mui } from '../common/selectors'
import { createWindows, closeWindows, enterRoom, leaveRoom } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(1)
  await enterRoom(2)
}

fixture('leave/observer').beforeEach(setup).afterEach(closeWindows)

test('number of users', async t => {
  const numUsers = s.rooms.row0.find('.num-users')

  await t.expect(numUsers.innerText).eql('2')

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.observer)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(numUsers.innerText).eql('1')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.observer)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(numUsers.innerText).eql('0')
})

test('player box', async t => {
  await enterRoom(0)
  await t
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(3)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(2).find('.player-name').innerText).eql('ゆーた0')

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.observer)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた0')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.observer)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')
})

test('chat message, room info', async t => {
  await enterRoom(0)

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.observer)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1さん (観戦) が退室しました')
    .expect(s.roomInfo.numPlayers.innerText).eql('2人')
    .expect(s.roomInfo.numObservers.innerText).eql('0人')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.observer)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた2さん (観戦) が退室しました')
    .expect(s.roomInfo.numPlayers.innerText).eql('1人')
    .expect(s.roomInfo.numObservers.innerText).eql('0人')
})

test('tobar buttons', async t => {
  await enterRoom(0)
  await t
    .expect(s.topbar.assign.hasAttribute('disabled')).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.observer)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assign.hasAttribute('disabled')).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.observer)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assign.hasAttribute('disabled')).ok()
    .expect(s.topbar.rule.hasAttribute('disabled')).ok()
    .expect(s.topbar.master.hasAttribute('disabled')).notOk()
    .expect(s.topbar.master.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observer.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observer.hasClass(mui.iconButton.inherit)).ok()
})
