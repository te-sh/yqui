import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Table, TableContainer } from '@material-ui/core'
import classNames from 'classnames'
import { restoreScoreBackup } from '../lib/score'
import { sendWs, SEND_JOIN } from '../lib/send'
import Topbar from './Topbar'
import RoomsHead from './RoomsHead'
import RoomsBody from './RoomsBody'
import Copyright from './Copyright'
import EnterRoom from './EnterRoom'
import MessageBox from '../MessageBox'
import './Rooms.scss'

const Rooms = ({ history, mobile, rooms, roomNo }) => {
  const [open, setOpen] = React.useState(false)
  const [room, setRoom] = React.useState(null)

  const openEnterRoom = room => {
    setRoom(room)
    setOpen(true)
  }

  const closeEnterRoom = () => {
    setOpen(false)
  }

  const enterRoom = async join => {
    closeEnterRoom()
    join.scoreBackup = await restoreScoreBackup(join.name)
    sendWs(SEND_JOIN, join)
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
    <Box className={classNames('rooms', { mobile })}>
      <Topbar />
      <Box>
        <TableContainer component={Paper}>
          <Table className="rooms-table">
            <RoomsHead />
            <RoomsBody rooms={rooms} click={openEnterRoom} />
          </Table>
        </TableContainer>
      </Box>
      <Copyright />
      <EnterRoom room={room} open={open}
                 submit={enterRoom} close={closeEnterRoom} />
      <MessageBox />
    </Box>
  )
}

export default connect(
  state => ({
    mobile: state.mobile,
    rooms: state.rooms,
    roomNo: state.roomNo
  })
)(Rooms)
