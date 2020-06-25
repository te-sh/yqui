import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../util'
import './RuleDisplay.scss'

const ButtonRule = ({ rule, teams }) => {
  const chance = chanceText(rule, teams)

  const shareButton = (() => {
    if (teams.length > 1 && rule.shareButton) {
      return 'チームでボタンを共有'
    } else {
      return null
    }
  })()

  return (
    <Box>
      <Typography variant="caption">ボタン</Typography>
      <Typography>{chance}</Typography>
      {shareButton ? <Typography>{shareButton}</Typography> : null}
    </Box>
  )
}

export default ButtonRule
