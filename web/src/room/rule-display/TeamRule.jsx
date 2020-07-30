import React from 'react'
import { Box, Typography } from '@material-ui/core'
import WinLoseRule from './WinLoseRule'

const TeamRule = ({ rule }) => {
  const point = rule => (
    <>
      ポイント
      {rule.point === 'sum' && <> 個人ポイントの和</>}
      {rule.point === 'mul' && <> 個人ポイントの積</>}
    </>
  )

  const batsu = rule => (
    <>
      バツ
      {rule.batsu === 'sum' && <> 個人バツの和</>}
    </>
  )

  const lock = rule => (
    <>
      休み {rule.shareLock ? '共有する' : '共有しない'}
    </>
  )

  return (
    <Box>
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
        <Typography><WinLoseRule rule={rule.team} /></Typography>
      </Box>
    </Box>
  )
}

export default TeamRule
