import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import './MasterDisplay.scss'

const MasterDisplay = ({ className, users, master }) => {
  const masterName = master !== -1 ?
                     <span className="master-name">{users[master].name}</span> :
                     '-'

  return (
    <Paper className={className}>
      <Typography>司会 {masterName}</Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users,
    master: state.master
  })
)(MasterDisplay)
