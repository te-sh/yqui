import React from 'react'
import { connect } from 'react-redux'
import Teams from './players/Teams'
import TeamEdit from './team-edit/TeamEdit'

const Mainarea = ({ className, editTeam }) => {
  if (editTeam) {
    return <TeamEdit className={className} />
  } else {
    return <Teams className={className} />
  }
}

export default connect(
  state => ({
    editTeam: state.editTeam
  })
)(Mainarea)
