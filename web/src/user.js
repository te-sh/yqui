import { toIntMap } from './util'

export const initUsers = new Map()

export const initUser = {
  id: -1,
  isMaster: false,
  name: '',
  chatAnswer: false
}

export const usersFromJson = json => toIntMap(json)

export const findMaster = users => [...users.values()].find(user => user.isMaster)
