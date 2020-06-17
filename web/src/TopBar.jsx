import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography, Tooltip } from '@material-ui/core'
import {
  Close, HelpOutline, PlaylistAddCheck,
  Portrait, Settings, SupervisorAccount
} from '@material-ui/icons'
import { send } from './communicate'
import { reset, setEditTeams } from './redux/actions'
import { teamsToEditTeams } from './team'
import Rule from './dialogs/Rule'
import Setting from './dialogs/Setting'
import Help from './dialogs/Help'
import './TopBar.scss'

const TopBar = ({
  className, ws, roomNo, userIDs, teams, master,
  isMaster, editTeams, setEditTeams, reset
}) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)
  const [settingOpen, setSettingOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)

  const teamEdit = () => {
    setEditTeams(teamsToEditTeams(userIDs, teams, master))
  }

  const leave = () => {
    send.leave(ws)
    reset()
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
        <Tooltip title="退室">
          <span>
            <IconButton color="inherit"
                        onClick={leave}>
              <Close />
            </IconButton>
          </span>
        </Tooltip>
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
