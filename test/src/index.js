const puppeteer = require('puppeteer');

const ROOT_DIR = '/home/node/test';
const YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/';

let browser;
let page;

describe('Test Yqui', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
    console.log(await browser.version());

    page = await browser.newPage();
    await page.goto(YQUI_URL);
    console.log(await page.title());
  }, 60000);

  afterAll(async done => {
    browser.close();
    done();
  });

  test('show rooms page', async () => {
    const title = await page.$eval('#root h6', el => el.textContent);
    expect(title).toBe('Yqui');
  });
});
