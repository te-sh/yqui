import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Checkbox, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel,
  InputLabel, MenuItem, Select, Tabs, Tab, TextField
} from '@material-ui/core'
import classNames from 'classnames'
import { send } from '../communicate'
import './Rule.scss'

const TabPanel = ({ children, value, index, className }) => (
  <Box className={classNames('tab-panel', className)}
       role="tabpanel"
       hidden={value !== index}
       id={`nav-tabpanel-${index}`}
       aria-labelledby={`nav-tab-${index}`}>
    <Box>
      {children}
    </Box>
  </Box>
)

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
  const [shareButton, setShareButton] = React.useState(false)
  const [teamPoint, setTeamPoint] = React.useState('sum')
  const [teamBatsu, setTeamBatsu] = React.useState('sum')
  const [board, setBoard] = React.useState(false)
  const [boardPointCorrect, setBoardPointCorrect] = React.useState(0)
  const [boardApplyNormal, setBoardApplyNormal] = React.useState(true)

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
    setShareButton(rule.shareButton)
    setTeamPoint(rule.teamPoint)
    setTeamBatsu(rule.teamBatsu)
    setBoard(rule.board)
    setBoardPointCorrect(rule.boardPointCorrect)
    setBoardApplyNormal(rule.boardApplyNormal)
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
      shareButton,
      teamPoint,
      teamBatsu,
      board,
      boardPointCorrect: parse(boardPointCorrect),
      boardApplyNormal
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
                      checked={shareButton}
                      onChange={evt => setShareButton(evt.target.checked)} />
          }
          label="ボタン共有" />
      </FormGroup>
      <FormGroup className="rule-group">
        <FormControl>
          <InputLabel id="team-point-label">ポイント</InputLabel>
          <Select labelId="team-point-label" className="wide-select"
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
          <Select labelId="team-batsu-label" className="wide-select"
                  value={teamBatsu}
                  onChange={evt => setTeamBatsu(evt.target.value)}>
            <MenuItem value="sum">個人バツの和</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </TabPanel>
  )

  const boardRule = (
    <TabPanel value={tab} index={2} className="board-rule">
      <FormGroup className="rule-group">
        <FormControlLabel
          control={
            <Checkbox color="default"
                      checked={board}
                      onChange={evt => setBoard(evt.target.checked)} />
          }
          label="ボード" />
      </FormGroup>
      <FormGroup component="fieldset" className="rule-group">
        <FormLabel component="legend">
          正答時
        </FormLabel>
        <FormGroup row={true}>
          <TextField label="ポイント" type="number"
                     value={boardPointCorrect}
                     onChange={evt => setBoardPointCorrect(evt.target.value)} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox color="default"
                        checked={boardApplyNormal}
                        onChange={evt => setBoardApplyNormal(evt.target.checked)} />
            }
            label="1着に通常ルールを適用" />
        </FormControl>
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
          {boardRule}
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
