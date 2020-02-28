import React from 'react'
import { Button, Card, CardContent, Grid } from '@material-ui/core'

const Actions = props => {
  return (
    <Card>
      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <Button variant="outlined" color="primary" size="large">
              早押し
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Actions
