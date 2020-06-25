import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { chanceText } from '../util'

const Alert = ({ className, alert, rule, teams }) => {
  const alertText = (() => {
    switch (alert) {
      case 'multiChance':
        return chanceText(rule, teams) + '継続中'
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
    teams: state.teams
  })
)(Alert)
