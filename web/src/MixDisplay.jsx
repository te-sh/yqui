import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { send } from './communicate'
import './MixDisplay.scss'

const MixDisplay = ({ ws, isMaster, buttons, rule, ruleText }) => {
  const [showPoint, setShowPoint] = React.useState(true)

  React.useEffect(
    () => {
      setShowPoint(rule.showPoint === undefined || rule.showPoint)
    },
    [rule.showPoint]
  )

  const pushers = buttons.pushers.length
  const answerers = buttons.answerers.length
  const isMultiChance = answerers > 0 && pushers === answerers

  const displayClass = classNames(
    'mix-display',
    { warning: isMultiChance }
  )

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
    buttons: state.buttons,
    rule: state.rule,
    ruleText: state.ruleText
  })
)(MixDisplay)
