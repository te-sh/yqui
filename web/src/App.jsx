import React from 'react'
import { Provider } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import store from './store'
import EnterRoom from './EnterRoom'

const App = props => {
  return (
    <Provider store={store}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Yqui
          </Typography>
        </Toolbar>
      </AppBar>
      <EnterRoom />
    </Provider>
  )
}

export default App
