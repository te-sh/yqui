import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { chanceText } from '../../rule'

const Alert = ({ className, alert, rule, numPlayers }) => {
  const alertText = (() => {
    switch (alert) {
      case 'multiChance':
        return chanceText(rule, numPlayers) + '継続中'
      default:
        return ''
    }
  })()
  return (
    <Paper className={classNames(className, 'subactions-alert')}>
      <Box className="subactions-content">
        <Typography variant="h5">
          {alertText}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    numPlayers: state.numPlayers
  })
)(Alert)
