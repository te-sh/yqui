import React from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import { endEditTeams, cancelEditTeams } from '../../lib/edit_team'
import './Actions.scss'

const TeamEdit = ({ className }) => {
  return (
    <Paper className={className}>
      <Box className="actions-content">
        <Button variant="outlined" color="primary" size="large"
                onClick={endEditTeams}>
          設定
        </Button>
        <Button variant="outlined" color="secondary" size="large"
                onClick={cancelEditTeams}>
          閉じる
        </Button>
      </Box>
    </Paper>
  )
}

export default TeamEdit
