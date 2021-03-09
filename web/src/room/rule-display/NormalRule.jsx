import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { pointText, batsuText } from '../../lib/rule'
import ConsBonusHelp from '../rule-help/ConsBonusHelp'
import PassQuizHelp from '../rule-help/PassQuizHelp'
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

  const correct = rule => {
    const list = [(
      rule.pointCorrect !== 0 &&
      <Box component="span" className="rule-element" key="point-correct">
        {rule.pointCorrect}{pointText(simple)}
      </Box>
    ), (
      rule.specialCorrect.consBonus &&
      <Box component="span" className="rule-element" key="cons-bonus">
        連答ボーナス<ConsBonusHelp size="small" />
      </Box>
    ), (
      rule.specialCorrect.passQuiz &&
      <Box component="span" className="rule-element" key="pass-quiz">
        通過クイズ<PassQuizHelp size="small" />
      </Box>
    ), (
      rule.specialCorrect.survival.active &&
      <Box component="span" className="rule-element" key="survival">
        サバイバル ({rule.specialCorrect.survival.value}{pointText(simple)})<SurvivalHelp size="small" />
      </Box>
    )].filter(e => e)

    return list.length > 0 && (
      <>
        <Box component="span" className="rule-title">正解</Box>
        {list}
      </>
    )
  }

  const wrong = rule => {
    const list = [(
      rule.pointWrong !== 0 && !rule.specialWrong.updown &&
      <Box component="span" className="rule-element" key="point-wrong">
        {rule.pointWrong}{pointText(simple)}
      </Box>
    ), (
      rule.specialWrong.updown &&
      <Box component="span" className="rule-element" key="updown">
        アップダウン<UpdownHelp size="small" />
      </Box>
    ), (
      rule.batsuWrong !== 0 && !rule.specialWrong.swedish &&
      <Box component="span" className="rule-element" key="batsu-wrong">
        {rule.batsuWrong}{batsuText(simple)}
      </Box>
    ), (
      rule.specialWrong.swedish &&
      <Box component="span" className="rule-element" key="swedish">
        Swedish<SwedishHelp size="small" />
      </Box>
    ), (
      rule.specialWrong.backstream &&
      <Box component="span" className="rule-element" key="backstream">
        Backstream<BackstreamHelp size="small" />
      </Box>
    ), (
      rule.specialWrong.divide &&
      <Box component="span" className="rule-element" key="divide">
        Divide<DivideHelp size="small" />
      </Box>
    ), (
      rule.specialWrong.belowLock &&
      <Box component="span" className="rule-element" key="below-lock">
        BelowLock<BelowLockHelp size="small" />
      </Box>
    ), (
      rule.lockWrong !== 0 &&
      <Box component="span" className="rule-element" key="lock-wrong">
        {rule.lockWrong}休
      </Box>
    )].filter(e => e)

    return list.length > 0 && (
      <>
        <Box component="span" className="rule-title">誤答</Box>
        {list}
      </>
    )
  }

  const comp = rule => (
    <>
      <Box component="span" className="rule-title">総合ポイント</Box>
      <Box component="span" className="rule-element" key="mul">
        {rule.comprehensive.calc === 'mul' && <>{pointText(simple)}と{batsuText(simple)}の積</>}
        {rule.comprehensive.calc === 'sub' && <>{pointText(simple)}と{batsuText(simple)}の差</>}
      </Box>
    </>
  )

  const correctWrong = rule => (
    <Box>
      <Typography variant="body2">{correct(rule)} {wrong(rule)}</Typography>
      <Typography variant="body2">{rule.comprehensive.active && comp(rule)}</Typography>
    </Box>
  )

  return (
    <Box className="normal-rule">
      <Box className="title">
        <Typography variant="caption">{title}</Typography>
      </Box>
      <Box className="content">
        {correctWrong(rule.player)}
        {!rule.board.active && <WinLoseRule simple={simple} rule={rule.player} />}
      </Box>
    </Box>
  )
}

export default NormalRule
