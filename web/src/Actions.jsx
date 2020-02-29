import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'

const Actions = ({ ws }) => {
  const answer = () => {
    if (ws) {
      ws.send(JSON.stringify({ c: 'a' }))
    }
  }

  return (
    <Paper className="actions">
      <Button variant="outlined" color="primary" size="large"
              onClick={() => answer()}>
        早押し
      </Button>
    </Paper>
  )
}

export default connect(
  state => ({
    ws: state.ws
  })
)(Actions)

