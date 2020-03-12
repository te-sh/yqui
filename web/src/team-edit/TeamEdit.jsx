import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import { setEditTeam } from '../redux/actions'
import { normalizeTeams } from '../team'
import Group from './Group'
import './TeamEdit.scss'

const TeamEdit = ({ className, editTeam, setEditTeam }) => {
  const droped = (item, destIndex) => {
    if (item.teamIndex === destIndex) {
      return
    }

    const newEditTeam = update(editTeam, {
      teams: {
        [item.teamIndex]: { $splice: [[item.playerIndex, 1]] },
        [destIndex]: { $push: [item.player] }
      }
    })

    if (editTeam.teamGame) {
      newEditTeam.teams = normalizeTeams(newEditTeam.teams)
    }

    setEditTeam(newEditTeam)
  }

  const playerGroups = (() => {
    if (editTeam.teamGame) {
      return editTeam.teams.slice(1).map((team, index) => (
        <Group key={index+1} label={'チーム' + (index+1).toString()}
               players={team} teamIndex={index+1} droped={droped} />
      ))
    } else {
      return (
        <Group key={1} label="参加者"
               players={editTeam.teams[1]} teamIndex={1} droped={droped} />
      )
    }
  })()

  return (
    <Paper className={classNames(className, 'team-edit')}>
      <Box className="team-edit-groups groups-players">
        {playerGroups}
      </Box>
      <Box className="team-edit-groups groups-observers">
        <Group key={0} label="観戦者"
               players={editTeam.teams[0]} teamIndex={0} droped={droped} />
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
)(TeamEdit)
