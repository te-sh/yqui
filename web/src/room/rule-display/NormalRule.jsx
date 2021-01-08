import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import ConsBonusHelp from '../rule-help/ConsBonusHelp'
import SurvivalHelp from '../rule-help/SurvivalHelp'
import UpdownHelp from '../rule-help/UpdownHelp'
import SwedishHelp from '../rule-help/SwedishHelp'
import BackstreamHelp from '../rule-help/BackstreamHelp'
import DivideHelp from '../rule-help/DivideHelp'
import BelowLockHelp from '../rule-help/BelowLockHelp'
import WinLoseRule from './WinLoseRule'

const NormalRule = ({ simple, rule }) => {
  const title = (() => {
    if (rule.board.active) {
      return '1着スコア'
    } else if (rule.team.active) {
      return '個人スコア'
    } else {
      return 'スコア'
    }
  })()

  const consBonus = (
    <> 連答ボーナス<ConsBonusHelp size="small" /></>
  )

  const survival = rule => (
    <> サバイバル ({rule.specialCorrect.survival.value}{pointText(simple)})<SurvivalHelp size="small" /></>
  )

  const correctWrong = rule => {
    const correct = rule => (
      <>
        正解 {rule.pointCorrect}{pointText(simple)}
        {rule.specialCorrect.consBonus && consBonus}
        {rule.specialCorrect.survival.active && survival(rule)}
      </>
    )

    const showWrong = rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0 || rule.updown

    const wrong = rule => (
      <>
        誤答
        {rule.specialWrong.updown && <> アップダウン<UpdownHelp size="small" /></>}
        {rule.pointWrong !== 0 && !rule.specialWrong.updown && <> {rule.pointWrong}{pointText(simple)}</>}
        {rule.specialWrong.swedish && <> Swedish<SwedishHelp size="small" /></>}
        {rule.specialWrong.backstream && <> Backstream<BackstreamHelp size="small" /></>}
        {rule.specialWrong.divide && <> Divide<DivideHelp size="small" /></>}
        {rule.specialWrong.belowLock && <> BelowLock<BelowLockHelp size="small" /></>}
        {rule.batsuWrong !== 0 && !rule.specialWrong.swedish && <> {rule.batsuWrong}{batsuText(simple)}</>}
        {rule.lockWrong !== 0 && <> {rule.lockWrong}休</>}
      </>
    )

    const comp = rule => (
      <>
        総合ポイント
        {rule.comprehensive.calc === 'mul' && <> {pointText(simple)}と{batsuText(simple)}の積</>}
        {rule.comprehensive.calc === 'sub' && <> {pointText(simple)}と{batsuText(simple)}の差</>}
      </>
    )

    return (
      <Box>
        <Typography variant="body2">{correct(rule)} {showWrong && wrong(rule)}</Typography>
        {rule.comprehensive.active && <Typography variant="body2">{comp(rule)}</Typography>}
      </Box>
    )
  }

  return (
    <Box>
      <Box>
        <Typography variant="caption">{title}</Typography>
      </Box>
      {correctWrong(rule.player)}
      {!rule.board.active && <WinLoseRule simple={simple} rule={rule.player} passQuiz={rule.other.passQuiz} />}
    </Box>
  )
}

export default NormalRule
