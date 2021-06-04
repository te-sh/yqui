import React from 'react'
import { connect } from 'react-redux'
import { Box, TextField } from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import { setEditScore } from '../../redux/score_actions'
import { initialScore } from '../../redux/score_reducer'
import './EditPoint.scss'

const EditPoint = ({ className, player, score: { edit }, setEditScore }) => {
  const score = edit.scores.get(player) || initialScore

  const changePoint = value => {
    setEditScore(player, update(score, { point: { $set: parseNumber(value) } }))
  }

  const changeBatsu = value => {
    setEditScore(player, update(score, { batsu: { $set: parseNumber(value) } }))
  }

  const changeLock = value => {
    setEditScore(player, update(score, { lock: { $set: parseNumber(value) } }))
  }

  return (
    <Box className={className}>
      <TextField label="ポイント" type="number"
                 className="point"
                 value={score.point}
                 onChange={evt => changePoint(evt.target.value)} />
      <TextField label="バツ" type="number"
                 className="batsu"
                 value={score.batsu}
                 onChange={evt => changeBatsu(evt.target.value)} />
      <TextField label="休" type="number"
                 className="lock"
                 InputProps={{ inputProps: { min: 0 } }}
                 value={score.lock}
                 onChange={evt => changeLock(evt.target.value)} />
    </Box>
  )
}

export default connect(
  state => ({
    score: state.score
  }),
  dispatch => ({
    setEditScore: (id, score) => dispatch(setEditScore(id, score))
  })
)(EditPoint)
