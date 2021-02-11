import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormLabel, Paper, TextField } from '@material-ui/core'
import { changeNumTeams, randomAssignTeams } from '../../lib/edit_team'
import './TeamEdit.scss'

const Master = ({ className, numPlayers, dispTeams }) => {
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
    <Paper className={className}>
      <Box className="subactions-content team-edit-subactions">
        <FormLabel>チーム数</FormLabel>
        <TextField id="numTeams" type="number" className="num-teams"
                   inputProps={{ style: { textAlign: 'center' } }}
                   value={numTeams}
                   onChange={evt => setNumTeams(evt.target.value)} />
        <Button variant="outlined"
                disabled={!validNumTeams}
                onClick={() => changeNumTeams(parseInt(numTeams))}>
          チーム数変更
        </Button>
        <Button variant="outlined"
                disabled={!validNumTeams}
                onClick={randomAssignTeams}>
          ランダム配置
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    numPlayers: state.numPlayers,
    dispTeams: state.teams
  })
)(Master)
