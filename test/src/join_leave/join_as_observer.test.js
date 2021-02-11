const util = require('../util');

describe('join/leave', () => {
  describe('join as observer', () => {
    beforeEach(async () => {
      await util.gotoYqui(...pages);
    });

    test('room users', async () => {
      const s = '.rooms-table tbody tr:first-child .num-users';

      expect(await p0.$eval(s, el => el.textContent)).toBe('0');

      await util.enterRoom(p1, 1, 'ゆーた1');
      expect(await p0.$eval(s, el => el.textContent)).toBe('1');

      await util.enterRoom(p2, 1, 'ゆーた2', { observer: true });
      expect(await p0.$eval(s, el => el.textContent)).toBe('2');
    });

    test('player box', async () => {
      const s = '.room .team .player-container';
      let list;

      await util.enterRoom(p0, 1, 'ゆーた0');
      list = await p0.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');

      await util.enterRoom(p1, 1, 'ゆーた1', { observer: true });
      list = await p0.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
      list = await p1.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
    });

    test('actions area', async () => {
      const s = '.room .actions';

      await util.enterRoom(p0, 1, 'ゆーた0');
      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null);

      await util.enterRoom(p1, 1, 'ゆーた1', { observer: true });
      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null);
      expect(await p1.$(`${s} .observer-actions:not(.hidden)`)).not.toBe(null);
    });

    test('subactions area', async () => {
      const s = '.room .subactions';

      await util.enterRoom(p0, 1, 'ゆーた0');
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null);

      await util.enterRoom(p1, 1, 'ゆーた1');
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null);
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null);
    });

    test('topbar buttons', async () => {
      const sr = 'header .open-rule-button';
      const sm = 'header .toggle-master-button';
      const so = 'header .toggle-observe-button';

      await util.enterRoom(p0, 1, 'ゆーた0');
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.enterRoom(p1, 1, 'ゆーた1', { observer: true });
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p1.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p1.$(`${sm}.MuiIconButton-colorInherit[disabled]`)).not.toBe(null);
      expect(await p1.$(`${so}.MuiIconButton-colorSecondary:not([disabled])`)).not.toBe(null);
    });

    test('chat message', async () => {
      const s = '.room .messages .message:last-child';

      await util.enterRoom(p0, 1, 'ゆーた0');
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0さんが入室しました');

      await util.enterRoom(p1, 1, 'ゆーた1', { observer: true });
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた1さん (観戦) が入室しました');
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた1さん (観戦) が入室しました');
    });
  });
});
