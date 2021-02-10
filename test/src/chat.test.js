const util = require('./util');

describe('chat', () => {
  beforeEach(async () => {
    await util.gotoYqui(mpage, ...ppages);
    await util.enterRoom(mpage, 1, 'ゆーた');
  });

  test('chat', async () => {
    const message = '.room .messages .message:last-child';

    await util.enterRoom(ppages[0], 1, 'ゆーた1');

    await ppages[0].type('.room .chat .chat-text input', 'おはようございます');
    await ppages[0].click('.room .chat .send-chat-button')
    await ppages[0].waitForTimeout(100);
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた1 > おはようございます');
    expect(await ppages[0].$eval(message, el => el.textContent)).toBe('ゆーた1 > おはようございます');

    await mpage.type('.room .chat .chat-text input', 'こんにちは');
    await mpage.click('.room .chat .send-chat-button')
    await mpage.waitForTimeout(100);
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた > こんにちは');
    expect(await ppages[0].$eval(message, el => el.textContent)).toBe('ゆーた > こんにちは');
  });

  test('enter room', async () => {
    const message = '.room .messages .message:last-child';

    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーたさんが入室しました');

    await util.enterRoom(ppages[0], 1, 'ゆーた1');
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
    expect(await ppages[0].$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
  });

  test('leave room', async () => {
    const message = '.room .messages .message:last-child';

    await util.enterRoom(ppages[0], 1, 'ゆーた1');
    await util.enterRoom(ppages[1], 1, 'ゆーた2');

    await util.leaveRoom(ppages[0]);
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた1さんが退室しました');

    await util.closePage(ppages[1]);
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた2さんが退室しました');
  });
});
