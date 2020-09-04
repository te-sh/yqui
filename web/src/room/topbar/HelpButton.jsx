import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { setOpenHelp } from '../../redux/actions'

const HelpButton = ({ setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  return (
    <Box>
      <Tooltip title="ヘルプ">
        <span>
          <IconButton color="inherit" onClick={open}>
            <HelpOutline />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  null,
  dispatch => ({
    setOpen: open => dispatch(setOpenHelp(open))
  })
)(HelpButton)
