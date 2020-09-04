import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import ButtonRule from './ButtonRule'
import BoardRule from './BoardRule'
import NormalRule from './NormalRule'
import TeamRule from './TeamRule'
import './RuleDisplay.scss'

const RuleDisplay = ({ className, mobile, rule }) => {
  const showBoardRule = rule.board.active
  const showNormalRule = (rule.board.active && rule.board.applyNormal) || !rule.board.active
  const showTeamRule = rule.team.active

  return (
    <Paper className={className}>
      <ButtonRule simple={mobile} rule={rule} />
      {showBoardRule && <BoardRule simple={mobile} rule={rule} />}
      {showNormalRule && <NormalRule simple={mobile} rule={rule} />}
      {showTeamRule && <TeamRule simple={mobile} rule={rule} />}
    </Paper>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    rule: state.rule
  })
)(RuleDisplay)
