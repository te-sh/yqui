import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Dvr, RadioButtonUnchecked } from '@material-ui/icons'
import './Board.scss'

const Board = ({ className, isMaster }) => {
  const buttons = (
    <Box className="board-buttons">
      <ToggleButtonGroup size="small">
        <ToggleButton value="correct" aria-label="correct">
          <RadioButtonUnchecked />
        </ToggleButton>
        <ToggleButton value="open" aria-label="open">
          <Dvr />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )

  return (
    <Box className={className}>
      <Box className="board-text">
      </Box>
      { isMaster ? buttons : null }
    </Box>
  )
}

export default connect(
  state => ({
    isMaster: state.isMaster
  })
)(Board)
