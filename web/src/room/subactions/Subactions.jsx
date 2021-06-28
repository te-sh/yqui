import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import Score from './Score'
import Alert from './Alert'
import Assign from './Assign'
import Master from './Master'
import Player from './Player'
import './Subactions.scss'

const Subactions = ({ className, browser: { mobile }, score, user, button, editTeams }) => {
  let status, alert
  if (button.continueingChance) {
    status = 'alert'
    alert = 'multiChance'
  } else if (score.edit) {
    status = 'score'
  } else if (editTeams) {
    status = 'assign'
  } else if (user.isMaster) {
    status = 'master'
  } else {
    status = 'player'
  }

  return (
    <Paper className={className}>
      <Alert className="subactions-content" hidden={status !== 'alert'} alert={alert} />
      {!mobile && <Score className="subactions-content" hidden={status !== 'score'} />}
      {!mobile && <Assign className="subactions-content" hidden={status !== 'assign'} />}
      {!mobile && <Master className="subactions-content" hidden={status !== 'master'} />}
      <Player className="subactions-content" hidden={status !== 'player'} />
    </Paper>
  )
}

export default connect(
  state => ({
    browser: state.browser,
    score: state.score,
    user: state.user,
    button: state.button,
    editTeams: state.editTeams
  })
)(Subactions)
