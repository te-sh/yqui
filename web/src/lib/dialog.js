import { setAlert, setConfirm, setPrompt } from '../redux/actions'
import store from '../redux/store'

export const openAlert = alert => {
  store.dispatch(setAlert(alert))
}

export const openConfirm = confirm => {
  store.dispatch(setConfirm(confirm))
}

export const openPrompt = prompt => {
  store.dispatch(setPrompt(prompt))
}
