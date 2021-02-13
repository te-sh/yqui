import Dexie from 'dexie'

const db = new Dexie('YquiDB')

db.version(1)
  .stores({
    settings: 'key'
  })

export const storeName = async name => {
  await db.settings.put({ key: 'name', value: name })
}

export const retrieveName = async () => {
  const record = await db.settings.get('name')
  return record !== undefined ? record.value : ''
}

export const storeChatAnswer = async chatAnswer => {
  await db.settings.put({ key: 'chatAnswer', value: chatAnswer })
}

export const retrieveChatAnswer = async () => {
  const record = await db.settings.get('chatAnswer')
  return record !== undefined ? record.value : false
}
