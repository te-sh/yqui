const util = require('../util');

describe('join/leave', () => {
  describe('leave observer', () => {
    beforeEach(async () => {
      await util.gotoYqui(...pages);
      await util.enterRoom(p1, 1, 'ゆーた1');
      await util.enterRoom(p2, 1, 'ゆーた2');
    });

    afterEach(async () => {
      p2 = await util.newPage(2);
    });

    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users';

      expect(await p0.$eval(s, el => el.textContent)).toBe('2');

      await util.clickToggleObserveButton(p1);
      await util.leaveRoom(p1);
      expect(await p0.$eval(s, el => el.textContent)).toBe('1');

      await util.clickToggleObserveButton(p2);
      await util.closePage(p2);
      expect(await p0.$eval(s, el => el.textContent)).toBe('0');
    });

    test('player box', async () => {
      const s = '.room .team .player-container';
      let list;

      await util.enterRoom(p0, 1, 'ゆーた0');
      list = await p0.$$(s);
      expect(list.length).toBe(3);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた2');
      expect(await list[2].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

      await util.clickToggleObserveButton(p1);
      list = await p0.$$(s);
      expect(list.length).toBe(2);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた2');
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

      await util.leaveRoom(p1);
      list = await p0.$$(s);
      expect(list.length).toBe(2);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた2');
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

      await util.clickToggleObserveButton(p2);
      list = await p0.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

      await util.closePage(p2);
      list = await p0.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
    });

    test('topbar buttons', async () => {
      const sr = 'header .open-rule-button';
      const sm = 'header .toggle-master-button';
      const so = 'header .toggle-observe-button';

      await util.enterRoom(p0, 1, 'ゆーた0');
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.clickToggleObserveButton(p1);
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.leaveRoom(p1);
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.clickToggleObserveButton(p2);
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.closePage(p2);
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
    });

    test('chat message', async () => {
      const s = '.room .messages .message:last-child';

      await util.enterRoom(p0, 1, 'ゆーた0');

      await util.clickToggleObserveButton(p1);
      await util.leaveRoom(p1);
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1さん (観戦) が退室しました');

      await util.clickToggleObserveButton(p2);
      await util.closePage(p2);
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた2さん (観戦) が退室しました');
    });
  });
});
