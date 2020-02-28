import React from 'react'
import { Grid } from '@material-ui/core'
import Play from './Play'
import Actions from './Actions'

const PlayContainer = props => {
  return (
    <Grid container direction="column" className="full-height">
      <Grid item className="stretch">
        <Play />
      </Grid>
      <Grid item>
        <Actions />
      </Grid>
    </Grid>
  )
}

export default PlayContainer
