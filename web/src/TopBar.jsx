import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ListAlt, SupervisorAccount } from '@material-ui/icons'
import { ruleOpen } from './redux/actions'

const TopBar = ({ ws, selfID, room, ruleOpen }) => {
  const rule = () => {
    ruleOpen()
  }

  const toggleMaster = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'm' }))
    }
  }

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <div className="toolbar-grow" />
        <IconButton color="inherit" onClick={() => rule()}>
          <ListAlt />
        </IconButton>
        <IconButton color={selfID === room.master ? 'secondary' : 'inherit'}
                    disabled={selfID !== room.master && room.master >= 0}
                    onClick={() => toggleMaster()}>
          <SupervisorAccount />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    selfID: state.selfID,
    room: state.room
  }),
  dispatch => ({
    ruleOpen: () => dispatch(ruleOpen())
  })
)(TopBar)
