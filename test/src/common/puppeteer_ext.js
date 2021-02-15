const css = require('./css')

// add functions to Browser

class YquiBrowser {
  constructor (browser, timeout, yquiUrl) {
    this.browser = browser
    this.timeout = timeout
    this.yquiUrl = yquiUrl
    this.pages = []
  }

  async initPages (numPlayers) {
    this.numPlayers = numPlayers
    for (let i = 0; i < numPlayers; ++i) {
      const page = await this.newPage(i)
      this.pages.push(page)
    }
  }

  async newPage (index) {
    const page = await this.browser.newPage()
    page.yq = new YquiPage(page, this.timeout, this.yquiUrl, index)
    await page.yq.gotoTop()
    return page
  }

  async gotoTop () {
    for (const page of this.pages) {
      await page.yq.gotoTop()
    }
  }

  async reopen (page) {
    if (!page.isClosed()) {
      page.close()
    }
    const index = page.yq.index
    const newPage = await this.newPage(index)
    this.pages[index] = newPage
    return newPage
  }
}

class YquiPage {
  constructor (page, timeout, yquiUrl, index) {
    this.page = page
    this.timeout = timeout
    this.yquiUrl = yquiUrl
    this.index = index
  }

  async $t (selector) {
    return !!(await this.page.$(selector))
  }

  async $ (selector) {
    const el = await this.page.$(selector)
    el.yq = new YquiElementHandle(el, this.timeout)
    return el
  }

  async $$ (selector) {
    const list = await this.page.$$(selector)
    for (const el of list) {
      el.yq = new YquiElementHandle(el, this.timeout)
    }
    return list
  }

  async textContent (selector) {
    return await this.page.$eval(selector, el => el.textContent)
  }

  async waitForTimeout (times = 1) {
    await this.page.waitForTimeout(this.timeout * times)
  }

  async screenshot (filename) {
    await this.page.screenshot({ path: `${ROOT_DIR}/screenshots/${filename}` })
  }

  async close () {
    await this.page.close()
    await this.waitForTimeout()
  }

  async gotoTop () {
    if (this.page.url() !== this.yquiUrl) {
      await this.page.goto(this.yquiUrl)
      await this.waitForTimeout()
    }
  }

  async fillText (selector, text) {
    const el = await this.page.$(selector)
    await el.click({ clickCount: 3 })
    await el.press('Backspace')
    await el.type(text)
  }

  async enterRoom (options = {}) {
    const roomNo = options.roomNo !== undefined ? options.roomNo : 1
    const name = options.name !== undefined ? options.name : `ゆーた${this.index}`

    await this.page.click(`.rooms-table tbody tr:nth-child(${roomNo}) .enter-room-button button`)
    await this.waitForTimeout()

    await this.page.yq.fillText('.enter-room .name input', name)

    const observerCheck = await this.$('.enter-room .observer-check')
    if (options.observer ^ await observerCheck.yq.$t(css.mui.checkbox.checked)) {
      await observerCheck.click()
    }

    const chatAnswerCheck = await this.$('.enter-room .chat-answer-check')
    if (options.chatAnswer ^ await chatAnswerCheck.yq.$t(css.mui.checkbox.checked)) {
      await chatAnswerCheck.click()
    }

    await this.page.click('.enter-room-dialog .submit')
    await this.waitForTimeout()
  }

  async leaveRoom () {
    await this.page.click(css.selector.topbar.leaveBtn)
    await this.page.click('.leave-room-dialog .submit')
    await this.waitForTimeout()
  }

  async clickToggleMasterButton () {
    await this.page.click(css.selector.topbar.masterBtn)
    await this.waitForTimeout()
  }

  async clickToggleObserverButton () {
    await this.page.click(css.selector.topbar.observerBtn)
    await this.waitForTimeout()
  }

  async answerCorrect (masterPage, options = {}) {
    const repeat = options.repeat !== undefined ? options.repeat : 1
    for (let i = 0; i < repeat; ++i) {
      await this.clickAnswerButton()
      await masterPage.yq.clickCorrectButton()
    }
  }

  async answerWrong (masterPage, options = {}) {
    const repeat = options.repeat !== undefined ? options.repeat : 1
    for (let i = 0; i < repeat; ++i) {
      await this.clickAnswerButton()
      await masterPage.yq.clickWrongButton()
    }
  }

  async clickAnswerButton () {
    await this.page.click('.room .actions .answer-button')
    await this.waitForTimeout()
  }

  async clickCorrectButton () {
    await this.page.click('.room .actions .correct-button')
    await this.waitForTimeout()
  }

  async clickWrongButton () {
    await this.page.click('.room .actions .wrong-button')
    await this.waitForTimeout()
  }

  async clickAllClearButton () {
    await this.page.click('.room .subactions .all-clear-button')
    await this.waitForTimeout()
  }
}

class YquiElementHandle {
  constructor (el, timeout) {
    this.el = el
    this.timeout = timeout
  }

  async $t (selector) {
    return !!(await this.el.$(selector))
  }

  async textContent (selector) {
    return await this.el.$eval(selector, el => el.textContent)
  }
}

module.exports = YquiBrowser
