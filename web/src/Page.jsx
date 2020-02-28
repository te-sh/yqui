import React from 'react'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { leaveRoom } from './actions'
import EnterRoom from './EnterRoom'

const Page = ({ props, state, action }) => {
  if (state.ws) {
    if (!state.ws.onopen) {
      state.ws.onopen = evt => {
        console.log('ws open')
      }
    }

    if (!state.ws.onclose) {
      state.ws.onclose = evt => {
        console.log('ws close')
        action.leaveRoom()
      }
    }

    if (!state.ws.onmessage) {
      state.ws.onmessage = evt => {
        console.log('ws received: ' + evt.data)
      }
    }

    if (!state.ws.onerror) {
      state.ws.onerror = evt => {
        console.log('ws error: ' + evt.data)
      }
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Yqui
          </Typography>
        </Toolbar>
      </AppBar>
      <EnterRoom />
    </div>
  )
}

export default connect(
  state => ({ state: {
    ws: state.ws
  }}),
  dispatch => ({ action: {
    leaveRoom: () => dispatch(leaveRoom())
  }})
)(Page)
