const puppeteer = require('puppeteer');

const ROOT_DIR = '/home/node/test';
const YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/';
const PLAYERS = 2;

let browser;
let mpage;
let ppages = [];

beforeAll(async () => {
  browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  console.log(await browser.version());

  mpage = await browser.newPage();
  for (let i = 0; i < PLAYERS; ++i) {
    const ppage = await browser.newPage();
    ppages.push(ppage);
  }
});

afterAll(async done => {
  browser.close();
  done();
});

describe('rooms', () => {
  beforeEach(async () => {
    await mpage.goto(YQUI_URL);
    for (ppage of ppages) {
      await ppage.goto(YQUI_URL);
    }
  });

  test('show rooms page', async () => {
    expect(await mpage.$eval('#root h6', el => el.textContent)).toBe('Yqui');
    for (ppage of ppages) {
      expect(await ppage.$eval('#root h6', el => el.textContent)).toBe('Yqui');
    }
  });
});
