import React from 'react'
import { Button, Paper } from '@material-ui/core'
import './Actions.scss'

const TeamEdit = ({ setTeamEdit }) => {
  return (
    <Paper className="actions">
      <Button variant="outlined" color="primary" size="large"
              onClick={() => setTeamEdit(false)}>
        設定
      </Button>
      <Button variant="outlined" color="secondary" size="large"
              onClick={() => setTeamEdit(false)}>
        閉じる
      </Button>
    </Paper>
  )
}

export default TeamEdit
