import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { displayAttr } from '../../lib/util'
import UpdownHelpButton from '../rule-help/UpdownHelpButton'
import WinLoseRule from './WinLoseRule'

const NormalRule = ({ rule }) => {
  const title = (() => {
    if (rule.board.active) {
      return '1着スコア'
    } else if (rule.team.active) {
      return '個人スコア'
    } else {
      return 'スコア'
    }
  })()

  const correctWrong = rule => {
    const correct = rule => {
      return (
        <>
          正解 {rule.pointCorrect}ポイント
          {rule.bonusCorrect === 'cons' && <> (連答ボーナス)</>}
        </>
      )
    }

    const wrong = rule => {
      if (rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0) {
        return (
          <>
            誤答
            {rule.updown && <> アップダウン<UpdownHelpButton /></>}
            {rule.pointWrong !== 0 && !rule.updown && <> {rule.pointWrong}ポイント</>}
            {rule.batsuWrong !== 0 && <> {rule.batsuWrong}バツ</>}
            {rule.lockWrong !== 0 && <> {rule.lockWrong}休</>}
          </>
        )
      } else {
        return null
      }
    }

    return <>{correct(rule)} {wrong(rule)}</>
  }

  return (
    <Box>
      <Box>
        <Typography variant="caption">{title}</Typography>
      </Box>
      <Box>
        <Typography>{correctWrong(rule.player)}</Typography>
      </Box>
      <Box {...displayAttr(!rule.board.active)}>
        <Typography><WinLoseRule rule={rule.player} /></Typography>
      </Box>
    </Box>
  )
}

export default NormalRule
