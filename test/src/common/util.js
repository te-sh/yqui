module.exports = {
  screenshot: async (page, filename) => {
    await page.screenshot({ path: `${ROOT_DIR}/screenshots/${filename}` })
  }
}
