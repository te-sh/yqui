import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormGroup, Tabs, Tab, TextField
} from '@material-ui/core'
import { parseNumber } from '../../util'
import { send } from '../../communicate'
import { initRule } from '../../rule'
import TabPanel from './TabPanel'
import PlayerRule from './PlayerRule'
import TeamRule from './TeamRule'
import BoardRule from './BoardRule'
import './Rule.scss'

const Rule = ({ open, close, ws, rule }) => {
  const [tab, setTab] = React.useState(0)
  const [rightNum, setRightNum] = React.useState(0)
  const [player, setPlayer] = React.useState(initRule.player)
  const [team, setTeam] = React.useState(initRule.team)
  const [board, setBoard] = React.useState(initRule.board)

  const onEnter = () => {
    setRightNum(rule.rightNum)
    setPlayer(rule.player)
    setTeam(rule.team)
    setBoard(rule.board)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    close()

    send.rule(ws, {
      rightNum: parseNumber(rightNum),
      player,
      team,
      board
    })
  }

  return (
    <Dialog open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent className="rule">
          <Tabs value={tab} onChange={(evt, newTab) => setTab(newTab)}>
            <Tab label="通常" />
            <Tab label="チーム" />
            <Tab label="ボード" />
          </Tabs>
          <TabPanel value={tab} index={0} className="normal-rule">
            <FormGroup component="fieldset" className="rule-group">
              <TextField label="解答権人数" type="number"
                         value={rightNum}
                         onChange={evt => setRightNum(evt.target.value)} />
            </FormGroup>
            <PlayerRule rule={player}
                        changeRule={player => setPlayer(player)} />
          </TabPanel>
          <TabPanel value={tab} index={1} className="team-rule">
            <TeamRule tab={tab}
                      rule={team}
                      changeRule={team => setTeam(team)} />
          </TabPanel>
          <TabPanel value={tab} index={2} className="board-rule">
            <BoardRule rule={board}
                       changeRule={board => setBoard(board)} />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            設定
          </Button>
          <Button color="secondary" onClick={close}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    rule: state.rule
  })
)(Rule)
