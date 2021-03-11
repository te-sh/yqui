import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import './RoomInfo.scss'

const RoomInfo = ({ className, users, master, numPlayers }) => {
  const masterName = master ? master.name : '-'
  const numObservers = users.size - numPlayers - (master ? 1 : 0)

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
      <Box className="info-block">
        <Typography variant="body2">
          <Box component="span" className="info-title">解答</Box>
          <Box component="span" className="info-element num-players">
            {numPlayers}人
          </Box>
        </Typography>
      </Box>
      <Box className="info-block">
        <Typography variant="body2">
          <Box component="span" className="info-title">観戦</Box>
          <Box component="span" className="info-element num-observers">
            {numObservers}人
          </Box>
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    users: state.users,
    master: state.master,
    numPlayers: state.numPlayers
  })
)(RoomInfo)
