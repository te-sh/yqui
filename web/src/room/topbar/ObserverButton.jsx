import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { sendWs, SEND_TOGGLE_OBSERVER } from '../../lib/send'

const ObserverButton = ({ user, isPlayer }) => {
  const toggleMaster = () => { sendWs(SEND_TOGGLE_OBSERVER) }
  const isObserver = !user.isMaster && !isPlayer

  return (
    <Box>
      <Tooltip title="観戦">
        <span>
          <IconButton color={isObserver ? 'secondary' : 'inherit'}
                      disabled={user.isMaster} onClick={toggleMaster}>
            <Visibility />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    isPlayer: state.isPlayer
  })
)(ObserverButton)
