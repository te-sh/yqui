import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import ButtonRule from './ButtonRule'
import BoardScoreRule from './BoardScoreRule'
import ScoreRule from './ScoreRule'
import TeamScoreRule from './TeamScoreRule'
import './RuleDisplay.scss'

const RuleDisplay = ({ className, rule }) => {
  const showBoardRule = rule.board.active
  const showScoreRule = (rule.board.active && rule.board.applyNormal) || !rule.board.active
  const showTeamScoreRule = rule.team.active

  return (
    <Paper className={className}>
      <ButtonRule rule={rule} />
      {showBoardRule ? <BoardScoreRule rule={rule} /> : null}
      {showScoreRule ? <ScoreRule rule={rule} /> : null}
      {showTeamScoreRule ? <TeamScoreRule rule={rule} /> : null}
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule
  })
)(RuleDisplay)
