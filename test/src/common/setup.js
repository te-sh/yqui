require('expect-more-jest')
const YquiBrowser = require('./puppeteer_ext')

// set global variables
global.puppeteer = require('puppeteer')

global.ROOT_DIR = '/home/node/test'

let YQUI_URL, TIMEOUT
if (process.env.LOCAL_SERVER) {
  YQUI_URL = 'http://docker-host:8085/'
  TIMEOUT = 200
} else {
  YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/'
  TIMEOUT = 300
}

console.log('Accessing to', YQUI_URL)

const PLAYERS = 5

// jest settings
jest.setTimeout(60000)

// setup/teadown for test
beforeAll(async () => {
  const browser = await puppeteer.launch()
  global.browser = browser
  browser.yq = new YquiBrowser(browser, TIMEOUT, YQUI_URL)
  await browser.yq.initPages(PLAYERS)
  console.info(await browser.version())

  global.p0 = browser.yq.pages[0]
  global.p1 = browser.yq.pages[1]
  global.p2 = browser.yq.pages[2]
  global.p3 = browser.yq.pages[3]
  global.p4 = browser.yq.pages[4]
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  await browser.yq.gotoTop()
})
