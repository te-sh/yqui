import React from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const PassQuizHelp = () => {
  const tooltip = (
    <>
      <Typography variant="body2">
        ポイントが勝ち抜け条件を満たす状態になったら通過席につきます.
      </Typography>
      <Typography variant="body2">
        通過席についているときに正解すると勝ち抜けです.
      </Typography>
      <Typography variant="body2">
        通過席についているときに誤答した場合, もしくは他の人が正解した場合はポイントが初期値になります.
      </Typography>
      <Typography variant="body2">
        通過席についているときに誤答した場合はポイント以外の誤答罰も適用されます.
      </Typography>
    </>
  )

  return (
    <Tooltip title={tooltip}>
      <IconButton size="small" edge="start">
        <Help />
      </IconButton>
    </Tooltip>
  )
}

export default PassQuizHelp
