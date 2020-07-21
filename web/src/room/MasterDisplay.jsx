import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import './MasterDisplay.scss'

const MasterDisplay = ({ className, master }) => {
  const masterName = master ? <span className="master-name">{master.name}</span> : '-'

  return (
    <Paper className={className}>
      <Typography>司会 {masterName}</Typography>
    </Paper>
  )
}

export default connect(
  state => ({
    master: state.master
  })
)(MasterDisplay)
