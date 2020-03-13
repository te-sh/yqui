import React from 'react'
import { connect } from 'react-redux'
import Teams from './players/Teams'
import TeamEdit from './team-edit/TeamEdit'

const Mainarea = ({ className, editTeams }) => {
  if (editTeams) {
    return <TeamEdit className={className} />
  } else {
    return <Teams className={className} />
  }
}

export default connect(
  state => ({
    editTeams: state.editTeams
  })
)(Mainarea)
