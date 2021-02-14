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

  async close () {
    await this.page.close()
    await this.page.waitForTimeout(this.timeout)
  }

  async gotoTop () {
    if (this.page.url() !== this.yquiUrl) {
      await this.page.goto(this.yquiUrl)
      await this.page.waitForTimeout(this.timeout)
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
    await this.page.yq.fillText('.enter-room .name input', name)
    if (options.observer !== undefined) {
      const observerCheck = await this.page.$('.enter-room .observer-check input')
      if (options.observer !== !!(await observerCheck.$('[checked]'))) {
        await observerCheck.click()
      }
    }
    if (options.chatAnswer) {
      const chatAnswerCheck = await this.page.$('.enter-room .chat-answer-check input')
      if (options.chatAnswer !== !!(await chatAnswerCheck.$('[checked]'))) {
        await chatAnswerCheck.click()
      }
    }
    await this.page.click('.enter-room-dialog .submit')
    await this.page.waitForTimeout(TIMEOUT)
  }
}

module.exports = YquiBrowser
