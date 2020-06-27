import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import ButtonRule from './ButtonRule'
import BoardScoreRule from './BoardScoreRule'
import ScoreRule from './ScoreRule'
import TeamScoreRule from './TeamScoreRule'
import './RuleDisplay.scss'

const RuleDisplay = ({ className, rule, teams }) => {
  const showBoardRule = rule.board
  const showScoreRule = (rule.board && rule.boardApplyNormal) || !rule.board
  const showTeamScoreRule = rule.team

  return (
    <Paper className={className}>
      <ButtonRule rule={rule} teams={teams} />
      {showBoardRule ? <BoardScoreRule rule={rule} /> : null}
      {showScoreRule ? <ScoreRule rule={rule} /> : null}
      {showTeamScoreRule ? <TeamScoreRule rule={rule} /> : null}
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    teams: state.teams
  })
)(RuleDisplay)
