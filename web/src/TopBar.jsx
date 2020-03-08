import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ListAlt, Settings, SupervisorAccount } from '@material-ui/icons'
import { send } from './communicate'
import Rule from './Rule'
import Setting from './Setting'
import './TopBar.scss'

const TopBar = ({ ws, attendees, isMaster }) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)

  return (
    <AppBar position="static" className="top-bar">
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <div className="toolbar-grow" />
        <IconButton color="inherit" onClick={() => setRuleOpen(true)}>
          <ListAlt />
        </IconButton>
        <IconButton color="inherit" onClick={() => setSettingOpen(true)}>
          <Settings />
        </IconButton>
        <IconButton color={isMaster ? 'secondary' : 'inherit'}
                    disabled={!isMaster && attendees.master >= 0}
                    onClick={() => send.toggleMaster(ws)}>
          <SupervisorAccount />
        </IconButton>
      </Toolbar>
      <Rule open={ruleOpen} close={() => setRuleOpen(false)} />
      <Setting open={settingOpen} close={() => setSettingOpen(false)} />
    </AppBar>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    attendees: state.attendees,
    isMaster: state.isMaster
  })
)(TopBar)
