import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import WinLoseRule from './WinLoseRule'

const TeamRule = ({ simple, rule }) => {
  const point = rule => (
    <Box>
      <Typography variant="body2">
        ポイント
        {rule.point === 'sum' && <> 個人{pointText(simple)}の和</>}
        {rule.point === 'mul' && <> 個人{pointText(simple)}の積</>}
      </Typography>
    </Box>
  )

  const batsu = rule => (
    <Box>
      <Typography variant="body2">
        バツ
        {rule.batsu === 'sum' && <> 個人{batsuText(simple)}の和</>}
      </Typography>
    </Box>
  )

  const lock = rule => (
    <Box>
      <Typography variant="body2">
        休み {rule.shareLock ? '共有する' : '共有しない'}
      </Typography>
    </Box>
  )

  return (
    <Box className="team-rule">
      <Box className="title">
        <Typography variant="caption">チームスコア</Typography>
      </Box>
      <Box className="content">
        {point(rule.team)}
        {batsu(rule.team)}
        {lock(rule.team)}
        <WinLoseRule simple={simple} rule={rule.team} />
      </Box>
    </Box>
  )
}

export default TeamRule
