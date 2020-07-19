import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { sendWs, SEND_TOGGLE_MASTER } from '../../send'

const MasterButton = ({ ws, master, isMaster, editTeams }) => {
  return (
    <Box>
      <Tooltip title="司会">
        <span>
          <IconButton color={isMaster ? 'secondary' : 'inherit'}
                      disabled={(!isMaster && master >= 0) || !!editTeams}
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
    master: state.master,
    isMaster: state.isMaster,
    editTeams: state.editTeams
  })
)(MasterButton)
