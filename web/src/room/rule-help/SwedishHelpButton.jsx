import React from 'react'
import { IconButton } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import SwedishHelp from './SwedishHelp'

const SwedishHelpButton = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton size="small" edge="start" onClick={() => setOpen(true)}>
        <Help />
      </IconButton>
      <SwedishHelp open={open} close={() => setOpen(false)} />
    </>
  )
}

export default SwedishHelpButton
