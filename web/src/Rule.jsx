import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core'
import { setRule } from './redux/actions'

const Rule = ({ open, setRule }) => {
  const submit = evt => {
    evt.preventDefault();
    setRule({})
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <form onSubmit={evt => submit(evt)}>
        <DialogTitle id="form-dialog-title">ルール</DialogTitle>
        <DialogContent>
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
    open: state.ruleOpen
  }),
  dispatch => ({
    setRule: rule => dispatch(setRule(rule))
  })
)(Rule)
