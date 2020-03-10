import React from 'react'
import { connect } from 'react-redux'
import Master from './Master'
import Player from './Player'
import TeamEdit from './TeamEdit'

const Actions = ({ isMaster, teamEdit }) => {
  if (teamEdit) {
    return <TeamEdit teamEdit={teamEdit} />
  } else if (isMaster) {
    return <Master />
  } else {
    return <Player />
  }
}

export default connect(
  state => ({
    isMaster: state.isMaster
  })
)(Actions)
