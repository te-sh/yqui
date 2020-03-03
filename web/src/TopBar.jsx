import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ListAlt, Settings, SupervisorAccount } from '@material-ui/icons'
import { ruleOpen, settingOpen } from './redux/actions'

const TopBar = ({ ws, selfID, attendees, ruleOpen, settingOpen }) => {
  const rule = () => {
    ruleOpen()
  }

  const setting = () => {
    settingOpen()
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
        <IconButton color="inherit" onClick={() => setting()}>
          <Settings />
        </IconButton>
        <IconButton color={selfID === attendees.master ? 'secondary' : 'inherit'}
                    disabled={selfID !== attendees.master && attendees.master >= 0}
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
    attendees: state.attendees
  }),
  dispatch => ({
    ruleOpen: () => dispatch(ruleOpen()),
    settingOpen: () => dispatch(settingOpen())
  })
)(TopBar)
