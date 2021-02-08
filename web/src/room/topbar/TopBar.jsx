import React from 'react'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import TopMenu from './TopMenu'
import './TopBar.scss'

const Topbar = ({ className, roomNo }) => {
  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Typography variant="h6" className="app-name">
          Yqui
        </Typography>
        <Typography className="room-name">
          Room {roomNo + 1}
        </Typography>
        <div className="toolbar-grow" />
        <TopMenu />
      </Toolbar>
    </AppBar>
  )
}

export default connect(
  state => ({
    roomNo: state.roomNo
  })
)(Topbar)
