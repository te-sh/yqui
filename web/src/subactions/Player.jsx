import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Typography } from '@material-ui/core'

const Player = ({ ruleText }) => {
  return (
    <Paper className="subactions">
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
