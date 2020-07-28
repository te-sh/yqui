import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { sendWs, SEND_TOGGLE_MASTER } from '../../lib/send'

const MasterButton = ({ user, master, editTeams }) => {
  const onToggleMaster = () => { sendWs(SEND_TOGGLE_MASTER) }
  const disabled = (!user.isMaster && master !== undefined) || !!editTeams

  return (
    <Box>
      <Tooltip title="司会">
        <span>
          <IconButton color={user.isMaster ? 'secondary' : 'inherit'}
                      disabled={disabled} onClick={onToggleMaster}>
            <Portrait />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    master: state.master,
    editTeams: state.editTeams
  })
)(MasterButton)
