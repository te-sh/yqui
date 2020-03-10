import React from 'react'
import { connect } from 'react-redux'
import Players from './players/Players'
import TeamEdit from './team-edit/TeamEdit'

const Mainarea = ({ editTeam }) => {
  if (editTeam) {
    return <TeamEdit />
  } else {
    return <Players />
  }
}

export default connect(
  state => ({
    editTeam: state.editTeam
  })
)(Mainarea)
