import React from 'react'
import { Box, Typography } from '@material-ui/core'
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
    const correct = rule => (
      <>
        正解 {rule.pointCorrect}ポイント
        {rule.bonusCorrect === 'cons' && <> (連答ボーナス)</>}
      </>
    )

    const showWrong = rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0
    const wrong = rule => (
      <>
        誤答
        {rule.updown && <> アップダウン<UpdownHelpButton /></>}
        {rule.pointWrong !== 0 && !rule.updown && <> {rule.pointWrong}ポイント</>}
        {rule.batsuWrong !== 0 && <> {rule.batsuWrong}バツ</>}
        {rule.lockWrong !== 0 && <> {rule.lockWrong}休</>}
      </>
    )

    return (
      <Box>
        <Typography>{correct(rule)} {showWrong && wrong(rule)}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box>
        <Typography variant="caption">{title}</Typography>
      </Box>
      {correctWrong(rule.player)}
      {!rule.board.active && <WinLoseRule rule={rule.player} />}
    </Box>
  )
}

export default NormalRule
