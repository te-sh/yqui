import React from 'react'
import { connect } from 'react-redux'
import {
  Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip
} from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { setOpenSetting } from '../../redux/open_actions'
import './TopBar.scss'

const SettingButton = ({ browser: { mobile }, setOpen }) => {
  const open = () => {
    setOpen(true)
  }

  if (!mobile) {
    return (
      <Box>
        <Tooltip title="設定">
          <span>
            <IconButton className="open-setting-button" color="inherit"
                        onClick={open}>
              <Settings />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <ListItem button onClick={open}>
        <ListItemIcon><Settings /></ListItemIcon>
        <ListItemText>設定</ListItemText>
      </ListItem>
    )
  }
}

export default connect(
  state => ({
    browser: state.browser
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenSetting(open))
  })
)(SettingButton)
