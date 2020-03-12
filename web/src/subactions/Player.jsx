import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'

const Player = ({ className, ruleText }) => {
  return (
    <Paper className={className}>
      <Box className="content subactions-rule">
        <Typography>
          {ruleText.chance} {ruleText.correct} {ruleText.wrong}
        </Typography>
        <Typography>
          {ruleText.win} {ruleText.lose}
        </Typography>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ruleText: state.ruleText
  })
)(Player)
