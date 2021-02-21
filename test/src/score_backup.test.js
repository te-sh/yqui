describe('score backup', () => {
  beforeEach(async () => {
    await Promise.all([
      p0.yq.enterRoom({ delay: STEP_TIME * 0 }),
      p1.yq.enterRoom({ delay: STEP_TIME * 1 })
    ])
    await p0.yq.clickToggleMasterButton()
    await p1.yq.answerCorrect(p0, { repeat: 2 })
    await p1.yq.answerWrong(p0, { repeat: 1 })
  })

  afterEach(async () => {
    p1 = await browser.yq.reopen(p1)
  })

  test('leave and join', async () => {
    const s = '.room .team .player-container'
    let list

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')

    await p1.yq.close()
    p1 = await browser.yq.reopen(p1)
    await p1.yq.enterRoom()

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')
  })

  test('leave and join after all clear', async () => {
    const s = '.room .team .player-container'
    let list

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')

    await p1.yq.close()
    p1 = await browser.yq.reopen(p1)
    await p0.yq.clickAllClearButton()
    await p1.yq.enterRoom()

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('0')
    expect(await list[0].yq.textContent('.batsu')).toBe('0')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('0')
    expect(await list[0].yq.textContent('.batsu')).toBe('0')
  })

  test('leave and join with changing name', async () => {
    const s = '.room .team .player-container'
    let list

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('2')
    expect(await list[0].yq.textContent('.batsu')).toBe('1')

    await p1.yq.close()
    p1 = await browser.yq.reopen(p1)
    await p1.yq.enterRoom({ name: 'ゆーた2' })

    list = await p0.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('0')
    expect(await list[0].yq.textContent('.batsu')).toBe('0')
    list = await p1.yq.$$(s)
    expect(await list[0].yq.textContent('.point')).toBe('0')
    expect(await list[0].yq.textContent('.batsu')).toBe('0')
  })
})
