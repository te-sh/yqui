import React from 'react'
import { IconButton } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import PassQuizHelp from './PassQuizHelp'

const PassQuizHelpButton = ({ disabled }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton size="small" edge="start" disabled={disabled}
                  onClick={() => setOpen(true)}>
        <Help />
      </IconButton>
      <PassQuizHelp open={open} close={() => setOpen(false)} />
    </>
  )
}

export default PassQuizHelpButton
