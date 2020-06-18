import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { send } from '../communicate'
import './Boardactions.scss'

const Master = ({ className, ws }) => {
  return (
    <Paper className={className}>
      <Box className="boardactions-content">
        <Button variant="outlined" color="default" size="large"
                onClick={() => send.boardLock(ws)}>
          回答ロック
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws
  })
)(Master)
