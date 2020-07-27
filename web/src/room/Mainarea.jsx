import React from 'react'
import { connect } from 'react-redux'
import Teams from './players/Teams'

const Mainarea = ({ className }) => {
  return <Teams className={className} />
}

export default connect(
  state => ({
    editTeams: state.editTeams
  })
)(Mainarea)
