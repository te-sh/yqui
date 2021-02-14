import React from 'react'
import { connect } from 'react-redux'
import Master from './Master'
import Player from './Player'
import Assign from './Assign'

const Actions = ({ className, user, editTeams }) => {
  if (editTeams) {
    return <Assign className={className} />
  } else if (user.isMaster) {
    return <Master className={className} />
  } else {
    return <Player className={className} />
  }
}

export default connect(
  state => ({
    user: state.user,
    editTeams: state.editTeams
  })
)(Actions)
