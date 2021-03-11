import React from 'react'
import { TableCell, TableHead, TableRow } from '@material-ui/core'

const RoomsHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="enter-room" />
        <TableCell className="room-name">部屋</TableCell>
        <TableCell className="num-users">人数</TableCell>
        <TableCell className="room-title">部屋名</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default RoomsHead
