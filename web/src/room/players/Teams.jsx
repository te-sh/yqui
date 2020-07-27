import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_TEAMS } from '../../lib/send'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, ws, teams }) => {
  const [localTeams, setLocalTeams] = React.useState(teams)

  React.useEffect(
    () => {
      setLocalTeams(teams)
    },
    [teams]
  )

  const changePlayerOrder = React.useCallback(
    (dragTeamIndex, dragPlayerIndex, hoverPlayerIndex) => {
      const dragItem = teams[dragTeamIndex].players[dragPlayerIndex]
      const newTeams = update(teams, {
        [dragTeamIndex]: {
          players: {
            $splice: [[dragPlayerIndex, 1], [hoverPlayerIndex, 0, dragItem]]
          }
        }
      })
      setLocalTeams(newTeams)
    },
    [localTeams]
  )

  const changePlayerTeam = React.useCallback(
    (dragTeamIndex, dragPlayerIndex, dropTeamIndex) => {
      console.log(dragTeamIndex, dragPlayerIndex, dropTeamIndex)
    }
  )

  const updateTeams = () => {
    sendWs(ws, SEND_TEAMS, localTeams)
  }

  const teamComponent = (team, index) => (
    <Team key={team.id} team={team} index={index}
          changePlayerOrder={changePlayerOrder}
          changePlayerTeam={changePlayerTeam}
          updateTeams={updateTeams} />
  )

  return (
    <Paper className={classNames(className, 'teams')}>
      {localTeams.map(teamComponent)}
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    teams: state.teams
  })
)(Teams)
