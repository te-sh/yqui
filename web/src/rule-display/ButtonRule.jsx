import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { playersOfTeams } from '../team'
import './RuleDisplay.scss'

const ButtonRule = ({ rule, teams }) => {
  const chance = (() => {
    if (rule.rightNum === 1) {
      return 'シングルチャンス'
    } else if (rule.rightNum >= playersOfTeams(teams).length) {
      return 'エンドレスチャンス'
    } else if (rule.rightNum === 2) {
      return 'ダブルチャンス'
    } else if (rule.rightNum === 3) {
      return 'トリプルチャンス'
    } else {
      return `${rule.rightNum}チャンス`
    }
  })()

  const shareButton = (() => {
    if (teams.length > 1 && rule.shareButton) {
      return 'チームでボタンを共有'
    } else {
      return null
    }
  })()

  return (
    <Box>
      <Typography variant="caption">ボタン</Typography>
      <Typography>{chance}</Typography>
      {shareButton ? <Typography>{shareButton}</Typography> : null}
    </Box>
  )
}

export default ButtonRule
