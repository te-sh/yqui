import React from 'react'
import { connect } from 'react-redux'
import { Box, FormGroup, FormLabel, TextField } from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import { setEditScore } from '../../redux/score_actions'
import { initialScore } from '../../redux/score_reducer'
import './EditPoint.scss'

const EditPoint = ({ className, player, score: { edit }, rule, setEditScore }) => {
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

  const changeWinTimes = value => {
    setEditScore(player, update(score, { winTimes: { $set: parseNumber(value) } }))
  }

  const point = (
    <FormGroup row={true} className="field">
      <FormLabel>ポイント</FormLabel>
      <TextField type="number" size="small"
                 className="point"
                 InputLabelProps={{ shrink: true }}
                 value={score.point}
                 onChange={evt => changePoint(evt.target.value)} />
    </FormGroup>
  )

  const batsu = (
    <FormGroup row={true} className="field">
      <FormLabel>バツ</FormLabel>
      <TextField type="number" size="small"
                 className="batsu"
                 value={score.batsu}
                 onChange={evt => changeBatsu(evt.target.value)} />
    </FormGroup>
  )

  const lock = (
    <FormGroup row={true} className="field">
      <FormLabel>休</FormLabel>
      <TextField type="number" size="small"
                 className="lock"
                 InputProps={{ inputProps: { min: 0 } }}
                 value={score.lock}
                 onChange={evt => changeLock(evt.target.value)} />
    </FormGroup>
  )

  const winTimes = (
    <FormGroup row={true} className="field">
      <FormLabel>勝抜回数</FormLabel>
      <TextField type="number" size="small"
                 className="win-times"
                 InputProps={{ inputProps: { min: 0 } }}
                 value={score.winTimes}
                 onChange={evt => changeWinTimes(evt.target.value)} />
    </FormGroup>
  )

  return (
    <Box className={className}>
      {point}
      {batsu}
      {lock}
      {rule.other.showWinTimes && winTimes}
    </Box>
  )
}

export default connect(
  state => ({
    score: state.score,
    rule: state.rule
  }),
  dispatch => ({
    setEditScore: (id, score) => dispatch(setEditScore(id, score))
  })
)(EditPoint)
