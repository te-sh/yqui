import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import { displayAttr } from '../../lib/util'
import ButtonRule from './ButtonRule'
import BoardRule from './BoardRule'
import NormalRule from './NormalRule'
import TeamRule from './TeamRule'
import './RuleDisplay.scss'

const RuleDisplay = ({ className, rule }) => {
  const showBoardRule = rule.board.active
  const showNormalRule = (rule.board.active && rule.board.applyNormal) || !rule.board.active
  const showTeamRule = rule.team.active

  return (
    <Paper className={className}>
      <ButtonRule rule={rule} />
      <BoardRule {...displayAttr(showBoardRule)} rule={rule} />
      <NormalRule {...displayAttr(showNormalRule)} rule={rule} />
      <TeamRule {...displayAttr(showTeamRule)} rule={rule} />
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(RuleDisplay)
