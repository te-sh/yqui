import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import Assign from './Assign'
import Master from './Master'
import Observer from './Observer'
import Player from './Player'

const Actions = ({ className, mobile, user, isPlayer, editTeams }) => {
  let status
  if (editTeams) {
    status = 'assign'
  } else if (user.isMaster) {
    status = 'master'
  } else if (!isPlayer) {
    status = 'observer'
  } else {
    status = 'player'
  }

  return (
    <Paper className={className}>
      {!mobile && <Assign className="actions-content" hidden={status !== 'assign'} />}
      {!mobile && <Master className="actions-content" hidden={status !== 'master'} />}
      <Observer className="actions-content" hidden={status !== 'observer'} />
      <Player className="actions-content" hidden={status !== 'player'} />
    </Paper>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    user: state.user,
    isPlayer: state.isPlayer,
    editTeams: state.editTeams
  })
)(Actions)
