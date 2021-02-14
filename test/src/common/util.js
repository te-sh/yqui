module.exports = {
  screenshot: async (page, filename) => {
    await page.screenshot({ path: `${ROOT_DIR}/screenshots/${filename}` })
  },
  clickAnswerButton: async page => {
    await page.click('.room .actions .answer-button')
    await page.waitForTimeout(TIMEOUT)
  },
  clickCorrectButton: async page => {
    await page.click('.room .actions .correct-button')
    await page.waitForTimeout(TIMEOUT)
  },
  clickWrongButton: async page => {
    await page.click('.room .actions .wrong-button')
    await page.waitForTimeout(TIMEOUT)
  },
  clickAllClearButton: async page => {
    await page.click('.room .subactions .all-clear-button')
    await page.waitForTimeout(TIMEOUT)
  }
}
