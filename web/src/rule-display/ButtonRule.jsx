import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../rule'
import './RuleDisplay.scss'

const ButtonRule = ({ rule, numPlayers }) => {
  const teamShareButton = (() => {
    if (rule.team.active && rule.team.shareButton) {
      return 'チームでボタンを共有'
    } else {
      return null
    }
  })()

  return (
    <Box>
      <Typography variant="caption">ボタン</Typography>
      <Typography>{chanceText(rule, numPlayers)}</Typography>
      <Typography visibility={teamShareButton}>{teamShareButton}</Typography>
    </Box>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers
  })
)(ButtonRule)
