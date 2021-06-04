import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import { isContinueingMultiChance } from '../../lib/buttons'
import Score from './Score'
import Alert from './Alert'
import Assign from './Assign'
import Master from './Master'
import Player from './Player'
import './Subactions.scss'

const Subactions = ({ className, browser: { mobile }, score, user, buttons, editTeams }) => {
  const alert = isContinueingMultiChance(buttons) ? 'multiChance' : null

  let status
  if (alert) {
    status = 'alert'
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
    buttons: state.buttons,
    editTeams: state.editTeams
  })
)(Subactions)
