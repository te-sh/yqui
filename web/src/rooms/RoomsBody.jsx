import React from 'react'
import { Button, TableBody, TableCell, TableRow } from '@material-ui/core'

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
        Room{i + 1}
      </TableCell>
      <TableCell className="num-users">
        {room.numUsers}
      </TableCell>
      <TableCell className="room-title">
        {room.title}
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
