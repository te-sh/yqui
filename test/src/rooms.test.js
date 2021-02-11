const util = require('./util');

describe('rooms', () => {
  beforeEach(async () => {
    await util.gotoYqui(...pages);
  });

  test('rooms page', async () => {
    for (page of pages) {
      expect(await page.$eval('header .app-name', el => el.textContent)).toBe('Yqui');
    }
  });
});
