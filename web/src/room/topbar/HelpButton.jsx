import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { setOpenHelp } from '../../redux/open_actions'

const HelpButton = ({ browser: { mobile }, setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="ヘルプ">
          <span>
            <IconButton className="open-help-button" color="inherit"
                        onClick={open}>
              <HelpOutline />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button onClick={open}>
        <ListItemIcon><HelpOutline /></ListItemIcon>
        <ListItemText>ヘルプ</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    browser: state.browser
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenHelp(open))
  })
)(HelpButton)
