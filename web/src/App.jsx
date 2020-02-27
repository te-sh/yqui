import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log('Initialize App')

    var ws = new WebSocket('ws://' + window.location.host + '/ws')
    ws.onopen = evt => {
      console.log('ws open')
    }
    ws.onclose = evt => {
      console.log('ws close')
      ws = null
    }
    ws.onmessage = evt => {
      console.log('ws received: ' + evt.data)
    }
    ws.onerror = evt => {
      console.log('ws error: ' + evt.data)
    }
    setTimeout(() => {
      ws.send(JSON.stringify({ c: "ws test" }))
    }, 1000)
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Yqui
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default App;
