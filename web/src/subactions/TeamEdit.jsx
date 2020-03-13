import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormLabel, Paper, TextField } from '@material-ui/core'
import { teamRandomAssign } from '../team'
import { setEditTeams } from '../redux/actions'
import './TeamEdit.scss'

const Master = ({ className, editTeams, setEditTeams }) => {
  const [numTeams, setNumTeams] = React.useState('1')

  const validNumTeams = (() => {
    const n = parseInt(numTeams)
    return !isNaN(n) && n > 0 && n <= editTeams.flatMap(team => team.players).length
  })()

  const onAssignRandom = () => {
    setEditTeams(teamRandomAssign(editTeams, parseInt(numTeams)))
  }

  return (
    <Paper className={className}>
      <Box className="content subactions-team-edit">
        <FormLabel>チーム数</FormLabel>
        <TextField id="numTeams" type="number" className="num-teams"
                   inputProps={{ style: { textAlign: 'center' } }}
                   value={numTeams}
                   onChange={evt => setNumTeams(evt.target.value)} />
        <Button color="primary"
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
    editTeams: state.editTeams
  }),
  dispatch => ({
    setEditTeams: editTeams => dispatch(setEditTeams(editTeams))
  })
)(Master)
