import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Tooltip, Typography } from '@material-ui/core'
import classNames from 'classnames'
import './RoomInfo.scss'

const RoomInfo = ({ className, browser: { mobile }, summary }) => {
  const masterName = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">司会</Box>
        <Box component="span" className="info-element master-name">
          {summary.masterName ? summary.masterName : '-'}
        </Box>
      </Typography>
    </Box>
  )

  const numPlayers = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">解答</Box>
        <Box component="span" className="info-element num-players">
          {summary.numPlayers}人
        </Box>
      </Typography>
    </Box>
  )

  const playerNames = summary.playerNames.map((name, i) => <div key={i}>{name}</div>)

  const numObservers = (
    <Box className="info-block">
      <Typography variant="body2">
        <Box component="span" className="info-title">観戦</Box>
        <Box component="span" className="info-element num-observers">
          {summary.numObservers}人
        </Box>
      </Typography>
    </Box>
  )

  const observerNames = summary.observerNames.map((name, i) => <div key={i}>{name}</div>)

  return (
    <Paper className={classNames(className, { mobile })}>
      {masterName}
      {summary.numPlayers > 0 ? <Tooltip title={playerNames}>{numPlayers}</Tooltip> : numPlayers}
      {summary.numObservers > 0 ? <Tooltip title={observerNames}>{numObservers}</Tooltip> : numObservers}
    </Paper>
  )
}

export default connect(
  state => ({
    browser: state.browser,
    summary: state.summary
  })
)(RoomInfo)
