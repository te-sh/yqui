import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import ButtonRule from './ButtonRule'
import BoardScoreRule from './BoardScoreRule'
import ScoreRule from './ScoreRule'
import TeamScoreRule from './TeamScoreRule'
import './RuleDisplay.scss'

const RuleDisplay = ({ className, rule, teams }) => {
  return (
    <Paper className={className}>
      <ButtonRule rule={rule} teams={teams} />
      {rule.board ? <BoardScoreRule rule={rule} /> : null}
      {rule.board && rule.boardApplyNormal ? <ScoreRule rule={rule} teams={teams} /> : null}
      {teams.length > 1 ? <TeamScoreRule rule={rule} /> : null}
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    teams: state.teams
  })
)(RuleDisplay)
