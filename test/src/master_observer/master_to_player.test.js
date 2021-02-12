const util = require('../util');

describe('master/observer', () => {
  describe('move from master to player', () => {
    beforeEach(async () => {
      await util.gotoYqui(...pages);
      await util.enterRoom(p0, 1, 'ゆーた0');
      await util.enterRoom(p1, 1, 'ゆーた1');
      await util.clickToggleMasterButton(p0);
    });

    test('player box', async () => {
      const s = '.room .team .player-container';
      let list;

      list = await p0.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
      list = await p1.$$(s);
      expect(list.length).toBe(1);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');

      await util.clickToggleMasterButton(p0);
      list = await p0.$$(s);
      expect(list.length).toBe(2);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
      list = await p1.$$(s);
      expect(list.length).toBe(2);
      expect(await list[0].$eval('.player-name', el => el.textContent)).toBe('ゆーた1');
      expect(await list[1].$eval('.player-name', el => el.textContent)).toBe('ゆーた0');
    });

    test('actions area', async () => {
      const s = '.room .actions';

      expect(await p0.$(`${s} .master-actions`)).not.toBe(null);
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null);

      await util.clickToggleMasterButton(p0);
      expect(await p0.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null);
      expect(await p1.$(`${s} .player-actions:not(.hidden)`)).not.toBe(null);
    });

    test('subactions area', async () => {
      const s = '.room .subactions';

      expect(await p0.$(`${s} .master-subactions`)).not.toBe(null);
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null);

      await util.clickToggleMasterButton(p0);
      expect(await p0.$(`${s} .player-subactions`)).not.toBe(null);
      expect(await p1.$(`${s} .player-subactions`)).not.toBe(null);
    });

    test('topbar buttons', async () => {
      const sr = 'header .open-rule-button';
      const sm = 'header .toggle-master-button';
      const so = 'header .toggle-observe-button';

      expect(await p0.$(`${sr}:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorSecondary:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${so}.MuiIconButton-colorInherit[disabled]`)).not.toBe(null);
      expect(await p1.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p1.$(`${sm}.MuiIconButton-colorInherit[disabled]`)).not.toBe(null);
      expect(await p1.$(`${so}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);

      await util.clickToggleMasterButton(p0);
      expect(await p0.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p0.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p0.$(`${so}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p1.$(`${sr}[disabled]`)).not.toBe(null);
      expect(await p1.$(`${sm}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
      expect(await p1.$(`${so}.MuiIconButton-colorInherit:not([disabled])`)).not.toBe(null);
    });

    test('master display', async () => {
      const s = '.room .master-display .master-name';

      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0');
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0');

      await util.clickToggleMasterButton(p0);
      expect(await p0.$eval(s, el => el.textContent)).toBe('-');
      expect(await p1.$eval(s, el => el.textContent)).toBe('-');
    });

    test('chat message', async () => {
      const s = '.room .messages .message:last-child .message-body';

      await util.clickToggleMasterButton(p0);
      expect(await p0.$eval(s, el => el.textContent)).toBe('ゆーた0さんが解答席に移動しました');
      expect(await p1.$eval(s, el => el.textContent)).toBe('ゆーた0さんが解答席に移動しました');
    });
  });
});
