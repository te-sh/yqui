const util = require('./util');

describe('chat', () => {
  beforeEach(async () => {
    await util.gotoYqui(mpage, ...ppages);
    await util.enterRoom(mpage, 1, 'ゆーた');
  });

  test('enter room', async () => {
    const message = '.room .messages .message:last-child';

    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーたさんが入室しました');

    await util.enterRoom(ppages[0], 1, 'ゆーた1');
    expect(await mpage.$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
    expect(await ppages[0].$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
  });
});
