import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, FormControl, FormControlLabel, IconButton,
  InputLabel, MenuItem, Select, Switch, Typography
} from '@material-ui/core'
import { Pause, PlayArrow } from '@material-ui/icons'
import classNames from 'classnames'
import update from 'immutability-helper'
import { minSecTime } from '../../lib/util'
import {
  sendWs, SEND_ALL_CLEAR, SEND_WIN_TOP, SEND_LOSE_BOTTOM,
  SEND_RULE, SEND_BOARD_LOCK, SEND_BOARDS, SEND_TOGGLE_TIMER
} from '../../lib/send'
import { clearEditBoards } from '../../redux/actions'
import './Master.scss'

const Master = ({ className, hidden, bg, rule, timer, clearEditBoards }) => {
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
    sendWs(SEND_ALL_CLEAR)
  }

  const onBoardLock = () => {
    sendWs(SEND_BOARD_LOCK, !bg.lock)
  }

  const onOpenAll = () => {
    const boards = Object.fromEntries([...bg.boards.keys()].map(id => (
      [id, update(bg.boards.get(id), { open: { $set: true } })]
    )))
    clearEditBoards()
    sendWs(SEND_BOARDS, boards)
  }

  const winTop = () => {
    sendWs(SEND_WIN_TOP)
  }

  const loseBottom = () => {
    sendWs(SEND_LOSE_BOTTOM)
  }

  const toggleTimer = () => {
    sendWs(SEND_TOGGLE_TIMER)
  }

  const toggleShowPoint = evt => {
    sendWs(SEND_RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  const menuSelect = (
    <FormControl>
      <InputLabel id="menu-label">メニュー</InputLabel>
      <Select labelId="menu-label" className="menu-select" value={menu}
              onChange={evt => setMenu(evt.target.value)}>
        <MenuItem value="normal">通常</MenuItem>
        <MenuItem value="board">ボード</MenuItem>
      </Select>
    </FormControl>
  )

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
    </Box>
  )

  const boardMenu = (
    <Box className="content board">
      <Button variant="outlined" color="default" className="board-lock-button"
              onClick={onBoardLock}>
        { bg.lock ? '回答ロック解除' : '回答ロック' }
      </Button>
      <Button variant="outlined" color="default" className="open-all-button"
              onClick={onOpenAll}>
        すべてオープン
      </Button>
    </Box>
  )

  return (
    <Box className={classNames(className, 'master-subactions', { hidden })}>
      {rule.board.active && menuSelect}
      {menu === 'normal' && normalMenu}
      {menu === 'board' && boardMenu}
    </Box>
  )
}

export default connect(
  state => ({
    bg: state.bg,
    rule: state.rule,
    timer: state.timer
  }),
  dispatch => ({
    clearEditBoards: () => dispatch(clearEditBoards())
  })
)(Master)
