import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, FormControlLabel, IconButton, Switch, Typography
} from '@material-ui/core'
import { DoubleArrow, Pause, PlayArrow } from '@material-ui/icons'
import classNames from 'classnames'
import update from 'immutability-helper'
import { minSecTime } from '../../lib/util'
import {
  sendWs, ALL_CLEAR, WIN_TOP, LOSE_BOTTOM, RULE, BOARD_LOCK, BOARDS, TOGGLE_TIMER
} from '../../lib/send'
import { beginAssign } from '../../lib/assign'
import { clearEditBoards } from '../../redux/board_actions'
import './Master.scss'

const Master = ({ className, hidden, board: { bg }, rule, timer, clearEditBoards }) => {
  const [menu, setMenu] = React.useState('normal')

  React.useEffect(
    () => {
      if (!rule.board.active) {
        setMenu('normal')
      }
    },
    [rule]
  )

  const onAllClear = () => {
    clearEditBoards()
    sendWs(ALL_CLEAR)
  }

  const toggleBoardLock = () => {
    sendWs(BOARD_LOCK, !bg.lock)
  }

  const onOpenAll = () => {
    const boards = Object.fromEntries([...bg.boards.keys()].map(id => (
      [id, update(bg.boards.get(id), { open: { $set: true } })]
    )))
    clearEditBoards()
    sendWs(BOARDS, boards)
  }

  const winTop = () => {
    sendWs(WIN_TOP)
  }

  const loseBottom = () => {
    sendWs(LOSE_BOTTOM)
  }

  const toggleTimer = () => {
    sendWs(TOGGLE_TIMER)
  }

  const toggleShowPoint = evt => {
    sendWs(RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  const menuToBoard = (
    <Box>
      <Button onClick={() => setMenu('board')}>
        ボード <DoubleArrow />
      </Button>
    </Box>
  )

  const menuToNormal = (
    <Box>
      <Button onClick={() => setMenu('normal')}>
        通常 <DoubleArrow />
      </Button>
    </Box>
  )

  const menuSelect = menu === 'normal' ? menuToBoard : menuToNormal

  const timerComponent = (
    <Box className="group timer">
      <Typography>
        タイマー
      </Typography>
      <Typography variant="h6"
                  className={classNames('timer-remaining', { running: timer.running })}>
        {minSecTime(timer.remaining)}
      </Typography>
      <IconButton size="small"
                  className="start-timer-button"
                  disabled={timer.running}
                  onClick={toggleTimer}>
        <PlayArrow />
      </IconButton>
      <IconButton size="small"
                  className="pause-timer-button"
                  disabled={!timer.running}
                  onClick={toggleTimer}>
        <Pause />
      </IconButton>
    </Box>
  )

  const normalMenu = (
    <Box className="content normal">
      <Box className="group all-clear">
        <Button variant="outlined" color="default" className="all-clear-button"
                onClick={onAllClear}>
          オールクリア
        </Button>
      </Box>
      <Box className="group win-lose">
        <Button variant="outlined" color="default" className="win-top-button"
                onClick={winTop}>
          最上位勝ち抜け
        </Button>
        <Button variant="outlined" color="default" className="lose-bottom-button"
                onClick={loseBottom}>
          最下位失格
        </Button>
      </Box>
      {rule.other.timer.active && timerComponent}
      <Box className="group show-point">
        <FormControlLabel
          control={
            <Switch color="primary" className="show-point"
                    checked={rule.showPoint}
                    onChange={toggleShowPoint} />
          }
          label="ポイント表示" />
      </Box>
      <Box className="group edit">
        <Button variant="outlined" color="default" className="assign-button"
                onClick={beginAssign}>
          解答者割当
        </Button>
      </Box>
    </Box>
  )

  const boardMenu = (
    <Box className="content board">
      <FormControlLabel
        control={
          <Switch color="primary" className="show-point"
                  checked={bg.lock}
                  onChange={toggleBoardLock} />
        }
        label="解答ロック" />
      <Button variant="outlined" color="default" className="open-all-button"
              onClick={onOpenAll}>
        すべてオープン
      </Button>
    </Box>
  )

  return (
    <Box className={classNames(className, 'master-subactions', { hidden })}>
      {menu === 'normal' && normalMenu}
      {menu === 'board' && boardMenu}
      {rule.board.active && menuSelect}
    </Box>
  )
}

export default connect(
  state => ({
    board: state.board,
    rule: state.rule,
    timer: state.timer
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)
