import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, FormControlLabel, Switch } from '@material-ui/core'
import { DoubleArrow } from '@material-ui/icons'
import classNames from 'classnames'
import update from 'immutability-helper'
import { sendWs, ALL_CLEAR, WIN_TOP, LOSE_BOTTOM, RULE } from '../../lib/send'
import { beginAssign } from '../../lib/assign'
import { setEditScores } from '../../redux/score_actions'
import { clearEditBoards } from '../../redux/board_actions'
import { updateDispTeams } from '../../redux/actions'
import Timer from './Timer'
import Board from './Board'
import './Master.scss'

const Master = ({ className, hidden, rule, setEditScores, clearEditBoards, updateDispTeams }) => {
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

  const winTop = () => {
    sendWs(WIN_TOP)
  }

  const loseBottom = () => {
    sendWs(LOSE_BOTTOM)
  }

  const toggleShowPoint = evt => {
    sendWs(RULE, update(rule, {
      showPoint: { $set: evt.target.checked }
    }))
  }

  const editScores = () => {
    setEditScores()
    updateDispTeams()
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
          最上位勝抜
        </Button>
        <Button variant="outlined" color="default" className="lose-bottom-button"
                onClick={loseBottom}>
          最下位失格
        </Button>
      </Box>
      <Timer className="group" />
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
        <Button variant="outlined" color="default" className="edit-score-button"
                onClick={editScores}>
          スコア編集
        </Button>
        <Button variant="outlined" color="default" className="assign-button"
                onClick={beginAssign}>
          解答者割当
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box className={classNames(className, 'master-subactions', { hidden })}>
      {menu === 'normal' && normalMenu}
      {menu === 'board' && <Board className="content" /> }
      {rule.board.active && menuSelect}
    </Box>
  )
}

export default connect(
  state => ({
    score: state.score,
    board: state.board,
    rule: state.rule
  }),
  dispatch => ({
    setEditScores: () => dispatch(setEditScores()),
    clearEditBoards: () => dispatch(clearEditBoards()),
    updateDispTeams: () => dispatch(updateDispTeams())
  })
)(Master)
