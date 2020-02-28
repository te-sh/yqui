import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const Player = props => {
  console.log(props)
  return (
    <Card>
      <CardContent>
        <Typography>{props.player.name}</Typography>
      </CardContent>
    </Card>
  )
}

export default Player
