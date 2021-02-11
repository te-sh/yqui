const util = require('./util');

describe('rooms', () => {
  beforeEach(async () => {
    await util.gotoYqui(...pages);
  });

  test('room users', async () => {
    const numUsers = '.rooms-table tbody tr:first-child .num-users';

    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('0');

    await util.enterRoom(p1, 1, 'ゆーた1');
    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('1');

    await util.enterRoom(p2, 1, 'ゆーた2');
    expect(await p0.$eval(numUsers, el => el.textContent)).toBe('2');
  });

  test('chat message', async () => {
    const message = '.room .messages .message:last-child';

    await util.enterRoom(p0, 1, 'ゆーた0');
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた0さんが入室しました');

    await util.enterRoom(p1, 1, 'ゆーた1');
    expect(await p0.$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
    expect(await p1.$eval(message, el => el.textContent)).toBe('ゆーた1さんが入室しました');
  });
});
