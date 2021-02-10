global.puppeteer = require('puppeteer');

global.ROOT_DIR = '/home/node/test';

if (process.env.LOCAL_SERVER) {
  global.YQUI_URL = 'http://docker-host:8085/';
} else {
  global.YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/';
}
console.log(`Accessing to ${YQUI_URL}`)

global.PLAYERS = 2;

beforeAll(async () => {
  let browser = await puppeteer.launch();
  global.browser = browser;
  console.log(await browser.version());

  let mpage = await browser.newPage();
  global.mpage = mpage;

  let ppages = [];
  for (let i = 0; i < PLAYERS; ++i) {
    const ppage = await browser.newPage();
    ppages.push(ppage);
  }
  global.ppages = ppages;
});

afterAll(async done => {
  browser.close();
  done();
});
