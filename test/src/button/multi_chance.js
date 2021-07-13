import { selectors as s } from '../common/selectors'
import { createWindows, closeWindows, enterRoom } from '../common/helper'

const setup = async t => {
  await createWindows(4)
  await enterRoom(0)
  await enterRoom(1)
  await enterRoom(2)
  await enterRoom(3)
  await t
    .click(s.topbar.rule)
    .typeText(s.dialog.rule.normal.rightNum, '2', { replace: true })
    .click(s.dialog.rule.submit)
}

fixture('button/multi_chance').beforeEach(setup).afterEach(closeWindows)

test('1 player pushed', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).ok()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
})

test('1 player pushed and correct', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .click(s.actions.master.correct)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.subactions.visible.alert.exists).notOk()
})

test('1 player pushed and wrong', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .click(s.actions.master.wrong)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.subactions.visible.alert.exists).ok()
})

test('1 player pushed and wrong and 1 player pushed', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .click(s.actions.master.wrong)
    .switchToWindow(t.ctx.w2)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('2')
    .expect(s.box.players0.nth(1).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).ok()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.subactions.visible.alert.exists).notOk()
})

test('2 players pushed', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w2)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).ok()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('2')
    .expect(s.box.players0.nth(1).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
})

test('2 player pushed and correct', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w2)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .click(s.actions.master.correct)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.subactions.visible.alert.exists).notOk()
})

test('2 player pushed and wrong', async t => {
  await t
    .switchToWindow(t.ctx.w1)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w2)
    .click(s.actions.player.answer)
    .switchToWindow(t.ctx.w0)
    .click(s.actions.master.wrong)
    .expect(s.box.players0.nth(0).find('.push-order-content').innerText).eql('1')
    .expect(s.box.players0.nth(0).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(0).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.box.players0.nth(1).find('.push-order-content').innerText).eql('2')
    .expect(s.box.players0.nth(1).find('.push-order-content').hasClass('has-right')).ok()
    .expect(s.box.players0.nth(1).find('.player-box').hasClass('my-turn')).ok()
    .expect(s.box.players0.nth(2).find('.push-order-content').innerText).eql('')
    .expect(s.box.players0.nth(2).find('.player-box').hasClass('my-turn')).notOk()
    .expect(s.subactions.visible.alert.exists).notOk()
})
