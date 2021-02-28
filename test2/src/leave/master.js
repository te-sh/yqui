import { selectors as s, mui } from '../common/selectors'
import { createWindows, enterRoom, leaveRoom } from '../common/helper'

const setup = async t => {
  await createWindows(3)
  await enterRoom(1)
  await enterRoom(2)
}

fixture('leave/master').beforeEach(setup)

test('number of users', async t => {
  const numUsers = s.roomRow0.find('.num-users')

  await t.expect(numUsers.innerText).eql('2')

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.masterButton)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(numUsers.innerText).eql('1')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.masterButton)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(numUsers.innerText).eql('0')
})

test('player box', async t => {
  const players0 = s.teams.nth(0).find('.players .player')

  await enterRoom(0)
  await t
    .expect(s.teams.count).eql(1)
    .expect(players0.count).eql(3)
    .expect(players0.nth(0).find('.player-name').innerText).eql('ゆーた1')
    .expect(players0.nth(1).find('.player-name').innerText).eql('ゆーた2')
    .expect(players0.nth(2).find('.player-name').innerText).eql('ゆーた0')

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.masterButton)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.teams.count).eql(1)
    .expect(players0.count).eql(2)
    .expect(players0.nth(0).find('.player-name').innerText).eql('ゆーた2')
    .expect(players0.nth(1).find('.player-name').innerText).eql('ゆーた0')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.masterButton)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.teams.count).eql(1)
    .expect(players0.count).eql(1)
    .expect(players0.nth(0).find('.player-name').innerText).eql('ゆーた0')
})

test('chat message', async t => {
  await enterRoom(0)

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.masterButton)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1さん (司会) が退室しました')

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.masterButton)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた2さん (司会) が退室しました')
})

test('tobar buttons', async t => {
  await enterRoom(0)
  await t
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()

  await t.switchToWindow(t.ctx.w1)
    .click(s.topbar.masterButton)
  await leaveRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()

  await t.switchToWindow(t.ctx.w2)
    .click(s.topbar.masterButton)
  await t.closeWindow(t.ctx.w2)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()
})
