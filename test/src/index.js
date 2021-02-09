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

  test('rooms page', async () => {
    expect(await mpage.$eval('header .app-name', el => el.textContent)).toBe('Yqui');
    for (ppage of ppages) {
      expect(await ppage.$eval('header .app-name', el => el.textContent)).toBe('Yqui');
    }
  });

  test('room users', async () => {
    const firstRow = '.rooms-table tbody tr:first-child';

    const enterRoom = async (page, index) => {
      await page.click(`${firstRow} .enter-room-button button`);
      await page.type('.enter-room .name input', `ゆーた${index}`);
      await page.click('.enter-room-dialog .submit');
      await page.waitForTimeout(100);
    }

    const leaveRoom = async page => {
      await page.click('header .leave-room-button');
      await page.click('.leave-room-dialog .submit');
      await page.waitForTimeout(100);
    }

    const closePage = async page => {
      await page.close();
      await page.waitForTimeout(100);
    }

    expect(await mpage.$eval(`${firstRow} .num-users`, el => el.textContent)).toBe('0');

    await enterRoom(ppages[0], 0);
    expect(await mpage.$eval(`${firstRow} .num-users`, el => el.textContent)).toBe('1');

    await enterRoom(ppages[1], 1);
    expect(await mpage.$eval(`${firstRow} .num-users`, el => el.textContent)).toBe('2');

    await leaveRoom(ppages[0]);
    expect(await mpage.$eval(`${firstRow} .num-users`, el => el.textContent)).toBe('1');

    await closePage(ppages[1]);
    expect(await mpage.$eval(`${firstRow} .num-users`, el => el.textContent)).toBe('0');
  });
});
