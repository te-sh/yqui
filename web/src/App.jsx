import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Page from './Page'

const App = props => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  )
}

export default App
