import React from 'react'
import { connect } from 'react-redux'
import Master from './Master'
import Player from './Player'
import TeamEdit from './TeamEdit'

const Actions = ({ className, isMaster, editTeam }) => {
  if (editTeam) {
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
    editTeam: state.editTeam
  })
)(Actions)
