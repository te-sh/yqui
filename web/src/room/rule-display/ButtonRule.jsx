import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { displayAttr } from '../../util'
import { chanceText } from '../../rule'
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
      <Box>
        <Typography variant="caption">ボタン</Typography>
      </Box>
      <Box>
        <Typography>{chanceText(rule, numPlayers)}</Typography>
      </Box>
      <Box {...displayAttr(teamShareButton)}>
        <Typography>{teamShareButton}</Typography>
      </Box>
    </Box>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers
  })
)(ButtonRule)
