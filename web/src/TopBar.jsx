import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import {
  ExitToApp, ListAlt, HelpOutline,
  Settings, SportsKabaddi, SupervisorAccount
} from '@material-ui/icons'
import { send } from './communicate'
import { reset, setEditTeams } from './redux/actions'
import { teamsToEditTeams } from './team'
import Rule from './dialogs/Rule'
import Setting from './dialogs/Setting'
import Help from './dialogs/Help'
import './TopBar.scss'

const TopBar = ({
  className, ws, userIDs, teams, master,
  isMaster, editTeams, setEditTeams, reset
}) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)

  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(userIDs, teams, master))
  }

  const leave = () => {
    console.log('leave')
    send.leave(ws)
    reset()
  }

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <div className="toolbar-grow" />
        <IconButton color="inherit"
                    disabled={!isMaster || !!editTeams}
                    onClick={teamEdit}>
          <SportsKabaddi />
        </IconButton>
        <IconButton color="inherit"
                    disabled={!isMaster || !!editTeams}
                    onClick={() => setRuleOpen(true)}>
          <ListAlt />
        </IconButton>
        <IconButton color={isMaster ? 'secondary' : 'inherit'}
                    disabled={(!isMaster && master >= 0) || !!editTeams}
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
        <IconButton color="inherit" onClick={leave}>
          <ExitToApp />
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
    teams: state.teams,
    master: state.master,
    isMaster: state.isMaster,
    editTeams: state.editTeams
  }),
  dispatch => ({
    reset: () => dispatch(reset()),
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(TopBar)
