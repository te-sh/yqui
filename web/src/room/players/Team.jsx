import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import ItemTypes from '../../lib/item_types'
import { classNamesK } from '../../lib/util'
import { initScore } from '../../lib/score'
import { movePlayerTeam } from '../../lib/assign'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import './Team.scss'

const Team = ({ team, teamIndex, sg, rule, editTeams }) => {
  const [hover, setHover] = React.useState(false)

  const [, dropRef] = useDrop({
    accept: ItemTypes.PLAYER,
    collect: (monitor, _props) => {
      const item = monitor.getItem()
      if (!item) {
        return
      }
      const dragTeamIndex = item.teamIndex
      if (dragTeamIndex === teamIndex || !editTeams) {
        return
      }
      setHover(monitor.isOver())
    },
    drop: (item, _monitor) => {
      const dragTeamIndex = item.teamIndex
      const dragPlayerIndex = item.playerIndex
      if (dragTeamIndex === teamIndex || !editTeams) {
        return
      }
      movePlayerTeam(dragTeamIndex, dragPlayerIndex, teamIndex)
    }
  })

  const teamScore = sg.team.scores.get(team.id) || initScore
  const teamClass = classNamesK('team', {
    hover,
    edit: !!editTeams,
    multiTeam: rule.team.active
  })

  const title = team => {
    if (team.observers) {
      return '観戦席'
    } else if (!rule.team.active) {
      return '解答席'
    } else {
      return `チーム${teamIndex + 1}`
    }
  }

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
    <Box className="team-title">
      <Typography align="center">
        {title(team)}
      </Typography>
    </Box>
  )

  return (
    <Box key={team.id} className={teamClass} ref={dropRef}>
      {!editTeams ? pointComponent : titleComponent}
      <Players team={team} teamIndex={teamIndex} />
    </Box>
  )
}

export default connect(
  state => ({
    sg: state.sg,
    rule: state.rule,
    editTeams: state.editTeams
  })
)(Team)
