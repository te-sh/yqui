import React from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import { send } from './communicate'
import EnterRoom from './dialogs/EnterRoom'

const Rooms = ({ history, ws, roomNo }) => {
  const [enterRoomOpen, setEnterRoomOpen] = React.useState(false)

  const enterRoom = (roomNo, name) => {
    setEnterRoomOpen(false)
    send.join(ws, { roomNo, name })
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
      <Button variant="outlined" color="primary"
              onClick={() => setEnterRoomOpen(true)}>
        入室
      </Button>
      <EnterRoom open={enterRoomOpen}
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
