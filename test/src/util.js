module.exports = {
  closePage: async page => {
    await page.close();
    await page.waitForTimeout(100);
  },
  gotoYqui: async (...pages) => {
    for (page of pages) {
      await page.goto(YQUI_URL);
    }
  },
  enterRoom: async (page, room, name) => {
    await page.click(`.rooms-table tbody tr:nth-child(${room}) .enter-room-button button`);
    await page.type('.enter-room .name input', name);
    await page.click('.enter-room-dialog .submit');
    await page.waitForTimeout(100);
  },
  leaveRoom: async page => {
    await page.click('header .leave-room-button');
    await page.click('.leave-room-dialog .submit');
    await page.waitForTimeout(100);
  }
};
