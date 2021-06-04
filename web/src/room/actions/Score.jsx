import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import classNames from 'classnames'
import { unsetEditScores } from '../../redux/score_actions'
import './Actions.scss'

const Score = ({ className, hidden, unsetEditScores }) => {
  const endScore = () => {
    unsetEditScores()
  }

  const cancelScore = () => {
    unsetEditScores()
  }

  return (
    <Box className={classNames(className, 'score-actions', { hidden })}>
      <Button variant="outlined" color="primary" size="large"
              className="end-score-button"
              onClick={endScore}>
        設定
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              className="cancel-score-button"
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
