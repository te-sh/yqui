describe('rooms', () => {
  test('rooms page', async () => {
    const s = 'header .app-name'

    for (const page of browser.yq.pages) {
      expect(await page.$eval(s, el => el.textContent)).toBe('Yqui')
    }
  })
})
