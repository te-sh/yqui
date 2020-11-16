import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../../lib/rule'
import ShareButtonHelp from '../rule-help/ShareButtonHelp'
import './RuleDisplay.scss'

const ButtonRule = ({ simple, rule, numPlayers }) => {
  const shareButtonComponent = (
    <Box>
      <Typography>チームでボタンを共有<ShareButtonHelp /></Typography>
    </Box>
  )

  return (
    <Box>
      <Box>
        <Typography variant="caption">ボタン</Typography>
      </Box>
      <Box>
        <Typography>{chanceText(simple, rule, numPlayers)}</Typography>
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
