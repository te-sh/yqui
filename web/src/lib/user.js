import { toIntMap } from './util'

export const COLORS = ['#ffffff', '#ff0000', '#0070c0', '#ffff00', '#00B050', '#7030a0', '#808080']

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
