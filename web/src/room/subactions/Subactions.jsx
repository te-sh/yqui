import React from 'react'
import { connect } from 'react-redux'
import { isContinueingMultiChance } from '../../buttons'
import Alert from './Alert'
import Master from './Master'
import Player from './Player'
import TeamEdit from './TeamEdit'
import './Subactions.scss'

const Subactions = ({ className, isMaster, buttons, editTeams }) => {
  const alert = isContinueingMultiChance(buttons) ? 'multiChance' : null

  if (alert) {
    return <Alert className={className} alert={alert} />
  } else if (editTeams) {
    return <TeamEdit className={className} />
  } else if (isMaster) {
    return <Master className={className} />
  } else {
    return <Player className={className} />
  }
}

export default connect(
  state => ({
    isMaster: state.isMaster,
    buttons: state.buttons,
    editTeams: state.editTeams
  })
)(Subactions)