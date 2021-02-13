import Dexie from 'dexie'

const db = new Dexie('YquiDB')

db.version(1)
  .stores({
    settings: 'key'
  })

const storeSettings = async (key, value) => {
  await db.settings.put({ key, value })
}

const retrieveSettings = async (key, defaultValue) => {
  const record = await db.settings.get(key)
  return record !== undefined ? record.value : defaultValue
}

export const storeName = async name => {
  await storeSettings('name', name)
}

export const retrieveName = async () => {
  return await retrieveSettings('name', '')
}

export const storeChatAnswer = async chatAnswer => {
  await storeSettings('chatAnswer', chatAnswer)
}

export const retrieveChatAnswer = async () => {
  return await retrieveSettings('chatAnswer', false)
}

export const storeVolume = async volume => {
  await storeSettings('volume', volume)
}

export const retrieveVolume = async () => {
  const x = await retrieveSettings('volume', 100)
  console.log(x)
  return x
}
