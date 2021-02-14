require('expect-more-jest')
const YquiBrowser = require('./puppeteer_ext')

// set global variables
global.puppeteer = require('puppeteer')

global.ROOT_DIR = '/home/node/test'

if (process.env.LOCAL_SERVER) {
  global.YQUI_URL = 'http://docker-host:8085/'
  global.TIMEOUT = 200
} else {
  global.YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/'
  global.TIMEOUT = 300
}

console.log('Accessing to', YQUI_URL)

global.PLAYERS = 5

// jest settings
jest.setTimeout(60000)

// setup/teadown for test
beforeAll(async () => {
  const browser = await puppeteer.launch()
  global.browser = browser
  browser.yq = new YquiBrowser(browser, TIMEOUT, YQUI_URL)
  await browser.yq.initPages(PLAYERS)
  console.info(await browser.version())

  global.pages = browser.yq.pages

  global.p0 = pages[0]
  global.p1 = pages[1]
  global.p2 = pages[2]
  global.p3 = pages[3]
  global.p4 = pages[4]
})

afterAll(async done => {
  await browser.close()
  done()
})
