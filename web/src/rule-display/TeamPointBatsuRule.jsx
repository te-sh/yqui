import React from 'react'
import { Box, Typography } from '@material-ui/core'

const TeamPointBatsuRule = ({ rule }) => {
  const point = (() => {
    let text = 'ポイント'
    switch (rule.teamPoint) {
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
  })()

  const batsu = (() => {
    let text = 'バツ'
    switch (rule.teamBatsu) {
      case 'sum':
        text += ' 個人バツの和'
        break
      default:
        break
    }
    return text
  })()

  const lock = (() => {
    let text = '休み'
    if (rule.teamShareLock) {
      text += ' 共有する'
    } else {
      text += ' 共有しない'
    }
    return text
  })()

  return (
    <Box>
      <Typography>{point}</Typography>
      <Typography>{batsu}</Typography>
      <Typography>{lock}</Typography>
    </Box>
  )
}

export default TeamPointBatsuRule
