import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { sendWs, SEND_TEAMS } from '../../lib/send'
import { setEditTeams } from '../../redux/actions'
import Team from './Team'
import './Teams.scss'

const Teams = ({ className, ws, teams, editTeams, setEditTeams }) => {
  const [localTeams, setLocalTeams] = React.useState(teams)

  React.useEffect(
    () => {
      setLocalTeams(editTeams ? editTeams : teams)
    },
    [teams, editTeams]
  )

  const changingPlayerOrder = React.useCallback(
    (dragTeamIndex, dragPlayerIndex, hoverPlayerIndex) => {
      const player = localTeams[dragTeamIndex].players[dragPlayerIndex]
      const newTeams = update(localTeams, {
        [dragTeamIndex]: {
          players: {
            $splice: [[dragPlayerIndex, 1], [hoverPlayerIndex, 0, player]]
          }
        }
      })
      setLocalTeams(newTeams)
    },
    [localTeams]
  )

  const changePlayerOrder = () => {
    if (editTeams) {
      setEditTeams(localTeams)
    } else {
      sendWs(ws, SEND_TEAMS, localTeams)
    }
  }

  const changePlayerTeam = React.useCallback(
    (dragTeamIndex, dragPlayerIndex, dropTeamIndex) => {
      if (editTeams) {
        const player = editTeams[dragTeamIndex].players[dragPlayerIndex]
        const newTeams = update(editTeams, {
          [dragTeamIndex]: {
            players: {
              $splice: [[dragPlayerIndex, 1]]
            }
          },
          [dropTeamIndex]: {
            players: {
              $push: [player]
            }
          }
        })
        setEditTeams(newTeams)
      }
    }
  )

  const teamComponent = (team, index) => (
    <Team key={index} team={team}
          index={index} observers={index === localTeams.length - 1}
          edit={!!editTeams}
          changingPlayerOrder={changingPlayerOrder}
          changePlayerOrder={changePlayerOrder}
          changePlayerTeam={changePlayerTeam} />
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
    teams: state.teams,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Teams)
