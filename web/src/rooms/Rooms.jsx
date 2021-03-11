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
import './Rooms.scss'

const Rooms = ({ history, mobile, rooms, roomNo }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(false)
  const [enterRoomNo, setEnterRoomNo] = React.useState(0)

  const openEnterRoom = roomNo => {
    setEnterRoomNo(roomNo)
    setEnterRoomOpen(true)
  }

  const closeEnterRoom = () => {
    setEnterRoomOpen(false)
  }

  const enterRoom = async join => {
    closeEnterRoom()
    join.roomNo = enterRoomNo
    join.scoreBackup = await restoreScoreBackup(join.name)
    sendWs(SEND_JOIN, join)
  }

  React.useEffect(
    () => {
      if (roomNo !== null) {
        history.push(`/room/${roomNo + 1}`)
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
      <EnterRoom open={enterRoomOpen}
                 submit={enterRoom} close={closeEnterRoom} />
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
