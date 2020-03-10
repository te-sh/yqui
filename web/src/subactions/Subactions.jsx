import React from 'react'
import { connect } from 'react-redux'
import Alert from './Alert'
import Master from './Master'
import Player from './Player'
import './Subactions.scss'

const setAlert = (buttons) => {
  const pushers = buttons.pushers.length
  const answerers = buttons.answerers.length

  if (answerers > 0 && pushers === answerers) {
    return 'multiChance'
  }

  return null
}

const Subactions = ({ isMaster, buttons }) => {
  const alert = setAlert(buttons)

  if (alert) {
    return <Alert alert={alert} />
  } else if (isMaster) {
    return <Master />
  } else {
    return <Player />
  }
}

export default connect(
  state => ({
    isMaster: state.isMaster,
    buttons: state.buttons,
    ruleText: state.ruleText
  })
)(Subactions)
