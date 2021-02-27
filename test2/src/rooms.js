import { Selector } from 'testcafe'
import { createWindows } from './common'

fixture('rooms')
  .beforeEach(async t => createWindows(3))

test('title', async t => {
  const appName = Selector('header .app-name')

  await t
    .expect(appName.innerText).eql('Yqui')

  await t.switchToWindow(t.ctx.w1)
    .expect(appName.innerText).eql('Yqui')

  await t.switchToWindow(t.ctx.w2)
    .expect(appName.innerText).eql('Yqui')
})
