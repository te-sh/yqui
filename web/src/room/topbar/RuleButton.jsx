import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { PlaylistAddCheck } from '@material-ui/icons'
import { sendWs, SEND_RULE } from '../../lib/send'
import Rule from '../rule/Rule'

const RuleButton = ({ user, rule, editTeams }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const open = () => {
    setDialogOpen(true)
  }

  const ok = rule => {
    setDialogOpen(false)
    sendWs(SEND_RULE, rule)
  }

  const cancel = () => {
    setDialogOpen(false)
  }

  return (
    <Box>
      <Tooltip title="ルール">
        <span>
          <IconButton color="inherit"
                      disabled={!user.isMaster || !!editTeams}
                      onClick={open}>
            <PlaylistAddCheck />
          </IconButton>
        </span>
      </Tooltip>
      <Rule open={dialogOpen} rule={rule}
            ok={ok} cancel={cancel} />
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    rule: state.rule,
    editTeams: state.editTeams
  })
)(RuleButton)
