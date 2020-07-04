import React from 'react'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import TeamButton from './TeamButton'
import RuleButton from './RuleButton'
import MasterButton from './MasterButton'
import SettingButton from './SettingButton'
import HelpButton from './HelpButton'
import LeaveButton from './LeaveButton'
import './TopBar.scss'

const Topbar = ({ className, roomNo }) => {
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
        <TeamButton />
        <RuleButton />
        <MasterButton />
        <SettingButton />
        <HelpButton />
        <LeaveButton />
      </Toolbar>
    </AppBar>
  )
}

export default connect(
  state => ({
    roomNo: state.roomNo,
  })
)(Topbar)
