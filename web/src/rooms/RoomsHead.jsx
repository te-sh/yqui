import React from 'react'
import { TableCell, TableHead, TableRow } from '@material-ui/core'

const RoomsHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>部屋</TableCell>
        <TableCell>人数</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

export default RoomsHead
