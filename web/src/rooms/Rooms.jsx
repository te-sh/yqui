import React from 'react'
import { connect } from 'react-redux'
import { Box, Paper, Table, TableContainer } from '@material-ui/core'
import classNames from 'classnames'
import { retrieveScoreBackup } from '../lib/dexie'
import { sendWs, JOIN } from '../lib/send'
import Topbar from './Topbar'
import RoomsHead from './RoomsHead'
import RoomsBody from './RoomsBody'
import Copyright from './Copyright'
import EnterRoom from './EnterRoom'
import CommonDialogs from '../dialogs/Dialogs'
import './Rooms.scss'

const Rooms = ({ history, browser: { mobile }, rooms, roomNo }) => {
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
    join.scoreBackup = await retrieveScoreBackup(join.name)
    sendWs(JOIN, join)
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
      <CommonDialogs />
    </Box>
  )
}

export default connect(
  state => ({
    browser: state.browser,
    rooms: state.rooms,
    roomNo: state.roomNo
  })
)(Rooms)
