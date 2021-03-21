import { selectors as s } from './common/selectors'
import { createWindows, closeWindows } from './common/helper'

const setup = async t => await createWindows(3)

fixture('rooms').beforeEach(setup).afterEach(closeWindows)

test('title', async t => {
  await t
    .expect(s.topbar.appName.innerText).eql('Yqui')

  await t.switchToWindow(t.ctx.w1)
    .expect(s.topbar.appName.innerText).eql('Yqui')

  await t.switchToWindow(t.ctx.w2)
    .expect(s.topbar.appName.innerText).eql('Yqui')
})
