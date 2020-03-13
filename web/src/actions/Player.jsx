import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Paper, Typography } from '@material-ui/core'
import { send } from '../communicate'
import './Actions.scss'

const Player = ({ className, ws, isPlayer }) => {
  const onKeyDown = evt => {
    if (!isPlayer) {
      return
    }
    switch (evt.keyCode) {
      case 13:
        send.pushButton(ws)
        break
      default:
        break
    }
  }

  const klass = isPlayer ? 'player' : 'observer'

  return (
    <Paper className={className} tabIndex="0" onKeyDown={onKeyDown}>
      <Box className="actions-content"
           style={{ visibility: klass === 'player' ? 'visible' : 'hidden' }}>
        <Button variant="outlined" color="primary" size="large"
                onClick={() => send.pushButton(ws)}>
          早押し
        </Button>
      </Box>
      <Box className="actions-content"
           style={{ visibility: klass === 'observer' ? 'visible' : 'hidden' }}>
        <Typography variant="h6">
          あなたは観戦者です
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isPlayer: state.isPlayer
  })
)(Player)
