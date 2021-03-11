import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import './RoomInfo.scss'

const RoomInfo = ({ className, master }) => {
  const masterName = master ? master.name : '-'

  return (
    <Paper className={className}>
      <Box className="info-block">
        <Typography variant="body2">
          <Box component="span" className="info-title">司会</Box>
          <Box component="span" className="info-element master-name">
            {masterName}
          </Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    master: state.master
  })
)(RoomInfo)
