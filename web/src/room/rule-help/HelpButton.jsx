import React from 'react'
import { Help } from '@material-ui/icons'

const HelpButton = ({ size, disabled }) => {
  const helpStyle = size => {
    let style = { verticalAlign: 'middle' }
    if (size === 'small') {
      style.fontSize = '1rem'
    }
    return style
  }

  const helpColor = disabled => {
    if (disabled) {
      return 'disabled'
    } else {
      return 'action'
    }
  }

  return (
    <Help style={helpStyle(size)} color={helpColor(disabled)} />
  )
}

export default HelpButton
