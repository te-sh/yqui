import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import { send } from '../communicate'

const MasterButton = ({ ws, master, isMaster, editTeams }) => {
  return (
    <Box>
      <Tooltip title="司会">
        <IconButton color={isMaster ? 'secondary' : 'inherit'}
                    disabled={(!isMaster && master >= 0) || !!editTeams}
                    onClick={() => send.toggleMaster(ws)}>
          <Portrait />
        </IconButton>
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
