const util = require('./util');

describe('score backup', () => {
  beforeEach(async () => {
    await util.gotoYqui(...pages);
    await util.enterRoom(p0, 1, 'ゆーた0');
    await util.clickToggleMasterButton(p0);
    await util.enterRoom(p1, 1, 'ゆーた1');
    await util.clickAnswerButton(p1);
    await util.clickCorrectButton(p0);
    await util.clickAnswerButton(p1);
    await util.clickCorrectButton(p0);
    await util.clickAnswerButton(p1);
    await util.clickWrongButton(p0);
  });

  test('leave and join', async () => {
    const s = '.room .team .player-container';
    let list;

    list = await p0.$$(s);
    expect(await list[0].$eval('.point', el => el.textContent)).toBe('2');
    expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1');
    list = await p1.$$(s);
    expect(await list[0].$eval('.point', el => el.textContent)).toBe('2');
    expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1');

    await util.leaveRoom(p1);
    await util.gotoYqui(p1);
    await util.enterRoom(p1, 1, 'ゆーた1');

    list = await p0.$$(s);
    expect(await list[0].$eval('.point', el => el.textContent)).toBe('2');
    expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1');
    list = await p1.$$(s);
    expect(await list[0].$eval('.point', el => el.textContent)).toBe('2');
    expect(await list[0].$eval('.batsu', el => el.textContent)).toBe('1');
  });
});
