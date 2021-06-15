import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { EmojiEvents } from '@material-ui/icons'
import './PlayerBelow.scss'

const PlayerBelow = ({ rule, score }) => {
  const win = key => (
    <EmojiEvents key={key} fontSize="small" className="win" />
  )

  const winTimes = (
    <Box className="win-times">
      {score.winTimes > 5 ? win(0) : Array(score.winTimes).fill(0).map((_, i) => win(i))}
      {score.winTimes > 5 && <Typography variant="body2">× {score.winTimes}</Typography>}
    </Box>
  )

  return (
    <Box>
      {rule.other.showWinTimes && winTimes}
    </Box>
  )
}

export default PlayerBelow
