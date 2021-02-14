const util = require('./common/util')

describe('rooms', () => {
  test('rooms page', async () => {
    const s = 'header .app-name'

    for (const page of pages) {
      expect(await page.$eval(s, el => el.textContent)).toBe('Yqui')
    }
  })
})
