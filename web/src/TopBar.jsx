import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import {
  ListAlt, HelpOutline, Settings, SportsKabaddi, SupervisorAccount
} from '@material-ui/icons'
import { send } from './communicate'
import { setEditTeam } from './redux/actions'
import { attendeesToEditTeam } from './team'
import Rule from './dialogs/Rule'
import Setting from './dialogs/Setting'
import Help from './dialogs/Help'
import './TopBar.scss'

const TopBar = ({ className, ws, userIDs, attendees, isMaster, editTeam, setEditTeam }) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)

  const teamEdit = () => {
    setEditTeam(attendeesToEditTeam(userIDs, attendees))
  }

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <div className="toolbar-grow" />
        <IconButton color="inherit"
                    disabled={!isMaster || !!editTeam}
                    onClick={teamEdit}>
          <SportsKabaddi />
        </IconButton>
        <IconButton color="inherit"
                    disabled={!isMaster || !!editTeam}
                    onClick={() => setRuleOpen(true)}>
          <ListAlt />
        </IconButton>
        <IconButton color={isMaster ? 'secondary' : 'inherit'}
                    disabled={(!isMaster && attendees.master >= 0) || !!editTeam}
                    onClick={() => send.toggleMaster(ws)}>
          <SupervisorAccount />
        </IconButton>
        <IconButton color="inherit"
                    onClick={() => setSettingOpen(true)}>
          <Settings />
        </IconButton>
        <IconButton color="inherit"
                    onClick={() => setHelpOpen(true)}>
          <HelpOutline />
        </IconButton>
      </Toolbar>
      <Rule open={ruleOpen} close={() => setRuleOpen(false)} />
      <Setting open={settingOpen} close={() => setSettingOpen(false)} />
      <Help open={helpOpen} close={() => setHelpOpen(false)} />
    </AppBar>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    userIDs: state.userIDs,
    attendees: state.attendees,
    isMaster: state.isMaster,
    editTeam: state.editTeam
  }),
  dispatch => ({
    setEditTeam: editTeam => dispatch(setEditTeam(editTeam))
  })
)(TopBar)
