const puppeteer = require('puppeteer');

const YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/';
const ROOT_DIR = '/home/node/test';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(YQUI_URL);
  await page.screenshot({ path: `${ROOT_DIR}/screenshots/example.png` });
  await browser.close();
})();
