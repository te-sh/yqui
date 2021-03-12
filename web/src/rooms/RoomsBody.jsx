import React from 'react'
import { Box, Button, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

const RoomsBody = ({ rooms, click }) => {
  const rows = rooms.map((room, i) => (
    <TableRow key={i}>
      <TableCell className="enter-room">
        <Button variant="outlined" color="primary"
                className="enter-room-button"
                onClick={() => click(i)}>
          入室
        </Button>
      </TableCell>
      <TableCell className="room-name">
        <Typography variant="body2">Room{i + 1}</Typography>
      </TableCell>
      <TableCell className="num-users">
        <Typography variant="body2">{room.numUsers}</Typography>
      </TableCell>
      <TableCell className="room-title">
        <Box className="content">
          {room.hasPassword && <LockOutlined fontSize="small" />}
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
