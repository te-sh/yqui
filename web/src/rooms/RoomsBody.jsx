import React from 'react'
import { Button, TableBody, TableCell, TableRow } from '@material-ui/core'

const RoomsBody = ({ rooms, click }) => {
  const rows = rooms.map((room, i) => (
    <TableRow key={i}>
      <TableCell>
        Room{i + 1}
      </TableCell>
      <TableCell>
        {room.numUsers}
      </TableCell>
      <TableCell>
        <Button variant="outlined" color="primary"
                onClick={() => click(i)}>
          入室
        </Button>
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
