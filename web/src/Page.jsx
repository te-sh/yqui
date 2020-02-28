import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { leaveRoom } from './actions'
import TopBar from './TopBar'
import Chat from './Chat'
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
      <TopBar />
      <Grid container>
        <Grid item xs={3}>
          <Chat />
        </Grid>
        <Grid item xs={9}>
        </Grid>
      </Grid>
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
