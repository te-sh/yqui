import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ListAlt, Settings, SupervisorAccount } from '@material-ui/icons'
import { send } from './communicate'
import { ruleOpen, settingOpen } from './redux/actions'

const TopBar = ({ ws, attendees, isMaster, ruleOpen, settingOpen }) => {
  const rule = () => {
    ruleOpen()
  }

  const setting = () => {
    settingOpen()
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
        <IconButton color={isMaster ? 'secondary' : 'inherit'}
                    disabled={!isMaster && attendees.master >= 0}
                    onClick={() => send.toggleMaster(ws)}>
          <SupervisorAccount />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    attendees: state.attendees,
    isMaster: state.isMaster
  }),
  dispatch => ({
    ruleOpen: () => dispatch(ruleOpen()),
    settingOpen: () => dispatch(settingOpen())
  })
)(TopBar)
