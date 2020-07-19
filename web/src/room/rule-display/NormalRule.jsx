import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { displayAttr } from '../../util'
import { winLoseText } from '../../rule'

const NormalRule = ({ display, rule }) => {
  const title = (() => {
    if (rule.board.active) {
      return '1着スコア'
    } else if (rule.team.active) {
      return '個人スコア'
    } else {
      return 'スコア'
    }
  })()

  const correctWrong = rule => {
    const correct = rule => {
      let text = `正解 ${rule.pointCorrect}ポイント`
      if (rule.bonusCorrect === 'cons') {
        text += ` (連答ボーナス)`
      }
      return text
    }

    const wrong = rule => {
      if (rule.pointWrong !== 0 || rule.batsuWrong !== 0 || rule.lockWrong !== 0) {
        let text = '誤答'
        if (rule.pointWrong !== 0) {
          text += ` ${rule.pointWrong}ポイント`
        }
        if (rule.batsuWrong !== 0) {
          text += ` ${rule.batsuWrong}バツ`
        }
        if (rule.lockWrong !== 0) {
          text += ` ${rule.lockWrong}休`
        }
        return text
      } else {
        return null
      }
    }

    return `${correct(rule)} ${wrong(rule)}`
  }

  return (
    <Box display={display}>
      <Box>
        <Typography variant="caption">{title}</Typography>
      </Box>
      <Box>
        <Typography>{correctWrong(rule.player)}</Typography>
      </Box>
      <Box {...displayAttr(!rule.board.active)}>
        <Typography>{winLoseText(rule.player)}</Typography>
      </Box>
    </Box>
  )
}

export default NormalRule
