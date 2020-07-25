import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormLabel, Paper, TextField } from '@material-ui/core'
import { playersOfTeams, teamRandomAssign } from '../../lib/team'
import { sendWs, SEND_NUM_TEAMS } from '../../lib/send'
import { setEditTeams } from '../../redux/actions'
import './TeamEdit.scss'

const Master = ({ className, ws, teams, editTeams, setEditTeams }) => {
  const [numTeams, setNumTeams] = React.useState('1')

  React.useEffect(
    () => {
      setNumTeams(teams.length)
    },
    [teams]
  )

  const validNumTeams = (() => {
    const n = parseInt(numTeams)
    return !isNaN(n) && n > 0 && n <= playersOfTeams(editTeams).length
  })()

  const onSetNumTeams = () => {
    sendWs(ws, SEND_NUM_TEAMS, parseInt(numTeams))
  }

  const onAssignRandom = () => {
    setEditTeams(teamRandomAssign(editTeams, parseInt(numTeams)))
  }

  return (
    <Paper className={className}>
      <Box className="subactions-content subactions-team-edit">
        <FormLabel>チーム数</FormLabel>
        <TextField id="numTeams" type="number" className="num-teams"
                   inputProps={{ style: { textAlign: 'center' } }}
                   value={numTeams}
                   onChange={evt => setNumTeams(evt.target.value)} />
        <Button variant="outlined"
                disabled={!validNumTeams}
                onClick={onSetNumTeams}>
          チーム数変更
        </Button>
        <Button variant="outlined"
                disabled={!validNumTeams}
                onClick={onAssignRandom}>
          ランダム配置
        </Button>
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    teams: state.teams,
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Master)
