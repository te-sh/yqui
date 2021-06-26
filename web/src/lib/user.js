import { toIntMap } from './util'

export const COLORS = ['#ffffff', '#d50000', '#2979ff', '#ffd600', '#00c853', '#ff6d00', '#651fff', '#9e9e9e']

export const initUsers = new Map()

export const initUser = {
  id: -1,
  isMaster: false,
  isPlayer: false,
  isObserver: false,
  name: '',
  chatAnswer: false,
  borderColor: '#ff000000'
}

export const usersFromJson = json => toIntMap(json)
