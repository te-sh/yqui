import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../util'
import './RuleDisplay.scss'

const ButtonRule = ({ rule, teams }) => {
  const chance = chanceText(rule, teams)

  const teamShareButton = (() => {
    if (rule.team && rule.teamShareButton) {
      return 'チームでボタンを共有'
    } else {
      return null
    }
  })()

  return (
    <Box>
      <Typography variant="caption">ボタン</Typography>
      <Typography>{chance}</Typography>
      {teamShareButton ? <Typography>{teamShareButton}</Typography> : null}
    </Box>
  )
}

export default ButtonRule
