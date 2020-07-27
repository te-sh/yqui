import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import classNames from 'classnames'
import { Box, Paper, Typography } from '@material-ui/core'
import ItemTypes from '../../lib/item_types'
import { initScore } from '../../lib/score'
import { setEditTeams } from '../../redux/actions'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import './Team.scss'

const Team = ({ team, index, teams, sg, rule, editTeams, setEditTeams }) => {
  const curTeams = editTeams ? editTeams : teams
  const [hover, setHover] = React.useState(false)

  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    collect(monitor, _props) {
      const item = monitor.getItem()
      if (!item) {
        return
      }
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex === index) {
        return
      }
      setHover(monitor.isOver())
    },
    drop(item, _monitor) {
      if (index === item.teamIndex) {
        return
      }
      const dragTeamIndex = item.teamIndex
      const dragPlayerIndex = item.playerIndex
      changePlayerTeam(dragTeamIndex, dragPlayerIndex)
    }
  })

  const changePlayerTeam = React.useCallback(
    (dragTeamIndex, dragPlayerIndex) => {
      if (editTeams) {
        const player = editTeams[dragTeamIndex].players[dragPlayerIndex]
        const newTeams = update(editTeams, {
          [dragTeamIndex]: {
            players: {
              $splice: [[dragPlayerIndex, 1]]
            }
          },
          [index]: {
            players: {
              $push: [player]
            }
          }
        })
        setEditTeams(newTeams)
      }
    }
  )

  const observers = editTeams && index === curTeams.length - 1
  const teamScore = sg.team.scores.get(team.id) || initScore
  const teamClass = classNames('team', {
    hover,
    'edit': !!editTeams,
    'multi-team': rule.team.active
  })

  const pointComponent = (
    <Box className="team-point" hidden={!rule.team.active}>
      <Typography align="center">
        チーム得点
      </Typography>
      <Paper className="player">
        <PlayerPoint score={teamScore} />
        <PlayerStatus score={teamScore} className="player-status" />
      </Paper>
    </Box>
  )

  const titleComponent = (
    <Box>
      <Typography>{!observers ? `チーム${index + 1}` : `観戦者`}</Typography>
    </Box>
  )

  return (
    <Box key={team.id} className={teamClass} ref={dropRef}>
      {!editTeams ? pointComponent : titleComponent}
      <Players team={team} teamIndex={index} />
    </Box>
  )
}

export default connect(
  state => ({
    teams: state.teams,
    sg: state.sg,
    rule: state.rule,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Team)
