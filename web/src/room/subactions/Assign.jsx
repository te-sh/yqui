import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormLabel, TextField } from '@material-ui/core'
import classNames from 'classnames'
import { changeNumTeams, randomAssignTeams } from '../../lib/assign'
import './Assign.scss'

const Assign = ({ className, hidden, numPlayers, dispTeams }) => {
  const [numTeams, setNumTeams] = React.useState('1')

  React.useEffect(
    () => {
      setNumTeams(dispTeams.length)
    },
    [dispTeams]
  )

  const validNumTeams = (() => {
    const n = parseInt(numTeams)
    return !isNaN(n) && n > 0 && n <= numPlayers
  })()

  return (
    <Box className={classNames(className, 'assign-subactions', { hidden })}>
      <FormLabel>チーム数</FormLabel>
      <TextField id="numTeams" type="number" className="num-teams"
                 inputProps={{ style: { textAlign: 'center' } }}
                 value={numTeams}
                 onChange={evt => setNumTeams(evt.target.value)} />
      <Button variant="outlined" disabled={!validNumTeams}
              onClick={() => changeNumTeams(parseInt(numTeams))}>
        チーム数変更
      </Button>
      <Button variant="outlined" disabled={!validNumTeams}
              onClick={randomAssignTeams}>
        ランダム配置
      </Button>
    </Box>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers,
    dispTeams: state.teams
  })
)(Assign)
