import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Box, Paper, Typography } from '@material-ui/core'
import ItemTypes from '../../lib/item_types'
import Players from './Players'
import PlayerPoint from './PlayerPoint'
import PlayerStatus from './PlayerStatus'
import './Team.scss'

const Team = ({ team, index, movePlayer, updateTeams, sg, rule }) => {
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
      droped(item, index)
    }
  })

  const droped = (_item, _index) => {
  }

  const teamScore = sg.team.scores.get(team.id)
  const teamClass = classNames('team', {
    hover,
    'multi-team': rule.team.active
  })

  return (
    <Box key={team.id} className={teamClass} ref={dropRef}>
      <Box className="team-point" hidden={!rule.team.active}>
        <Typography align="center">
          チーム得点
        </Typography>
        <Paper className="player">
          <PlayerPoint score={teamScore} />
          <PlayerStatus score={teamScore} className="player-status" />
        </Paper>
      </Box>
      <Players team={team} teamIndex={index}
               movePlayer={movePlayer} updateTeams={updateTeams} />
    </Box>
  )
}

export default connect(
  state => ({
    sg: state.sg,
    rule: state.rule
  })
)(Team)
