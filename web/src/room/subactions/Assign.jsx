import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormLabel, TextField } from '@material-ui/core'
import classNames from 'classnames'
import { changeNumTeams, randomAssignTeams } from '../../lib/assign'
import './Assign.scss'

const Assign = ({ className, hidden, numPlayers, rule, dispTeams }) => {
  const [numTeams, setNumTeams] = React.useState('1')

  React.useEffect(
    () => {
      setNumTeams(dispTeams.length)
    },
    [dispTeams]
  )

  const validNumTeams = (numTeams) => {
    const n = parseInt(numTeams)
    return !isNaN(n) && n > 0 && n <= numPlayers
  }

  const teamComponent = (
    <Box className="team-component">
      <FormLabel>チーム数</FormLabel>
      <TextField id="numTeams" type="number" className="num-teams"
                 inputProps={{ min: 1, style: { textAlign: 'center' } }}
                 value={numTeams}
                 onChange={evt => setNumTeams(evt.target.value)} />
      <Button variant="outlined" className="change-num-teams-button"
              disabled={!validNumTeams(numTeams)}
              onClick={() => changeNumTeams(parseInt(numTeams))}>
        チーム数変更
      </Button>
      <Button variant="outlined" className="random-assign-button"
              disabled={!validNumTeams(numTeams)}
              onClick={randomAssignTeams}>
        ランダム配置
      </Button>
    </Box>
  )

  return (
    <Box className={classNames(className, 'assign-subactions', { hidden })}>
      {rule.team.active && teamComponent}
    </Box>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers,
    rule: state.rule,
    dispTeams: state.teams
  })
)(Assign)
