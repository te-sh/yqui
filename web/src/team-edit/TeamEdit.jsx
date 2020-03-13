import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper } from '@material-ui/core'
import update from 'immutability-helper'
import classNames from 'classnames'
import { setEditTeams } from '../redux/actions'
import { normalizeTeams } from '../team'
import Group from './Group'
import './TeamEdit.scss'

const TeamEdit = ({ className, editTeams, setEditTeams }) => {
  const droped = (item, destIndex) => {
    if (item.teamIndex === destIndex) {
      return
    }

    const newEditTeams = update(editTeams, {
      [item.teamIndex]: { players: { $splice: [[item.playerIndex, 1]] }},
      [destIndex]: { players: { $push: [item.player] }}
    })

    setEditTeams(normalizeTeams(newEditTeams))
  }

  const playerGroups = (() => {
    return editTeams.slice(1).map((team, index) => (
      <Group key={index+1} label={`チーム${index + 1}`}
             team={team} teamIndex={index+1} droped={droped} />
    ))
  })()

  return (
    <Paper className={classNames(className, 'team-edit')}>
      <Box className="team-edit-groups groups-players">
        {playerGroups}
      </Box>
      <Box className="team-edit-groups groups-observers">
        <Group key={0} label="観戦者"
               players={editTeams[0]} teamIndex={0} droped={droped} />
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
)(TeamEdit)
