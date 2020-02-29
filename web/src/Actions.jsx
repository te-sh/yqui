import React from 'react'
import { Button, Card, CardContent } from '@material-ui/core'

const Actions = props => {
  return (
    <Card>
      <CardContent>
        <Button variant="outlined" color="primary" size="large">
          早押し
        </Button>
      </CardContent>
    </Card>
  )
}

export default Actions
