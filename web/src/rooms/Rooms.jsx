import React from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@material-ui/core'
import { send } from '../communicate'
import Topbar from './Topbar'
import Copyright from './Copyright'
import EnterRoom from '../dialogs/EnterRoom'
import './Rooms.scss'

const Rooms = ({ history, ws, rooms, roomNo }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(false)
  const [enterRoomNo, setEnterRoomNo] = React.useState(0)

  const openEnterRoom = roomNo => {
    setEnterRoomNo(roomNo)
    setEnterRoomOpen(true)
  }

  const closeEnterRoom = () => {
    setEnterRoomOpen(false)
  }

  const enterRoom = name => {
    closeEnterRoom()
    send.join(ws, { roomNo: enterRoomNo, name })
  }

  React.useEffect(
    () => {
      if (roomNo !== null) {
        history.push(`/room/${roomNo + 1}`)
      }
    },
    [history, roomNo]
  )

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
                onClick={() => openEnterRoom(i)}>
          入室
        </Button>
      </TableCell>
    </TableRow>
  ))

  return (
    <Box>
      <Topbar />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>部屋</TableCell>
                <TableCell>人数</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Copyright />
      <EnterRoom open={enterRoomOpen}
                 submit={enterRoom} close={closeEnterRoom} />
    </Box>
  )
}

export default connect(
  state => ({
    ws: state.ws,
    rooms: state.rooms,
    roomNo: state.roomNo
  })
)(Rooms)
