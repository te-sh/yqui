import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import classNames from 'classnames'
import { sendWs, CLEAR } from '../../lib/send'
import { clearEditBoards } from '../../redux/board_actions'
import './Master.scss'

const Clear = ({ className, rule, clearEditBoards }) => {
  const onClear = winTimes => {
    clearEditBoards()
    sendWs(CLEAR, { winTimes })
  }

  const allClear = (
    <Button variant="outlined" color="default" className="all-clear-button"
            onClick={() => onClear(true)}>
      オールクリア
    </Button>
  )

  const scoreClear = (
    <Button variant="outlined" color="default" className="score-clear-button"
            onClick={() => onClear(false)}>
      スコアクリア
    </Button>
  )

  return (
    <Box className={classNames(className, 'clear')}>
      {allClear}
      {rule.other.showWinTimes && scoreClear}
    </Box>
  )
}

export default connect(
  state => ({
    rule: state.rule
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Clear)
