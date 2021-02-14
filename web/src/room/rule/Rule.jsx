import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormGroup, Tabs, Tab, TextField
} from '@material-ui/core'
import update from 'immutability-helper'
import { parseNumber } from '../../lib/util'
import { initRule } from '../../lib/rule'
import { sendWs, SEND_RULE } from '../../lib/send'
import { setOpenRule } from '../../redux/actions'
import TabPanel from '../../lib/TabPanel'
import InitValueRule from './InitValueRule'
import ComprehensiveRule from './ComprehensiveRule'
import NormalRule from './NormalRule'
import TeamRule from './TeamRule'
import BoardRule from './BoardRule'
import OtherRule from './OtherRule'
import './Rule.scss'

const Rule = ({ rule, open, setOpen }) => {
  const [tab, setTab] = React.useState(0)
  const [rightNum, setRightNum] = React.useState(initRule.rightNum)
  const [player, setPlayer] = React.useState(initRule.player)
  const [team, setTeam] = React.useState(initRule.team)
  const [board, setBoard] = React.useState(initRule.board)
  const [other, setOther] = React.useState(initRule.other)

  const setRule = rule => {
    setTab(0)
    setRightNum(rule.rightNum)
    setPlayer(rule.player)
    setTeam(rule.team)
    setBoard(rule.board)
    setOther(rule.other)
  }

  const changePlayerComprehensive = value => {
    setPlayer(update(player, { comprehensive: { $set: value } }))
  }

  const submit = evt => {
    const newRule = update(rule, {
      rightNum: { $set: parseNumber(rightNum) },
      player: { $set: player },
      team: { $set: team },
      board: { $set: board },
      other: { $set: other }
    })
    sendWs(SEND_RULE, newRule)
    setOpen(false)
    evt.preventDefault()
  }

  const cancel = () => {
    setOpen(false)
  }

  return (
    <Dialog className="rule-dialog" open={open} onEnter={() => setRule(rule)}
            aria-labelledby="form-dialog-title">
      <form onSubmit={submit}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent className="rule">
          <Tabs value={tab} onChange={(evt, newTab) => setTab(newTab)}>
            <Tab label="通常" />
            <Tab label="チーム" />
            <Tab label="ボード" />
            <Tab label="その他" />
          </Tabs>
          <TabPanel value={tab} index={0} className="normal-rule">
            <FormGroup component="fieldset" className="rule-group" row={true}>
              <TextField label="解答権数" type="number" className="right-num"
                         InputProps={{ required: true, inputProps: { min: 1 } }}
                         value={rightNum}
                         onChange={evt => setRightNum(evt.target.value)} />
              <Box style={{ flexGrow: 1 }}></Box>
              <InitValueRule rule={player} changeRule={setPlayer} />
              <ComprehensiveRule rule={player.comprehensive} changeRule={changePlayerComprehensive} />
            </FormGroup>
            <NormalRule rule={player} changeRule={setPlayer} />
          </TabPanel>
          <TabPanel value={tab} index={1} className="team-rule">
            <TeamRule rule={team} changeRule={setTeam} />
          </TabPanel>
          <TabPanel value={tab} index={2} className="board-rule">
            <BoardRule rule={board} changeRule={setBoard} />
          </TabPanel>
          <TabPanel value={tab} index={3} className="other-rule">
            <OtherRule rule={other} changeRule={setOther} />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button type="submit" className="submit" color="primary">
            設定
          </Button>
          <Button className="reset" color="default" onClick={() => setRule(initRule)}>
            リセット
          </Button>
          <Button className="close" color="secondary" onClick={cancel}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    rule: state.rule,
    open: state.open.rule
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenRule(open))
  })
)(Rule)
