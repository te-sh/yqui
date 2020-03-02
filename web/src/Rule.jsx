import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography
} from '@material-ui/core'
import { ruleClose } from './redux/actions'

const Rule = ({ open, ws, rule, ruleClose }) => {
  const [rightNum, setRightNum] = React.useState(0)
  const [correctByCorrect, setCorrectByCorrect] = React.useState(0)
  const [correctByWrong, setCorrectByWrong] = React.useState(0)
  const [wrongByWrong, setWrongByWrong] = React.useState(0)
  const [lockByWrong, setLockByWrong] = React.useState(0)
  const [checkWinCorrect, setCheckWinCorrect] = React.useState(true)
  const [winCorrect, setWinCorrect] = React.useState(0)
  const [checkLoseCorrect, setCheckLoseCorrect] = React.useState(false)
  const [loseCorrect, setLoseCorrect] = React.useState(0)
  const [checkLoseWrong, setCheckLoseWrong] = React.useState(true)
  const [loseWrong, setLoseWrong] = React.useState(0)


  const onEnter = () => {
    setRightNum(rule.rightNum)
    setCorrectByCorrect(rule.correctByCorrect)
    setCorrectByWrong(rule.correctByWrong)
    setWrongByWrong(rule.wrongByWrong)
    setLockByWrong(rule.lockByWrong)
    setCheckWinCorrect(rule.checkWinCorrect)
    setWinCorrect(rule.winCorrect)
    setCheckLoseCorrect(rule.checkLoseCorrect)
    setLoseCorrect(rule.loseCorrect)
    setCheckLoseWrong(rule.checkLoseWrong)
    setLoseWrong(rule.loseWrong)
  }

  const submit = evt => {
    evt.preventDefault()
    ruleClose()

    if (ws) {
      ws.send(JSON.stringify({
        c: 'l',
        a: JSON.stringify({
          rightNum: parse(rightNum),
          correctByCorrect: parse(correctByCorrect),
          correctByWrong: parse(correctByWrong),
          wrongByWrong: parse(wrongByWrong),
          lockByWrong: parse(lockByWrong),
          checkWinCorrect: checkWinCorrect,
          winCorrect: parse(winCorrect),
          checkLoseCorrect: checkLoseCorrect,
          loseCorrect: parse(loseCorrect),
          checkLoseWrong: checkLoseWrong,
          loseWrong: parse(loseWrong)
        })
      }))
    }
  }

  const cancel = evt => {
    ruleClose()
  }

  const parse = text => {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  }

  return (
    <Dialog open={open} onEnter={() => onEnter()}
            aria-labelledby="form-dialog-title">
      <form onSubmit={evt => submit(evt)}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent className="rule">
          <TextField label="解答権人数" type="number"
                     value={rightNum}
                     onChange={evt => setRightNum(evt.target.value)} />
          <div>
            <Typography>
              正答時
            </Typography>
            <TextField label="正答ポイント" type="number"
                       value={correctByCorrect}
                       onChange={evt => setCorrectByCorrect(evt.target.value)} />
          </div>
          <div>
            <Typography>
              誤答時
            </Typography>
            <TextField label="正答ポイント" type="number"
                       value={correctByWrong}
                       onChange={evt => setCorrectByWrong(evt.target.value)} />
            <TextField label="誤答ポイント" type="number"
                       value={wrongByWrong}
                       onChange={evt => setWrongByWrong(evt.target.value)} />
            <TextField label="休み" type="number"
                       value={lockByWrong}
                       onChange={evt => setLockByWrong(evt.target.value)} />
          </div>
          <div>
            <Typography>
              勝ち抜け
            </Typography>
            <Checkbox color="default" checked={checkWinCorrect}
                      onChange={evt => setCheckWinCorrect(evt.target.checked)} />
            <TextField label="正答ポイント" type="number"
                       disabled={!checkWinCorrect}
                       value={winCorrect}
                       onChange={evt => setWinCorrect(evt.target.value)} />
          </div>
          <div>
            <Typography>
              失格
            </Typography>
            <Checkbox color="default" checked={checkLoseCorrect}
                      onChange={evt => setCheckLoseCorrect(evt.target.checked)} />
            <TextField label="正答ポイント" type="number"
                       disabled={!checkLoseCorrect}
                       value={loseCorrect}
                       onChange={evt => setLoseCorrect(evt.target.value)} />
            <Checkbox color="default" checked={checkLoseWrong}
                      onChange={evt => setCheckLoseWrong(evt.target.checked)} />
            <TextField label="誤答ポイント" type="number"
                       disabled={!checkLoseWrong}
                       value={loseWrong}
                       onChange={evt => setLoseWrong(evt.target.value)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            設定
          </Button>
          <Button color="secondary" onClick={() => cancel()}>
            閉じる
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  state => ({
    open: state.ruleOpen,
    ws: state.ws,
    rule: state.rule
  }),
  dispatch => ({
    ruleClose: () => dispatch(ruleClose())
  })
)(Rule)
