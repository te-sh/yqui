import React from 'react'
import { connect } from 'react-redux'
import {
  AppBar, Box, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableRow, Toolbar, Typography
} from '@material-ui/core'
import { send } from './communicate'
import EnterRoom from './dialogs/EnterRoom'

const Rooms = ({ history, ws, roomNo }) => {
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
              <TableRow>
                <TableCell>
                  Room1
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary"
                          onClick={() => setEnterRoomOpen(true)}>
                    入室
                  </Button>
                </TableCell>
              </TableRow>
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
    roomNo: state.roomNo
  })
)(Rooms)
