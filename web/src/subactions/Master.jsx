import React from 'react'
import { connect } from 'react-redux'
import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@material-ui/core'
import { send } from '../communicate'
import { toggleTeamGame } from '../team'
import { setEditTeam } from '../redux/actions'

const Master = ({ ws, rule, ruleText, editTeam, setEditTeam }) => {
  const onToggleShowPoint = evt => {
    send.rule(ws, { showPoint: evt.target.checked })
  }

  const onToggleTeamGame = evt => {
    setEditTeam(toggleTeamGame(editTeam, evt.target.checked))
  }

  const klass = !editTeam ? 'master' : 'editTeam'

  return (
    <Paper className="subactions">
      <Box className="content subactions-rule"
           style={{ visibility: klass === 'master' ? 'visible' : 'hidden' }}>
        <Typography>
          {ruleText.chance} {ruleText.correct} {ruleText.wrong}
        </Typography>
        <Typography>
          {ruleText.win} {ruleText.lose}
        </Typography>
      </Box>
      <Box className="content subactions-actions"
           style={{ visibility: klass === 'master' ? 'visible' : 'hidden' }}>
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={rule.showPoint}
                      onChange={onToggleShowPoint} />
          }
          label="ポイント表示" />
      </Box>
      <Box className="content subactions-edit-team-actions"
           style={{ visibility: klass === 'editTeam' ? 'visible' : 'hidden' }}>
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={!!editTeam && editTeam.teamGame}
                      onChange={onToggleTeamGame} />
          }
          label="チーム戦" />
      </Box>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    rule: state.rule,
    ruleText: state.ruleText,
    editTeam: state.editTeam
  }),
  dispatch => ({
    setEditTeam: editTeam => dispatch(setEditTeam(editTeam))
  })
)(Master)
