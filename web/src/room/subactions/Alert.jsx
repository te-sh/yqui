import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { chanceText } from '../../lib/rule'

const Alert = ({ className, alert, mobile, rule, numPlayers }) => {
  const alertText = (() => {
    switch (alert) {
      case 'multiChance':
        return chanceText(mobile, rule, numPlayers) + '継続中'
      default:
        return ''
    }
  })()

  return (
    <Paper className={classNames(className, 'alert-subactions-container')}>
      <Box className="subactions-content alert-subactions">
        <Typography variant="h5">
          {alertText}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    rule: state.rule,
    numPlayers: state.numPlayers
  })
)(Alert)
