import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Checkbox, FormControlLabel,
  FormLabel, Paper, TextField
} from '@material-ui/core'
import { toggleTeamGame, teamRandomAssign } from '../team'
import { setEditTeam } from '../redux/actions'
import './TeamEdit.scss'

const Master = ({ editTeam, setEditTeam }) => {
  const [numTeams, setNumTeams] = React.useState('1')

  const onToggleTeamGame = evt => {
    setEditTeam(toggleTeamGame(editTeam, evt.target.checked))
  }

  const validNumTeams = (() => {
    const n = parseInt(numTeams)
    return editTeam.teamGame && !isNaN(n) && n > 0 && n <= editTeam.teams.flat().length
  })()

  const onAssignRandom = () => {
    setEditTeam(teamRandomAssign(editTeam, parseInt(numTeams)))
  }

  return (
    <Paper className="subactions">
      <Box className="content subactions-team-edit">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={editTeam.teamGame}
                      onChange={onToggleTeamGame} />
          }
          label="チーム戦" />
        <FormLabel>チーム数</FormLabel>
        <TextField id="numTeams" type="number" className="num-teams"
                   inputProps={{ style: { textAlign: 'center' } }}
                   disabled={!editTeam.teamGame}
                   value={numTeams}
                   onChange={evt => setNumTeams(evt.target.value)} />
        <Button color="primary"
                disabled={!editTeam.teamGame || !validNumTeams}
                onClick={onAssignRandom}>
          ランダム配置
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    editTeam: state.editTeam
  }),
  dispatch => ({
    setEditTeam: editTeam => dispatch(setEditTeam(editTeam))
  })
)(Master)
