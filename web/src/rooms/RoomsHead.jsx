import React from 'react'
import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core'

const RoomsHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="enter-room" />
        <TableCell className="room-name">
          <Typography variant="caption">部屋</Typography>
        </TableCell>
        <TableCell className="num-users">
          <Typography variant="caption">人数</Typography>
        </TableCell>
        <TableCell className="room-title">
          <Typography variant="caption">部屋名</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default RoomsHead
