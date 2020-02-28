import React from 'react'
import { Grid } from '@material-ui/core'
import Players from './Players'
import Actions from './Actions'

const PlayContainer = props => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Players />
      </Grid>
      <Grid item>
        <Actions />
      </Grid>
    </Grid>
  )
}

export default PlayContainer
