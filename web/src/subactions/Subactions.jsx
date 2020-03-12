import React from 'react'
import { connect } from 'react-redux'
import Alert from './Alert'
import Master from './Master'
import Player from './Player'
import TeamEdit from './TeamEdit'
import './Subactions.scss'

const setAlert = (buttons) => {
  const pushers = buttons.pushers.length
  const answerers = buttons.answerers.length

  if (answerers > 0 && pushers === answerers) {
    return 'multiChance'
  }

  return null
}

const Subactions = ({ className, isMaster, buttons, editTeam }) => {
  const alert = setAlert(buttons)

  if (alert) {
    return <Alert className={className} alert={alert} />
  } else if (editTeam) {
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
    editTeam: state.editTeam
  })
)(Subactions)
