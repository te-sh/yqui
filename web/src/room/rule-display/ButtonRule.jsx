import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { chanceText } from '../../lib/rule'
import ShareButtonHelp from '../rule-help/ShareButtonHelp'
import './RuleDisplay.scss'

const ButtonRule = ({ simple, rule, summary: { numPlayers } }) => {
  const shareButtonComponent = (
    <Box>
      <Typography variant="body2">チームでボタンを共有<ShareButtonHelp size="small" /></Typography>
    </Box>
  )

  return (
    <Box className="button-rule">
      <Typography variant="caption">
        <Box component="span" className="rule-caption">ボタン</Box>
      </Typography>
      <Box className="content">
        <Typography variant="body2">{chanceText(simple, rule, numPlayers)}</Typography>
      </Box>
      {rule.team.active && rule.team.shareButton && shareButtonComponent}
    </Box>
  )
}

export default connect(
  state => ({
    summary: state.summary
  })
)(ButtonRule)
