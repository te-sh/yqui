const css = require('./css')

module.exports = {
  screenshot: async (page, filename) => {
    await page.screenshot({ path: `${ROOT_DIR}/screenshots/${filename}` })
  },
  leaveRoom: async page => {
    await page.click(css.selector.topbar.leaveBtn)
    await page.click('.leave-room-dialog .submit')
    await page.waitForTimeout(TIMEOUT)
  },
  clickToggleMasterButton: async page => {
    await page.click(css.selector.topbar.masterBtn)
    await page.waitForTimeout(TIMEOUT)
  },
  clickToggleObserveButton: async page => {
    await page.click(css.selector.topbar.observerBtn)
    await page.waitForTimeout(TIMEOUT)
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
