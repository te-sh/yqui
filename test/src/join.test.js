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

  test('player box', async () => {
    const players = '.room .team .player-container';
    let list;

    await util.enterRoom(p0, 1, 'ゆーた0');
    list = await p0.$$(players);
    expect(list.length).toBe(1);
    expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

    await util.enterRoom(p1, 1, 'ゆーた1');
    list = await p0.$$(players);
    expect(list.length).toBe(2);
    expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
    expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
    list = await p1.$$(players);
    expect(list.length).toBe(2);
    expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
    expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
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
