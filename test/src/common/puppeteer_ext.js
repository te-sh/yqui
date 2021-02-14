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
      const page = await this.newPage()
      this.pages.push(page)
    }
  }

  async newPage () {
    const page = await this.browser.newPage()
    page.yq = new YquiPage(page, this.timeout, this.yquiUrl)
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
    const index = this.pages.indexOf(page)
    const newPage = await this.newPage()
    this.pages[index] = newPage
    return newPage
  }
}

class YquiPage {
  constructor (page, timeout, yquiUrl) {
    this.page = page
    this.timeout = timeout
    this.yquiUrl = yquiUrl
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
}

module.exports = YquiBrowser
