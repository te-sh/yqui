import React from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import { endEditTeams, cancelEditTeams } from '../../lib/edit_team'
import './Actions.scss'

const TeamEdit = ({ className }) => {
  const onSubmit = () => {
    endEditTeams()
    close()
  }

  const close = () => {
    cancelEditTeams()
  }

  return (
    <Paper className={className}>
      <Box className="actions-content">
        <Button variant="outlined" color="primary" size="large"
                onClick={onSubmit}>
          設定
        </Button>
        <Button variant="outlined" color="secondary" size="large"
                onClick={close}>
          閉じる
        </Button>
      </Box>
    </Paper>
  )
}

export default TeamEdit
