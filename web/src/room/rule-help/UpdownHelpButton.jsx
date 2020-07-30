import React from 'react'
import { IconButton } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import UpdownHelp from './UpdownHelp'

const UpdownHelpButton = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton size="small" edge="start" onClick={() => setOpen(true)}>
        <Help />
      </IconButton>
      <UpdownHelp open={open} close={() => setOpen(false)} />
    </>
  )
}

export default UpdownHelpButton
