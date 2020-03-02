import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import { ruleClose } from './redux/actions'

const Rule = ({ open, ws, rule, ruleClose }) => {
  const [rightNum, setRightNum] = React.useState(0)
  const [correctByCorrect, setCorrectByCorrect] = React.useState(0)
  const [wrongByWrong, setWrongByWrong] = React.useState(0)
  const [winCorrect, setWinCorrect] = React.useState(0)
  const [loseWrong, setLoseWrong] = React.useState(0)

  const onEnter = () => {
    setRightNum(rule.rightNum)
    setCorrectByCorrect(rule.correctByCorrect)
    setWrongByWrong(rule.wrongByWrong)
    setWinCorrect(rule.winCorrect)
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
          wrongByWrong: parse(wrongByWrong),
          winCorrect: parse(winCorrect),
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
          <TextField label="正答時正答ポイント" type="number"
                     value={correctByCorrect}
                     onChange={evt => setCorrectByCorrect(evt.target.value)} />
          <TextField label="誤答時誤答ポイント" type="number"
                     value={wrongByWrong}
                     onChange={evt => setWrongByWrong(evt.target.value)} />
          <TextField label="勝ち抜け正答ポイント" type="number"
                     value={winCorrect}
                     onChange={evt => setWinCorrect(evt.target.value)} />
          <TextField label="失格誤答ポイント" type="number"
                     value={loseWrong}
                     onChange={evt => setLoseWrong(evt.target.value)} />
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
