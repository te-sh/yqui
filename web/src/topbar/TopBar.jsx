import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography, Tooltip } from '@material-ui/core'
import {
  HelpOutline, PlaylistAddCheck,
  Portrait, Settings, SupervisorAccount
} from '@material-ui/icons'
import { send } from '../communicate'
import { setEditTeams } from '../redux/actions'
import { teamsToEditTeams } from '../team'
import Rule from '../rule/Rule'
import Setting from '../dialogs/Setting'
import Help from '../dialogs/Help'
import LeaveButton from './LeaveButton'
import './TopBar.scss'

const Topbar = ({
  className, ws, roomNo, users, teams, master,
  isMaster, editTeams, setEditTeams
}) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)

  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(users, teams, master))
  }

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Typography variant="h6">
          Yqui
        </Typography>
        <Typography className="room-no">
          Room {roomNo + 1}
        </Typography>
        <div className="toolbar-grow" />
        <Tooltip title="チーム">
          <span>
            <IconButton color="inherit"
                        disabled={!isMaster || !!editTeams}
                        onClick={teamEdit}>
              <SupervisorAccount />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="ルール">
          <span>
            <IconButton color="inherit"
                        disabled={!isMaster || !!editTeams}
                        onClick={() => setRuleOpen(true)}>
              <PlaylistAddCheck />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="司会">
          <span>
            <IconButton color={isMaster ? 'secondary' : 'inherit'}
                        disabled={(!isMaster && master >= 0) || !!editTeams}
                        onClick={() => send.toggleMaster(ws)}>
              <Portrait />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="設定">
          <span>
            <IconButton color="inherit"
                        onClick={() => setSettingOpen(true)}>
              <Settings />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="ヘルプ">
          <span>
            <IconButton color="inherit"
                        onClick={() => setHelpOpen(true)}>
              <HelpOutline />
            </IconButton>
          </span>
        </Tooltip>
        <LeaveButton />
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
    roomNo: state.roomNo,
    users: state.users,
    teams: state.teams,
    master: state.master,
    isMaster: state.isMaster,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Topbar)
