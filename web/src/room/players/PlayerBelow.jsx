import React from 'react'
import { Box } from '@material-ui/core'
import { EmojiEvents } from '@material-ui/icons'
import './PlayerBelow.scss'

const PlayerBelow = ({ rule, score }) => {
  const win = key => (
    <EmojiEvents key={key} fontSize="small" className="win" />
  )

  const winTimes = (
    <Box className="win-times">
      {Array(score.winTimes).fill(0).map((_, i) => win(i))}
    </Box>
  )

  return (
    <Box>
      {rule.other.showWinTimes && winTimes}
    </Box>
  )
}

export default PlayerBelow
