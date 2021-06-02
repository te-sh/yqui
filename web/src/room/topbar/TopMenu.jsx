import React from 'react'
import { connect } from 'react-redux'
import { Drawer, IconButton, List } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import RuleButton from './RuleButton'
import MasterButton from './MasterButton'
import ObserverButton from './ObserverButton'
import SettingButton from './SettingButton'
import HelpButton from './HelpButton'
import LeaveButton from './LeaveButton'

const TopMenu = ({ mobile }) => {
  const [open, setOpen] = React.useState(false)

  if (!mobile) {
    return (
      <>
        <RuleButton />
        <MasterButton />
        <ObserverButton />
        <SettingButton />
        <HelpButton />
        <LeaveButton />
      </>
    )
  } else {
    return (
      <>
        <IconButton color="inherit"
                    onClick={() => setOpen(true)}>
          <MoreHoriz />
        </IconButton>
        <Drawer anchor="right" open={open}
                onClose={() => setOpen(false)}>
          <List onClick={() => setOpen(false)}>
            <ObserverButton />
            <SettingButton />
            <HelpButton />
            <LeaveButton />
          </List>
        </Drawer>
      </>
    )
  }
}

export default connect(
  state => ({
    mobile: state.mobile
  })
)(TopMenu)
