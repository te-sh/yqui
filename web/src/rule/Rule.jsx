import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel,
  InputLabel, MenuItem, Select, Tabs, Tab, TextField
} from '@material-ui/core'
import { send } from '../communicate'
import { initialState } from '../redux/reducers'
import TabPanel from './TabPanel'
import BoardRule from './BoardRule'
import './Rule.scss'

const Rule = ({ open, close, ws, rule }) => {
  const [tab, setTab] = React.useState(0)
  const [rightNum, setRightNum] = React.useState(0)
  const [pointCorrect, setPointCorrect] = React.useState(0)
  const [bonusCorrect, setBonusCorrect] = React.useState('none')
  const [pointWrong, setPointWrong] = React.useState(0)
  const [batsuWrong, setBatsuWrong] = React.useState(0)
  const [lockWrong, setLockWrong] = React.useState(0)
  const [winPointActive, setWinPointActive] = React.useState(true)
  const [winPointValue, setWinPointValue] = React.useState(0)
  const [losePointActive, setLosePointActive] = React.useState(false)
  const [losePointValue, setLosePointValue] = React.useState(0)
  const [loseBatsuActive, setLoseBatsuActive] = React.useState(true)
  const [loseBatsuValue, setLoseBatsuValue] = React.useState(0)
  const [team, setTeam] = React.useState(false)
  const [teamShareButton, setTeamShareButton] = React.useState(false)
  const [teamPoint, setTeamPoint] = React.useState('sum')
  const [teamBatsu, setTeamBatsu] = React.useState('sum')
  const [teamShareLock, setTeamShareLock] = React.useState(true)
  const [teamWinPointActive, setTeamWinPointActive] = React.useState(true)
  const [teamWinPointValue, setTeamWinPointValue] = React.useState(0)
  const [teamLosePointActive, setTeamLosePointActive] = React.useState(false)
  const [teamLosePointValue, setTeamLosePointValue] = React.useState(0)
  const [teamLoseBatsuActive, setTeamLoseBatsuActive] = React.useState(true)
  const [teamLoseBatsuValue, setTeamLoseBatsuValue] = React.useState(0)
  const [board, setBoard] = React.useState(initialState.rule.board)

  const onEnter = () => {
    setRightNum(rule.rightNum)
    setPointCorrect(rule.pointCorrect)
    setBonusCorrect(rule.bonusCorrect)
    setPointWrong(rule.pointWrong)
    setBatsuWrong(rule.batsuWrong)
    setLockWrong(rule.lockWrong)
    setWinPointActive(rule.winPoint.active)
    setWinPointValue(rule.winPoint.value)
    setLosePointActive(rule.losePoint.active)
    setLosePointValue(rule.losePoint.value)
    setLoseBatsuActive(rule.loseBatsu.active)
    setLoseBatsuValue(rule.loseBatsu.value)
    setTeam(rule.team)
    setTeamShareButton(rule.teamShareButton)
    setTeamPoint(rule.teamPoint)
    setTeamBatsu(rule.teamBatsu)
    setTeamShareLock(rule.teamShareLock)
    setTeamWinPointActive(rule.teamWinPoint.active)
    setTeamWinPointValue(rule.teamWinPoint.value)
    setTeamLosePointActive(rule.teamLosePoint.active)
    setTeamLosePointValue(rule.teamLosePoint.value)
    setTeamLoseBatsuActive(rule.teamLoseBatsu.active)
    setTeamLoseBatsuValue(rule.teamLoseBatsu.value)
    setBoard(rule.board)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    close()

    send.rule(ws, {
      rightNum: parse(rightNum),
      pointCorrect: parse(pointCorrect),
      bonusCorrect,
      pointWrong: parse(pointWrong),
      batsuWrong: parse(batsuWrong),
      lockWrong: parse(lockWrong),
      winPoint: { active: winPointActive, value: parse(winPointValue) },
      losePoint: { active: losePointActive, value: parse(losePointValue) },
      loseBatsu: { active: loseBatsuActive, value: parse(loseBatsuValue) },
      team,
      teamShareButton,
      teamPoint,
      teamBatsu,
      teamShareLock,
      teamWinPoint: { active: teamWinPointActive, value: parse(teamWinPointValue) },
      teamLosePoint: { active: teamLosePointActive, value: parse(teamLosePointValue) },
      teamLoseBatsu: { active: teamLoseBatsuActive, value: parse(teamLoseBatsuValue) },
      board
    })
  }

  const parse = text => {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  }

  const normalRule = (
    <TabPanel value={tab} index={0} className="normal-rule">
      <FormGroup component="fieldset" className="rule-group">
        <TextField label="解答権人数" type="number"
                   value={rightNum}
                   onChange={evt => setRightNum(evt.target.value)} />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     value={pointCorrect}
                     onChange={evt => setPointCorrect(evt.target.value)} />
          <FormControl>
            <InputLabel id="bonus-correct-label">ボーナス</InputLabel>
            <Select labelId="bonus-correct-label"
                    value={bonusCorrect}
                    onChange={evt => setBonusCorrect(evt.target.value)}>
              <MenuItem value="none">なし</MenuItem>
              <MenuItem value="cons">連答</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          誤答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     value={pointWrong}
                     onChange={evt => setPointWrong(evt.target.value)} />
          <TextField label="バツ" type="number"
                     value={batsuWrong}
                     onChange={evt => setBatsuWrong(evt.target.value)} />
          <TextField label="休み" type="number"
                     value={lockWrong}
                     onChange={evt => setLockWrong(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          勝ち抜け
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" checked={winPointActive}
                    onChange={evt => setWinPointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!winPointActive}
                     value={winPointValue}
                     onChange={evt => setWinPointValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          失格
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" checked={losePointActive}
                    onChange={evt => setLosePointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!losePointActive}
                     value={losePointValue}
                     onChange={evt => setLosePointValue(evt.target.value)} />
          <Checkbox color="default" checked={loseBatsuActive}
                    onChange={evt => setLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number"
                     disabled={!loseBatsuActive}
                     value={loseBatsuValue}
                     onChange={evt => setLoseBatsuValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </TabPanel>
  )

  const teamRule = (
    <TabPanel value={tab} index={1} className="team-rule">
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={team}
                      onChange={evt => setTeam(evt.target.checked)} />
          }
          label="チーム戦" />
      </FormGroup>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default" disabled={!team}
                      checked={teamShareButton}
                      onChange={evt => setTeamShareButton(evt.target.checked)} />
          }
          label="ボタン共有" />
      </FormGroup>
      <FormGroup className="rule-group">
        <FormControl>
          <InputLabel id="team-point-label">ポイント</InputLabel>
          <Select labelId="team-point-label" className="wide-select" disabled={!team}
                  value={teamPoint}
                  onChange={evt => setTeamPoint(evt.target.value)}>
            <MenuItem value="sum">個人ポイントの和</MenuItem>
            <MenuItem value="mul">個人ポイントの積</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
      <FormGroup className="rule-group">
        <FormControl>
          <InputLabel id="team-batsu-label">バツ</InputLabel>
          <Select labelId="team-batsu-label" className="wide-select" disabled={!team}
                  value={teamBatsu}
                  onChange={evt => setTeamBatsu(evt.target.value)}>
            <MenuItem value="sum">個人バツの和</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default" disabled={!team}
                      checked={teamShareLock}
                      onChange={evt => setTeamShareLock(evt.target.checked)} />
          }
          label="休み共有" />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          勝ち抜け
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" disabled={!team}
                    checked={teamWinPointActive}
                    onChange={evt => setTeamWinPointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!team || !teamWinPointActive}
                     value={teamWinPointValue}
                     onChange={evt => setTeamWinPointValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          失格
        </FormLabel>
        <FormGroup row={true}>
          <Checkbox color="default" disabled={!team}
                    checked={teamLosePointActive}
                    onChange={evt => setTeamLosePointActive(evt.target.checked)} />
          <TextField label="ポイント" type="number"
                     disabled={!team || !teamLosePointActive}
                     value={teamLosePointValue}
                     onChange={evt => setTeamLosePointValue(evt.target.value)} />
          <Checkbox color="default" disabled={!team}
                    checked={teamLoseBatsuActive}
                    onChange={evt => setTeamLoseBatsuActive(evt.target.checked)} />
          <TextField label="バツ" type="number"
                     disabled={!team || !teamLoseBatsuActive}
                     value={teamLoseBatsuValue}
                     onChange={evt => setTeamLoseBatsuValue(evt.target.value)} />
        </FormGroup>
      </FormGroup>
    </TabPanel>
  )

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
          {normalRule}
          {teamRule}
          <BoardRule tab={tab}
                     rule={board}
                     changeRule={board => setBoard(board)} />
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
