import { selectors as s, mui } from '../common/selectors'
import { createWindows, enterRoom } from '../common/helper'

const setup2 = async t => await createWindows(2)
const setup3 = async t => await createWindows(3)

fixture('join/player').beforeEach(setup2)

test.before(setup3)('numer of users', async t => {
  const numUsers = s.rooms.row0.find('.num-users')

  await t.expect(numUsers.innerText).eql('0')

  await enterRoom(1)
  await t.expect(numUsers.innerText).eql('1')

  await enterRoom(2)
  await t.expect(numUsers.innerText).eql('2')
})

test('player box', async t => {
  await enterRoom(0)
  await t
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(1)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')

  await enterRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた1')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.box.teams.count).eql(1)
    .expect(s.box.players0.count).eql(2)
    .expect(s.box.players0.nth(0).find('.player-name').innerText).eql('ゆーた0')
    .expect(s.box.players0.nth(1).find('.player-name').innerText).eql('ゆーた1')
})

test('actions, subactions, chat message', async t => {
  await enterRoom(0)
  await t
    .expect(s.actions.player.filterVisible().exists).ok()
    .expect(s.subactions.player.filterVisible().exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが入室しました')

  await enterRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.actions.player.filterVisible().exists).ok()
    .expect(s.subactions.player.filterVisible().exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1さんが入室しました')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.actions.player.filterVisible().exists).ok()
    .expect(s.subactions.player.filterVisible().exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1さんが入室しました')
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

  await enterRoom(1)
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()
  await t.switchToWindow(t.ctx.w1)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()
})
