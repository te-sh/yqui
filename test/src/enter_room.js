import { selectors as s, mui } from './common/selectors'
import { createWindows, closeWindows, enterRoom, leaveRoom } from './common/helper'

const setup = async t => await createWindows(2)

fixture('enter_room').beforeEach(setup).afterEach(closeWindows)

test('name', async t => {
  await enterRoom(1)
  await enterRoom(0)
  await t
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.name.find('input').getAttribute('value')).eql('ゆーた0')
})

test('first user', async t => {
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.observer.find('span').hasClass(mui.disabled)).ok()
})

test('not first user', async t => {
  await enterRoom(1)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.observer.find('span').hasClass(mui.disabled)).notOk()
})

test('not observer', async t => {
  await enterRoom(1)
  await enterRoom(0)
  await t
    .expect(s.actions.visible.player.exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.observer.find('span').hasClass(mui.checked)).notOk()
})

test('observer', async t => {
  await enterRoom(1)
  await enterRoom(0, { observer: true })
  await t
    .expect(s.actions.visible.observer.exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.observer.find('span').hasClass(mui.checked)).notOk()
})

test('not chat answer', async t => {
  await enterRoom(1)
  await enterRoom(0)
  await t
    .expect(s.box.players0.nth(0).find('.player-name .chat-mark').innerText).eql('')

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.chatAnswer.find('span').hasClass(mui.checked)).notOk()
})

test('chat answer', async t => {
  await enterRoom(1)
  await enterRoom(0, { chatAnswer: true })
  await t
    .expect(s.box.players0.nth(0).find('.player-name .chat-mark').innerText).eql('©')

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.chatAnswer.find('span').hasClass(mui.checked)).ok()

  await enterRoom(0, { chatAnswer: false }) // reset chat answer
})

test('no password', async t => {
  await t
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.password.find('input').hasClass(mui.disabled)).ok()
    .typeText(s.dialog.enterRoom.name, 'ゆーた0', { replace: true })
    .click(s.dialog.enterRoom.submit)
    .expect(s.topbar.roomName.innerText).eql('Room1')
})

test('enter with correct password', async t => {
  await enterRoom(1)
  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.tag)
    .typeText(s.dialog.tag.password, 'パスワード', { replace: true })
    .click(s.dialog.tag.submit)
  await t.switchToWindow(t.ctx.w0)
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.password.find('input').hasClass(mui.disabled)).notOk()
    .typeText(s.dialog.enterRoom.name, 'ゆーた0', { replace: true })
    .typeText(s.dialog.enterRoom.password, 'パスワード', { replace: true })
    .click(s.dialog.enterRoom.submit)
    .expect(s.topbar.roomName.innerText).eql('Room1')
})

test('enter with wrong password', async t => {
  await enterRoom(1)
  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.tag)
    .typeText(s.dialog.tag.password, 'パスワード', { replace: true })
    .click(s.dialog.tag.submit)
  await t.switchToWindow(t.ctx.w0)
    .click(s.rooms.row0.find('.enter-room-button'))
    .expect(s.dialog.enterRoom.password.find('input').hasClass(mui.disabled)).notOk()
    .typeText(s.dialog.enterRoom.name, 'ゆーた0', { replace: true })
    .typeText(s.dialog.enterRoom.password, 'xxx', { replace: true })
    .click(s.dialog.enterRoom.submit)
    .expect(s.dialog.alert.message.innerText).eql('入室できませんでした')
})
