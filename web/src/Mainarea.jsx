import React from 'react'
import { connect } from 'react-redux'
import Players from './players/Players'
import TeamEdit from './team-edit/TeamEdit'

const Mainarea = ({ className, editTeam }) => {
  if (editTeam) {
    return <TeamEdit className={className} />
  } else {
    return <Players className={className} />
  }
}

export default connect(
  state => ({
    editTeam: state.editTeam
  })
)(Mainarea)
