import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import HelpButton from './HelpButton'

const PassQuizHelp = ({ size }) => {
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
      <span>
        <HelpButton size={size} />
      </span>
    </Tooltip>
  )
}

export default PassQuizHelp
