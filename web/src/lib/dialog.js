import { setAlert, setConfirm } from '../redux/actions'
import store from '../redux/store'

export const openAlert = alert => {
  store.dispatch(setAlert(alert))
}

export const openConfirm = confirm => {
  store.dispatch(setConfirm(confirm))
}
