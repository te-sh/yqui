module.exports = {
  newPage: async index => {
    if (!pages[index].isClosed()) {
      await pages[index].close();
    }
    let page = await browser.newPage();
    pages[index] = page;
    return page;
  },
  closePage: async page => {
    await page.close();
    await page.waitForTimeout(TIMEOUT);
  },
  gotoYqui: async (...pages) => {
    for (page of pages) {
      await page.goto(YQUI_URL);
    }
  },
  enterRoom: async (page, roomNo, name, options = {}) => {
    await page.click(`.rooms-table tbody tr:nth-child(${roomNo}) .enter-room-button button`);
    await page.type('.enter-room .name input', name);
    if (options.observer) {
      await page.click('.enter-room .observe');
    }
    await page.click('.enter-room-dialog .submit');
    await page.waitForTimeout(TIMEOUT);
  },
  leaveRoom: async page => {
    await page.click('header .leave-room-button');
    await page.click('.leave-room-dialog .submit');
    await page.waitForTimeout(TIMEOUT);
  },
  clickToggleMasterButton: async page => {
    await page.click('header .toggle-master-button');
    await page.waitForTimeout(TIMEOUT);
  },
  clickToggleObserveButton: async page => {
    await page.click('header .toggle-observe-button');
    await page.waitForTimeout(TIMEOUT);
  }
};
