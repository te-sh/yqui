const util = require('./util');

describe('chat', () => {
  beforeEach(async () => {
    await util.gotoYqui(...pages);
    await util.enterRoom(p0, 1, 'ゆーた0');
    await util.enterRoom(p1, 1, 'ゆーた1');
  });

  test('chat', async () => {
    const message = '.room .messages .message:last-child';

    await p1.type('.room .chat .chat-text input', 'おはようございます');
    await p1.click('.room .chat .send-chat-button')
    await p1.waitForTimeout(100);
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた1 > おはようございます');
    expect(await p1.$eval(message, el => el.textContent)).toBe('ゆーた1 > おはようございます');

    await p0.type('.room .chat .chat-text input', 'こんにちは');
    await p0.click('.room .chat .send-chat-button')
    await p0.waitForTimeout(100);
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた0 > こんにちは');
    expect(await p1.$eval(message, el => el.textContent)).toBe('ゆーた0 > こんにちは');
  });
});
