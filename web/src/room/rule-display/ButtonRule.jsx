import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../../lib/rule'
import ShareButtonHelpButton from '../rule-help/ShareButtonHelpButton'
import './RuleDisplay.scss'

const ButtonRule = ({ rule, numPlayers }) => {
  const shareButtonComponent = (
    <Box>
      <Typography>チームでボタンを共有<ShareButtonHelpButton /></Typography>
    </Box>
  )

  return (
    <Box>
      <Box>
        <Typography variant="caption">ボタン</Typography>
      </Box>
      <Box>
        <Typography>{chanceText(rule, numPlayers)}</Typography>
      </Box>
      {rule.team.active && rule.team.shareButton && shareButtonComponent}
    </Box>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers
  })
)(ButtonRule)
