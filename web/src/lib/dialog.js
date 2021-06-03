import { setAlert, setConfirm, setPrompt } from '../redux/dialog_actions'
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
