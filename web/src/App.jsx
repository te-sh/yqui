import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log('Initialize App')
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
