import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, dispTeams }) => {
  const refs = React.useRef([])
  const [teamHeight, setTeamHeight] = React.useState(null)
  const [teamHeightChanged, setTeamHeightChanged] = React.useState(Math.random())

  React.useEffect(
    () => {
      refs.current = refs.current.slice(0, dispTeams.length)
      setTeamHeight(null)
      setTeamHeightChanged(Math.random())
    },
    [dispTeams]
  )

  React.useEffect(
    () => {
      const maxHeight = Math.max(...refs.current.map(ref => ref.clientHeight))
      setTeamHeight(maxHeight)
    },
    [teamHeightChanged]
  )

  const teamComponent = (team, index) => (
    <div key={index} ref={el => { refs.current[index] = el }}
         className="team-container"
         style={{ height: teamHeight }}>
      <Team team={team} teamIndex={index} />
    </div>
  )

  return (
    <Paper className={className}>
      {dispTeams.map(teamComponent)}
    </Paper>
  )
}

export default connect(
  state => ({
    dispTeams: state.dispTeams
  })
)(Teams)
