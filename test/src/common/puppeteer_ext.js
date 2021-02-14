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

  async reopen (page) {
    if (!page.isClosed()) {
      page.close()
    }
    const index = this.pages.indexOf(page)
    const newPage = this.newPage()
    this.pages[index] = newPage
    return page
  }

  async newPage () {
    const page = await this.browser.newPage()
    page.yq = new YquiPage(page, this.timeout, this.yquiUrl)
    await page.yq.gotoTop()
    return page
  }
}

class YquiPage {
  constructor (page, timeout, yquiUrl) {
    this.page = page
    this.timeout = timeout
    this.yquiUrl = yquiUrl
  }

  async gotoTop () {
    await this.page.goto(this.yquiUrl)
    await this.page.waitForTimeout(this.timeout)
  }
}

module.exports = YquiBrowser
