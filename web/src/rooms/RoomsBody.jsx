import React from 'react'
import { Box, Button, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

const RoomsBody = ({ rooms, click }) => {
  const rows = rooms.map(room => (
    <TableRow key={room.no}>
      <TableCell className="enter-room">
        <Button variant="outlined" color="primary"
                className="enter-room-button"
                onClick={() => click(room)}>
          入室
        </Button>
      </TableCell>
      <TableCell className="room-name">
        <Typography variant="body2">Room{room.no}</Typography>
      </TableCell>
      <TableCell className="num-users">
        <Typography variant="body2">{room.numUsers}</Typography>
      </TableCell>
      <TableCell className="room-title">
        <Box className="content">
          {room.hasPassword && <LockOutlined fontSize="small" className="has-password" />}
          <Typography variant="body2">{room.title}</Typography>
        </Box>
      </TableCell>
    </TableRow>
  ))

  return (
    <TableBody>
      {rows}
    </TableBody>
  )
}

export default RoomsBody
