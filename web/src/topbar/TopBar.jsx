import React from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography, Tooltip } from '@material-ui/core'
import {
  PlaylistAddCheck,
  SupervisorAccount
} from '@material-ui/icons'
import { setEditTeams } from '../redux/actions'
import { teamsToEditTeams } from '../team'
import Rule from '../rule/Rule'
import MasterButton from './MasterButton'
import SettingButton from './SettingButton'
import HelpButton from './HelpButton'
import LeaveButton from './LeaveButton'
import './TopBar.scss'

const Topbar = ({
  className, roomNo, users, teams, master,
  isMaster, editTeams, setEditTeams
}) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)

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
        <MasterButton />
        <SettingButton />
        <HelpButton />
        <LeaveButton />
      </Toolbar>
      <Rule open={ruleOpen} close={() => setRuleOpen(false)} />
    </AppBar>
  )
}

export default connect(
  state => ({
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
