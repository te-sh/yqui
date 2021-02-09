const util = require('./util');

describe('rooms', () => {
  beforeEach(async () => {
    await util.gotoYqui(mpage, ...ppages);
  });

  test('rooms page', async () => {
    expect(await mpage.$eval('header .app-name', el => el.textContent)).toBe('Yqui');
    for (ppage of ppages) {
      expect(await ppage.$eval('header .app-name', el => el.textContent)).toBe('Yqui');
    }
  });

  test('room users', async () => {
    const numUsers = '.rooms-table tbody tr:first-child .num-users';

    expect(await mpage.$eval(numUsers, el => el.textContent)).toBe('0');

    await util.enterRoom(ppages[0], 1, 'ゆーた1');
    expect(await mpage.$eval(numUsers, el => el.textContent)).toBe('1');

    await util.enterRoom(ppages[1], 1, 'ゆーた2');
    expect(await mpage.$eval(numUsers, el => el.textContent)).toBe('2');

    await util.leaveRoom(ppages[0]);
    expect(await mpage.$eval(numUsers, el => el.textContent)).toBe('1');

    await util.closePage(ppages[1]);
    expect(await mpage.$eval(numUsers, el => el.textContent)).toBe('0');
  });
});
