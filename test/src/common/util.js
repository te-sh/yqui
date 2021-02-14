const css = require('./css')

module.exports = {
  screenshot: async (page, filename) => {
    await page.screenshot({ path: `${ROOT_DIR}/screenshots/${filename}` })
  },
  closePage: async page => {
    await page.close()
    await page.waitForTimeout(TIMEOUT)
  },
  enterRoom: async (page, roomNo, name, options = {}) => {
    await page.click(`.rooms-table tbody tr:nth-child(${roomNo}) .enter-room-button button`)
    const nameInput = await page.$('.enter-room .name input')
    await nameInput.click({ clickCount: 3 })
    await nameInput.press('Backspace')
    await nameInput.type(name)
    if (options.observer !== undefined) {
      const observerCheck = await page.$('.enter-room .observer-check input')
      if (options.observer !== !!(await observerCheck.$('[checked]'))) {
        await observerCheck.click()
      }
    }
    if (options.chatAnswer) {
      const chatAnswerCheck = await page.$('.enter-room .chat-answer-check input')
      if (options.chatAnswer !== !!(await chatAnswerCheck.$('[checked]'))) {
        await chatAnswerCheck.click()
      }
    }
    await page.click('.enter-room-dialog .submit')
    await page.waitForTimeout(TIMEOUT)
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
