import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { sendWs, SEND_TOGGLE_MASTER } from '../../send'

const MasterButton = ({ ws, user, master, editTeams }) => {
  return (
    <Box>
      <Tooltip title="司会">
        <span>
          <IconButton color={user.isMaster ? 'secondary' : 'inherit'}
                      disabled={(!user.isMaster && master) || !!editTeams}
                      onClick={() => sendWs(ws, SEND_TOGGLE_MASTER)}>
            <Portrait />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    user: state.user,
    master: state.master,
    editTeams: state.editTeams
  })
)(MasterButton)
