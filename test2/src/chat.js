import { selectors as s } from './common/selectors'
import { createWindows, enterRoom } from './common/helper'

const setup2 = async t => {
  await createWindows(2)
  await enterRoom(0)
  await enterRoom(1)
}

const setup3 = async t => {
  await createWindows(3)
  await enterRoom(0)
  await enterRoom(1)
}

fixture('chat')

test.before(setup2)('send chat', async t => {
  await t
    .typeText(s.chat.chatText, 'おはよう')
    .click(s.chat.sendChatButton)
    .expect(s.chat.chatText.value).eql('')
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0 > おはよう')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた0 > おはよう')

  await t
    .typeText(s.chat.chatText, 'こんにちは')
    .pressKey('enter')
    .expect(s.chat.chatText.value).eql('')
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1 > こんにちは')
  await t.switchToWindow(t.ctx.w1)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた1 > こんにちは')
})

test.before(setup3)('join after chat', async t => {
  await t
    .typeText(s.chat.chatText, 'おはよう')
    .click(s.chat.sendChatButton)
  await t.switchToWindow(t.ctx.w1)
    .typeText(s.chat.chatText, 'こんにちは')
    .click(s.chat.sendChatButton)

  await enterRoom(2)
  await t.switchToWindow(t.ctx.w2)
    .expect(s.chat.messages.count).eql(1)
    .expect(s.chat.lastMessage.innerText).eql('ゆーた2さんが入室しました')
})
