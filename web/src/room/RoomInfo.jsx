import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Tooltip, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { isInTeams } from '../lib/team'
import './RoomInfo.scss'

const RoomInfo = ({ className, mobile, users, master, teams }) => {
  const masterName = master ? master.name : '-'

  const players = [...users.keys()].filter(id => !users.get(id).isMaster && isInTeams(teams, id))
  const numPlayers = players.length
  const playerNames = players.map(player => (<Box key={player}>{users.get(player).name}</Box>))

  const observers = [...users.keys()].filter(id => !users.get(id).isMaster && !isInTeams(teams, id))
  const numObservers = observers.length
  const observerNames = observers.map(observer => (<Box key={observer}>{users.get(observer).name}</Box>))

  const masterBox = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">司会</Box>
        <Box component="span" className="info-element master-name">
          {masterName}
        </Box>
      </Typography>
    </Box>
  )

  const numPlayersBox = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">解答</Box>
        <Box component="span" className="info-element num-players">
          {numPlayers}人
        </Box>
      </Typography>
    </Box>
  )

  const numObserversBox = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">観戦</Box>
        <Box component="span" className="info-element num-observers">
          {numObservers}人
        </Box>
      </Typography>
    </Box>
  )

  return (
    <Paper className={classNames(className, { mobile })}>
      {masterBox}
      {numPlayers > 0 ? <Tooltip title={playerNames}>{numPlayersBox}</Tooltip> : numPlayersBox}
      {numObservers > 0 ? <Tooltip title={observerNames}>{numObserversBox}</Tooltip> : numObserversBox}
    </Paper>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    users: state.users,
    master: state.master,
    teams: state.teams
  })
)(RoomInfo)
