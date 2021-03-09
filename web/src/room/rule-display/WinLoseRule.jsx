import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { initRule, pointText, batsuText } from '../../lib/rule'

const WinLoseRule = ({ simple, rule }) => {
  const aboveText = value => value ? '以上' : '以下'

  const none = (
    <Box component="span" className="rule-element">
      なし
    </Box>
  )

  const win = rule => {
    const comprehensive = rule.comprehensive || initRule.player.comprehensive

    const list = [(
      rule.winPoint.active &&
      <Box component="span" className="rule-element" key="win-point">
        {rule.winPoint.value}{pointText(simple)}
        <Box component="span" className="rule-above">
          {aboveText(rule.winPoint.above)}
        </Box>
      </Box>
    ), (
      comprehensive.active &&
      <Box component="span" className="rule-element" key="win-comp-point">
        {comprehensive.winPoint.value}総合{pointText(simple)}
        <Box component="span" className="rule-above">
          {aboveText(comprehensive.winPoint.above)}
        </Box>
      </Box>
    )].filter(e => e)

    const numWin = (
      rule.winPlayers > 0 &&
      <Box component="span" className="rule-element">
        {rule.winPlayers}人
      </Box>
    )

    return (
      <>
        <Box component="span" className="rule-title">勝ち抜け</Box>
        {list.length > 0 ? <>{list}{numWin}</> : none}
      </>
    )
  }

  const lose = rule => {
    const list = [(
      rule.losePoint.active &&
      <Box component="span" className="rule-element" key="lose-point">
        {rule.losePoint.value}{pointText(simple)}
        <Box component="span" className="rule-above">
          {aboveText(rule.losePoint.above)}
        </Box>
      </Box>
    ), (
      rule.loseBatsu.active &&
      <Box component="span" className="rule-element" key="lose-batsu">
        {rule.loseBatsu.value}{batsuText(simple)}
        <Box component="span" className="rule-above">
          {aboveText(rule.loseBatsu.above)}
        </Box>
      </Box>
    )]

    return (
      <>
        <Box component="span" className="rule-title">失格</Box>
        {list.length > 0 ? list : none}
      </>
    )
  }

  return (
    <Box>
      <Typography variant="body2">{win(rule)} {lose(rule)}</Typography>
    </Box>
  )
}

export default WinLoseRule
