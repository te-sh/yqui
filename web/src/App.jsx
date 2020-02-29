import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Page from './Page'
import './yqui.css'

const App = props => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}

export default App
