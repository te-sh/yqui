import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { Book } from '@material-ui/icons'
import { setOpenTag } from '../../redux/actions'

const TagButton = ({ setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  return (
    <Box>
      <Tooltip title="情報">
        <span>
          <IconButton className="open-tag-button" color="inherit"
                      onClick={open}>
            <Book />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}

export default connect(
  null,
  dispatch => ({
    setOpen: open => dispatch(setOpenTag(open))
  })
)(TagButton)
