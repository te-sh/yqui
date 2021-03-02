import { selectors as s, mui } from '../common/selectors'
import { createWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
  await t.click(s.topbar.masterButton)
}

fixture('change_status/player_to_master').beforeEach(setup)

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

test('actions, subactions, chat message, master display', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.actions.master.filterVisible().exists).ok()
    .expect(s.subactions.master.filterVisible().exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが司会席に移動しました')
    .expect(s.masterDisplay.name.innerText).eql('ゆーた0')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.actions.player.filterVisible().exists).ok()
    .expect(s.subactions.player.filterVisible().exists).ok()
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0さんが司会席に移動しました')
    .expect(s.masterDisplay.name.innerText).eql('ゆーた0')
})

test('tobar buttons', async t => {
  await t.switchToWindow(t.ctx.w0)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.assignButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.ruleButton.hasClass(mui.iconButton.inherit)).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.masterButton.hasClass(mui.iconButton.secondary)).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).ok()
  await t.switchToWindow(t.ctx.w1)
    .expect(s.topbar.assignButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.ruleButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.masterButton.hasAttribute('disabled')).ok()
    .expect(s.topbar.observerButton.hasAttribute('disabled')).notOk()
    .expect(s.topbar.observerButton.hasClass(mui.iconButton.inherit)).ok()
})
