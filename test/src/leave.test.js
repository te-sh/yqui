const util = require('./util');

describe('rooms', () => {
  beforeEach(async () => {
    await util.gotoYqui(...pages);
    await util.enterRoom(p1, 1, 'ゆーた1');
    await util.enterRoom(p2, 1, 'ゆーた2');
  });

  afterEach(async () => {
    p2 = await util.newPage(2);
  });

  test('room users', async () => {
    const numUsers = '.rooms-table tbody tr:first-child .num-users';

    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('2');

    await util.leaveRoom(p1);
    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('1');

    await util.closePage(p2);
    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('0');
  });

  test('chat message', async () => {
    const message = '.room .messages .message:last-child';

    await util.enterRoom(p0, 1, 'ゆーた0');

    await util.leaveRoom(p1);
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた1さんが退室しました');

    await util.closePage(p2);
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた2さんが退室しました');
  });
});
