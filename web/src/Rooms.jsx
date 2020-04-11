import React from 'react'
import { connect } from 'react-redux'
import {
  AppBar, Box, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableRow, Toolbar, Typography
} from '@material-ui/core'
import { send } from './communicate'
import EnterRoom from './dialogs/EnterRoom'

const Rooms = ({ history, ws, rooms, roomNo }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(false)

  const enterRoom = (roomNo, name) => {
    enterRoomClose()
    send.join(ws, { roomNo, name })
  }

  const enterRoomClose = () => {
    setEnterRoomOpen(false)
  }

  React.useEffect(
    () => {
      if (roomNo !== null) {
        history.push(`/room/${roomNo}`)
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
                onClick={() => setEnterRoomOpen(true)}>
          入室
        </Button>
      </TableCell>
    </TableRow>
  ))

  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Yqui
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <EnterRoom open={enterRoomOpen} close={enterRoomClose}
                 submit={name => enterRoom(0, name)} />
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
