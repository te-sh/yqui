import { selectors as s, mui } from './common/selectors'
import { createWindows, enterRoom, leaveRoom } from './common/helper'

const setup = async t => await createWindows(1)

fixture('enter_room').beforeEach(setup)

test('name', async t => {
  await enterRoom(0)
  await t
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button button'))
    .expect(s.dialog.enterRoom.name.getAttribute('value')).eql('ゆーた0')
})

test('not observer', async t => {
  await enterRoom(0)
  await t
    .expect(s.actions.player.exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button button'))
    .expect(s.dialog.enterRoom.observer.hasClass(mui.checkbox.checked)).notOk()
})

test('observer', async t => {
  await enterRoom(0)
  await t
    .expect(s.actions.observer.exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button button'))
    .expect(s.dialog.enterRoom.observer.hasClass(mui.checkbox.checked)).notOk()
})

test('not chat answer', async t => {
  await enterRoom(0, { chatAnswer: true })
  await t
    .expect(s.box.players0.nth(0).find('.player-name .chat-mark').exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button button'))
    .expect(s.dialog.enterRoom.chatAnswer.hasClass(mui.checkbox.checked)).ok()
})

test('chat answer', async t => {
  await enterRoom(0, { chatAnswer: true })
  await t
    .expect(s.box.players0.nth(0).find('.player-name .chat-mark').exists).ok()

  await leaveRoom(0)
  await t
    .click(s.rooms.row0.find('.enter-room-button button'))
    .expect(s.dialog.enterRoom.chatAnswer.hasClass(mui.checkbox.checked)).notOk()
})
