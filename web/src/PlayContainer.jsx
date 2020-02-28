import React from 'react'
import { Grid } from '@material-ui/core'
import Players from './Players'
import Actions from './Actions'

const PlayContainer = props => {
  return (
    <Grid container direction="column" wrap="nowrap" style={{height: '100%', maxHeight: '100%'}}>
      <Grid item style={{flexGrow: 1}}>
        <Players />
      </Grid>
      <Grid item>
        <Actions />
      </Grid>
    </Grid>
  )
}

export default PlayContainer
