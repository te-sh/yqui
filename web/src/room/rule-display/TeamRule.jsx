import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import WinLoseRule from './WinLoseRule'

const TeamRule = ({ simple, rule }) => {
  const point = rule => (
    <>
      <Box component="span" className="rule-title">ポイント</Box>
      <Box component="span" className="rule-element">
        {rule.point === 'sum' && <>個人{pointText(simple)}の和</>}
        {rule.point === 'mul' && <>個人{pointText(simple)}の積</>}
      </Box>
    </>
  )

  const batsu = rule => (
    <>
      <Box component="span" className="rule-title">バツ</Box>
      <Box component="span" className="rule-element" key="sum">
        {rule.batsu === 'sum' && <>個人{batsuText(simple)}の和</>}
      </Box>
    </>
  )

  const lock = rule => (
    <>
      <Box component="span" className="rule-title">休み</Box>
      <Box component="span" className="rule-element" key="share">
        {rule.shareLock ? '共有する' : '共有しない'}
      </Box>
    </>
  )

  return (
    <Box className="team-rule">
      <Box className="title">
        <Typography variant="caption">チームスコア</Typography>
      </Box>
      <Box className="content">
        <Typography variant="body2">{point(rule.team)}</Typography>
        <Typography variant="body2">{batsu(rule.team)}</Typography>
        <Typography variant="body2">{lock(rule.team)}</Typography>
        <WinLoseRule simple={simple} rule={rule.team} />
      </Box>
    </Box>
  )
}

export default TeamRule
