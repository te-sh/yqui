import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { chanceText } from '../../lib/rule'
import './Alert.scss'

const Alert = ({ className, hidden, alert, mobile, rule, summary: { numPlayers } }) => {
  const alertText = (() => {
    switch (alert) {
      case 'multiChance':
        return chanceText(mobile, rule, numPlayers) + '継続中'
      default:
        return ''
    }
  })()

  return (
    <Box className={classNames(className, 'alert-subactions', { hidden })}>
      <Typography variant="h5">
        {alertText}
      </Typography>
    </Box>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    rule: state.rule,
    summary: state.summary
  })
)(Alert)
