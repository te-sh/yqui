// set global variables
global.puppeteer = require('puppeteer');

global.ROOT_DIR = '/home/node/test';

if (process.env.LOCAL_SERVER) {
  global.YQUI_URL = 'http://docker-host:8085/';
  global.TIMEOUT = 100;
} else {
  global.YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/';
  global.TIMEOUT = 75;
}

console.log('Accessing to', YQUI_URL)

global.PLAYERS = 5;

// jest settings
jest.setTimeout(30000);

// setup/teadown for test
beforeAll(async () => {
  let browser = await puppeteer.launch();
  global.browser = browser;
  console.info(await browser.version());

  let pages = [];
  for (let i = 0; i < PLAYERS; ++i) {
    const page = await browser.newPage();
    pages.push(page);
  }
  global.pages = pages;

  global.p0 = pages[0];
  global.p1 = pages[1];
  global.p2 = pages[2];
});

afterAll(async done => {
  browser.close();
  done();
});
