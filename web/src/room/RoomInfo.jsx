import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import './RoomInfo.scss'

const RoomInfo = ({ className, master }) => {
  const masterName = master ? master.name : '-'

  return (
    <Paper className={className}>
      <Typography>
        <span>司会 </span>
        <span className="master-name">{masterName}</span>
      </Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    master: state.master
  })
)(RoomInfo)
