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
    const sc = rule.specialCorrect
    const list = [(
      rule.pointCorrect !== 0 &&
      <Box component="span" className="rule-element" key="point-correct">
        {rule.pointCorrect}{pointText(simple)}
      </Box>
    ), (
      sc.consBonus &&
      <Box component="span" className="rule-element" key="cons-bonus">
        連答ボーナス<ConsBonusHelp size="small" />
      </Box>
    ), (
      sc.passQuiz &&
      <Box component="span" className="rule-element" key="pass-quiz">
        通過クイズ<PassQuizHelp size="small" />
      </Box>
    ), (
      sc.survival.active &&
      <Box component="span" className="rule-element" key="survival">
        サバイバル ({sc.survival.value}{pointText(simple)})<SurvivalHelp size="small" />
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
    const sw = rule.specialWrong
    const list = [(
      rule.pointWrong !== 0 && !sw.updown && !sw.backstream && !sw.divide &&
      <Box component="span" className="rule-element" key="point-wrong">
        {rule.pointWrong}{pointText(simple)}
      </Box>
    ), (
      sw.updown &&
      <Box component="span" className="rule-element" key="updown">
        アップダウン<UpdownHelp size="small" />
      </Box>
    ), (
      rule.batsuWrong !== 0 && !sw.swedish &&
      <Box component="span" className="rule-element" key="batsu-wrong">
        {rule.batsuWrong}{batsuText(simple)}
      </Box>
    ), (
      sw.swedish &&
      <Box component="span" className="rule-element" key="swedish">
        Swedish<SwedishHelp size="small" />
      </Box>
    ), (
      sw.backstream &&
      <Box component="span" className="rule-element" key="backstream">
        Backstream<BackstreamHelp size="small" />
      </Box>
    ), (
      sw.divide &&
      <Box component="span" className="rule-element" key="divide">
        Divide<DivideHelp size="small" />
      </Box>
    ), (
      sw.belowLock &&
      <Box component="span" className="rule-element" key="below-lock">
        BelowLock<BelowLockHelp size="small" />
      </Box>
    ), (
      rule.lockWrong !== 0 && !sw.belowLock &&
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
    rule.comprehensive.active &&
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
      <Typography variant="body2">{comp(rule)}</Typography>
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
