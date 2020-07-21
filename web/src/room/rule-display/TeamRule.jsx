import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { winLoseText } from '../../lib/rule'

const TeamRule = ({ display, rule }) => {
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
    <Box display={display}>
      <Box>
        <Typography variant="caption">チームスコア</Typography>
      </Box>
      <Box>
        <Typography>{point(rule.team)}</Typography>
      </Box>
      <Box>
        <Typography>{batsu(rule.team)}</Typography>
      </Box>
      <Box>
        <Typography>{lock(rule.team)}</Typography>
      </Box>
      <Box>
        <Typography>{winLoseText(rule.team)}</Typography>
      </Box>
    </Box>
  )
}

export default TeamRule
