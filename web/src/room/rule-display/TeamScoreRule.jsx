import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { winLoseText } from '../../rule'

const TeamScoreRule = ({ rule }) => {
  const point = rule => {
    let text = 'ポイント'
    switch (rule.point) {
      case 'sum':
        text += ' 個人ポイントの和'
        break
      case 'mul':
        text += ' 個人ポイントの積'
        break
      default:
        break
    }
    return text
  }

  const batsu = rule => {
    let text = 'バツ'
    switch (rule.batsu) {
      case 'sum':
        text += ' 個人バツの和'
        break
      default:
        break
    }
    return text
  }

  const lock = rule => {
    let text = '休み'
    if (rule.shareLock) {
      text += ' 共有する'
    } else {
      text += ' 共有しない'
    }
    return text
  }

  return (
    <Box>
      <Typography variant="caption">チームスコア</Typography>
      <Typography>{point(rule.team)}</Typography>
      <Typography>{batsu(rule.team)}</Typography>
      <Typography>{lock(rule.team)}</Typography>
      <Typography>{winLoseText(rule.team)}</Typography>
    </Box>
  )
}

export default TeamScoreRule
