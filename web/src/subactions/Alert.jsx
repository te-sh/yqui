import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'

const Alert = ({ alert, ruleText }) => {
  const alertText = (() => {
    switch (alert) {
      case 'multiChance':
        return ruleText.chance + '継続中'
      default:
        return ''
    }
  })()
  return (
    <Paper className="subactions subactions-alert">
      <Box className="content">
        <Typography variant="h5">
          {alertText}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ruleText: state.ruleText
  })
)(Alert)
