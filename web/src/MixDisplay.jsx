import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { send } from './communicate'
import './MixDisplay.scss'

const MixDisplay = ({ ws, isMaster, attendees, buttons, rule }) => {
  const [showPoint, setShowPoint] = React.useState(true)

  React.useEffect(
    () => {
      setShowPoint(rule.showPoint === undefined || rule.showPoint)
    },
    [rule.showPoint]
  )

  const pushersNum = buttons.pushers.length
  const isMultiChance = pushersNum > 0 && pushersNum < rule.rightNum && buttons.right === -1

  const displayClass = classNames(
    'mix-display',
    { warning: isMultiChance }
  )

  const ruleText = (() => {
    return {
      chance: (() => {
        if (rule.rightNum === 1) {
          return 'シングルチャンス'
        } else if (rule.rightNum >= attendees.players.length) {
          return 'エンドレスチャンス'
        } else if (rule.rightNum === 2) {
          return 'ダブルチャンス'
        } else if (rule.rightNum === 3) {
          return 'トリプルチャンス'
        } else {
          return rule.rightNum.toString() + 'チャンス'
        }
      })(),
      correct: (() => {
        if (rule.pointCorrect > 0) {
          return '正解 ' + rule.pointCorrect + 'ポイント'
        } else {
          return ''
        }
      })(),
      wrong: (() => {
        if (rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0) {
          let text = '誤答'
          if (rule.pointWrong !== 0) {
            text += ' ' + rule.pointWrong + 'ポイント'
          }
          if (rule.batsuWrong !== 0) {
            text += ' ' + rule.batsuWrong + 'バツ'
          }
          if (rule.lockWrong !== 0) {
            text += ' ' + rule.lockWrong + '休'
          }
          return text
        }
      })(),
      win: (() => {
        if (rule.winPoint.active) {
          return '勝ち抜け ' + rule.winPoint.value + 'ポイント'
        } else {
          return '勝ち抜けなし'
        }
      })(),
      lose: (() => {
        if (rule.losePoint.active || rule.loseBatsu.active) {
          let text = '失格'
          if (rule.losePoint.active) {
            text += ' ' + rule.losePoint.value + 'ポイント'
          }
          if (rule.loseBatsu.active) {
            text += ' ' + rule.loseBatsu.value + 'バツ'
          }
          return text
        } else {
          return '失格なし'
        }
      })()
    }
  })()

  const ruleClass = classNames(
    'mix-rule',
    { 'active': !isMultiChance }
  )

  const actionsClass = classNames(
    'mix-actions',
    { 'active': !isMultiChance && isMaster }
  )

  const multiChanceClass = classNames(
    'mix-multi-chance',
    { 'active': isMultiChance }
  )

  const changeShowPoint = evt => {
    send.rule(ws, { showPoint: evt.target.checked })
  }

  return (
    <Paper className={displayClass}>
      <Box className={ruleClass}>
        <Typography>
          {ruleText.chance} {ruleText.correct} {ruleText.wrong}
        </Typography>
        <Typography>
          {ruleText.win} {ruleText.lose}
        </Typography>
      </Box>
      <Box className={actionsClass}>
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={showPoint}
                      onChange={evt => changeShowPoint(evt)} />
          }
          label="ポイント表示" />
      </Box>
      <Box className={multiChanceClass}>
        <Typography variant="h5">
          {ruleText.chance}継続中
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    isMaster: state.isMaster,
    attendees: state.attendees,
    buttons: state.buttons,
    rule: state.rule
  })
)(MixDisplay)
