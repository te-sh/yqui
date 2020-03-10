import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ListAlt, Settings, SportsKabaddi, SupervisorAccount } from '@material-ui/icons'
import { send } from './communicate'
import { setEditTeam } from './redux/actions'
import Rule from './dialogs/Rule'
import Setting from './dialogs/Setting'
import './TopBar.scss'

const TopBar = ({ ws, attendees, isMaster, setEditTeam }) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)

  return (
    <AppBar position="static" className="top-bar">
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <div className="toolbar-grow" />
        <IconButton color="inherit" onClick={() => setEditTeam(attendees)}
                    disabled={!isMaster}>
          <SportsKabaddi />
        </IconButton>
        <IconButton color="inherit" onClick={() => setRuleOpen(true)}
                    disabled={!isMaster}>
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
  }),
  dispatch => ({
    setEditTeam: attendees => dispatch(setEditTeam(attendees))
  })
)(TopBar)
