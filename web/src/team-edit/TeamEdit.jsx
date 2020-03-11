import React from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import update from 'immutability-helper'
import { setEditTeam } from '../redux/actions'
import Group from './Group'
import './TeamEdit.scss'

const TeamEdit = ({ editTeam, setEditTeam }) => {
  const droped = (item, destIndex) => {
    if (item.teamIndex === destIndex) {
      return
    }

    setEditTeam(
      update(editTeam, {
        teams: {
          [item.teamIndex]: { $splice: [[item.playerIndex, 1]] },
          [destIndex]: { $push: [item.player] }
        }
      })
    )
  }

  return (
    <Paper className="team-edit">
      <Group label="参加者" players={editTeam.teams[1]} teamIndex={1}
             droped={droped} />
      <Group label="観戦者" players={editTeam.teams[0]} teamIndex={0}
             droped={droped} />
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
