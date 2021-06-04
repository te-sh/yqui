import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import classNames from 'classnames'
import { sendWs, SCORES } from '../../lib/send'
import { unsetEditScores } from '../../redux/score_actions'
import './Actions.scss'

const Score = ({ className, hidden, score: { edit }, unsetEditScores }) => {
  const endScore = () => {
    const scores = Object.fromEntries([...edit.scores.keys()].map(id => (
      [id, edit.scores.get(id)]
    )))
    sendWs(SCORES, scores)
    unsetEditScores()
  }

  const cancelScore = () => {
    unsetEditScores()
  }

  return (
    <Box className={classNames(className, 'edit-score-actions', { hidden })}>
      <Button variant="outlined" color="primary" size="large"
              className="end-edit-score-button"
              onClick={endScore}>
        設定
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              className="cancel-edit-score-button"
              onClick={cancelScore}>
        閉じる
      </Button>
    </Box>
  )
}

export default connect(
  state => ({
    score: state.score
  }),
  dispatch => ({
    unsetEditScores: () => dispatch(unsetEditScores())
  })
)(Score)
