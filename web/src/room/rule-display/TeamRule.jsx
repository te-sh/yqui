import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const TeamRule = ({ rule }) => {
  const point = rule => (
    <Box>
      <Typography>
        ポイント
        {rule.point === 'sum' && <> 個人ポイントの和</>}
        {rule.point === 'mul' && <> 個人ポイントの積</>}
      </Typography>
    </Box>
  )

  const batsu = rule => (
    <Box>
      <Typography>
        バツ
        {rule.batsu === 'sum' && <> 個人バツの和</>}
      </Typography>
    </Box>
  )

  const lock = rule => (
    <Box>
      <Typography>
        休み {rule.shareLock ? '共有する' : '共有しない'}
      </Typography>
    </Box>
  )

  return (
    <Box>
      <Box>
        <Typography variant="caption">チームスコア</Typography>
      </Box>
      {point(rule.team)}
      {batsu(rule.team)}
      {lock(rule.team)}
      <WinLoseRule rule={rule.team} />
    </Box>
  )
}

export default TeamRule
