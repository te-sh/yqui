import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core'
import { setRule } from './redux/actions'

const Rule = ({ open, ws, rule, setRule }) => {
  const [correctByCorrect, setCorrectByCorrect] = React.useState(rule.correctByCorrect)
  const [wrongByWrong, setWrongByWrong] = React.useState(rule.wrongByWrong)
  const [winCorrect, setWinCorrect] = React.useState(rule.winCorrect)
  const [loseWrong, setLoseWrong] = React.useState(rule.loseWrong)

  const submit = evt => {
    evt.preventDefault();
    setRule()

    if (ws) {
      ws.send(JSON.stringify({
        c: 'l',
        a: JSON.stringify({
          correctByCorrect, wrongByWrong, winCorrect, loseWrong
        })
      }))
    }
  }

  const parse = text => {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={evt => submit(evt)}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent>
          <TextField label="正答時正答ポイント" type="number"
                     value={correctByCorrect}
                     onChange={evt => setCorrectByCorrect(parse(evt.target.value))} />
        </DialogContent>
        <DialogContent>
          <TextField label="誤答時誤答ポイント" type="number"
                     value={wrongByWrong}
                     onChange={evt => setWrongByWrong(parse(evt.target.value))} />
        </DialogContent>
        <DialogContent>
          <TextField label="勝ち抜け正答ポイント" type="number"
                     value={winCorrect}
                     onChange={evt => setWinCorrect(parse(evt.target.value))} />
        </DialogContent>
        <DialogContent>
          <TextField label="失格誤答ポイント" type="number"
                     value={loseWrong}
                     onChange={evt => setLoseWrong(parse(evt.target.value))} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            設定
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
    setRule: rule => dispatch(setRule(rule))
  })
)(Rule)
