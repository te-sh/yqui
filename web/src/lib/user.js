import { toIntMap } from './util'

export const COLORS = ['#ffffff', '#d50000', '#2979ff', '#f9a825', '#00c853', '#ff6d00', '#651fff', '#9e9e9e']

export const initUsers = new Map()

export const initUser = {
  id: -1,
  isMaster: false,
  name: '',
  chatAnswer: false,
  borderColor: '#ff000000'
}

export const usersFromJson = json => toIntMap(json)

export const findMaster = users => [...users.values()].find(user => user.isMaster)
