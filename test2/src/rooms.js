import { Selector } from 'testcafe'

fixture('rooms')
  .page('http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8800/')

test('title', async t => {
  await t
    .takeScreenshot('rooms.png')
    .expect(Selector('header .app-name').innerText).eql('Yqui')
})
