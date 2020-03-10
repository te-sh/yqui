import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from '@material-ui/core'
import { send } from '../communicate'
import './Rule.scss'

const Rule = ({ open, close, ws, rule }) => {
  const [rightNum, setRightNum] = React.useState(0)
  const [pointCorrect, setPointCorrect] = React.useState(0)
  const [pointWrong, setPointWrong] = React.useState(0)
  const [batsuWrong, setBatsuWrong] = React.useState(0)
  const [lockWrong, setLockWrong] = React.useState(0)
  const [winPointActive, setWinPointActive] = React.useState(true)
  const [winPointValue, setWinPointValue] = React.useState(0)
  const [losePointActive, setLosePointActive] = React.useState(false)
  const [losePointValue, setLosePointValue] = React.useState(0)
  const [loseBatsuActive, setLoseBatsuActive] = React.useState(true)
  const [loseBatsuValue, setLoseBatsuValue] = React.useState(0)


  const onEnter = () => {
    setRightNum(rule.rightNum)
    setPointCorrect(rule.pointCorrect)
    setPointWrong(rule.pointWrong)
    setBatsuWrong(rule.batsuWrong)
    setLockWrong(rule.lockWrong)
    setWinPointActive(rule.winPoint.active)
    setWinPointValue(rule.winPoint.value)
    setLosePointActive(rule.losePoint.active)
    setLosePointValue(rule.losePoint.value)
    setLoseBatsuActive(rule.loseBatsu.active)
    setLoseBatsuValue(rule.loseBatsu.value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    close()

    send.rule(ws, {
      rightNum: parse(rightNum),
      pointCorrect: parse(pointCorrect),
      pointWrong: parse(pointWrong),
      batsuWrong: parse(batsuWrong),
      lockWrong: parse(lockWrong),
      winPoint: { active: winPointActive, value: parse(winPointValue) },
      losePoint: { active: losePointActive, value: parse(losePointValue) },
      loseBatsu: { active: loseBatsuActive, value: parse(loseBatsuValue) }
    })
  }

  const parse = text => {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  }

  return (
    <Dialog open={open} onEnter={onEnter}
            aria-labelledby="form-dialog-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent className="rule">
          <TextField label="解答権人数" type="number"
                     value={rightNum}
                     onChange={evt => setRightNum(evt.target.value)} />
          <div>
            <Typography>
              正答時
            </Typography>
            <TextField label="ポイント" type="number"
                       value={pointCorrect}
                       onChange={evt => setPointCorrect(evt.target.value)} />
          </div>
          <div>
            <Typography>
              誤答時
            </Typography>
            <TextField label="ポイント" type="number"
                       value={pointWrong}
                       onChange={evt => setPointWrong(evt.target.value)} />
            <TextField label="バツ" type="number"
                       value={batsuWrong}
                       onChange={evt => setBatsuWrong(evt.target.value)} />
            <TextField label="休み" type="number"
                       value={lockWrong}
                       onChange={evt => setLockWrong(evt.target.value)} />
          </div>
          <div>
            <Typography>
              勝ち抜け
            </Typography>
            <Checkbox color="default" checked={winPointActive}
                      onChange={evt => setWinPointActive(evt.target.checked)} />
            <TextField label="ポイント" type="number"
                       disabled={!winPointActive}
                       value={winPointValue}
                       onChange={evt => setWinPointValue(evt.target.value)} />
          </div>
          <div>
            <Typography>
              失格
            </Typography>
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
          </div>
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