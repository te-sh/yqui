import React from 'react'
import { Button, Paper, TextField } from '@material-ui/core'
import './Boardactions.scss'

const Player = ({ className }) => {
  const [answer, setAnswer] = React.useState('')

  const sendAnswer = (evt) => {
    console.log(evt)
  }

  return (
    <Paper className={className}>
      <form onSubmit={evt => sendAnswer(evt)} className="boardactions-content">
        <TextField id="message" variant="outlined" size="small"
                   value={answer}
                   onChange={evt => setAnswer(evt.target.value)} />
        <Button type="submit" variant="outlined" color="default" size="large">
          ボード回答
        </Button>
      </form>
    </Paper>
  )
}

export default Player
