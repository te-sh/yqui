import { selectors as s } from '../common/selectors'
import { createWindows, enterRoom, leaveRoom } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
  await t
    .click(s.topbar.master)
    .click(s.topbar.tag)
    .typeText(s.dialog.tag.title, '部屋タイトル', { replace: true })
    .click(s.dialog.tag.submit)
}

fixture('tag/title').beforeEach(setup)

test('in rooms', async t => {
  await t.switchToWindow(t.ctx.w2)
    .expect(s.rooms.row0.find('.room-title').innerText).eql('部屋タイトル')
})

test('in room', async t => {
  await t.switchToWindow(t.ctx.w0)
    .click(s.topbar.tag)
    .expect(s.dialog.tag.title.find('input').getAttribute('value')).eql('部屋タイトル')
    .expect(s.dialog.tag.title.find('input').hasAttribute('readonly')).notOk()
  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.tag)
    .expect(s.dialog.tag.title.find('input').getAttribute('value')).eql('部屋タイトル')
    .expect(s.dialog.tag.title.find('input').hasAttribute('readonly')).ok()
})

test('change title', async t => {
  await t
    .click(s.topbar.tag)
    .selectText(s.dialog.tag.title.find('input'))
    .pressKey('delete')
    .click(s.dialog.tag.submit)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが部屋情報を更新しました')
    .click(s.topbar.tag)
    .expect(s.dialog.tag.title.find('input').getAttribute('value')).eql('')
    .expect(s.dialog.tag.title.find('input').hasAttribute('readonly')).notOk()
  await t.switchToWindow(t.ctx.w1)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが部屋情報を更新しました')
    .click(s.topbar.tag)
    .expect(s.dialog.tag.title.find('input').getAttribute('value')).eql('')
    .expect(s.dialog.tag.title.find('input').hasAttribute('readonly')).ok()
  await t.switchToWindow(t.ctx.w2)
    .expect(s.rooms.row0.find('.room-title').innerText).eql('')
})

test('leave all', async t => {
  await leaveRoom(0)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w2)
    .expect(s.rooms.row0.find('.room-title').innerText).eql('')
})
