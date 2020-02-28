import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import URI from 'urijs'
import EnterRoom from './EnterRoom'

const App = props => {
  console.log('Initialize App')

  const uri = URI(window.location.href).protocol('ws').pathname('/ws')
  const [open, setOpen] = React.useState(true)

  const onEnter = (name) => {
    setOpen(false)

    console.log(name)
    var ws = new WebSocket(uri.query({ name }).toString())
    ws.onopen = evt => {
      console.log('ws open')
      ws.send(JSON.stringify({ c: "ws test" }))
    }
    ws.onclose = evt => {
      console.log('ws close')
      ws = null
      setOpen(true)
    }
    ws.onmessage = evt => {
      console.log('ws received: ' + evt.data)
    }
    ws.onerror = evt => {
      console.log('ws error: ' + evt.data)
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Yqui
          </Typography>
        </Toolbar>
      </AppBar>
      <EnterRoom open={open} onEnter={onEnter} />
    </div>
  )
}

export default App;
