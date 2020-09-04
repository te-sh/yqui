import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { PlaylistAddCheck } from '@material-ui/icons'
import { setOpenRule } from '../../redux/actions'

const RuleButton = ({ user, editTeams, setOpen }) => {
  const open = () => {
    setOpen(true)
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
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenRule(open))
  })
)(RuleButton)
