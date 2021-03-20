import { setAlert } from '../redux/actions'
import store from '../redux/store'

export const openAlert = alert => {
  store.dispatch(setAlert(alert))
}
