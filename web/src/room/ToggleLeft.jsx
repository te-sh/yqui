import React from 'react'
import { connect } from 'react-redux'
import { Box, ButtonBase } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { toggleShowLeft } from '../redux/appear_actions'
import './ToggleLeft.scss'

const ToggleLeft = ({ className, showLeft, toggleShowLeft }) => {
  return (
    <Box className={className}>
      <ButtonBase onClick={toggleShowLeft}>
        {showLeft ? <ArrowLeft size="small" /> : <ArrowRight size="small" />}
      </ButtonBase>
    </Box>
  )
}

export default connect(
  state => ({
    showLeft: state.appear.showLeft
  }),
  dispatch => ({
    toggleShowLeft: () => dispatch(toggleShowLeft())
  })
)(ToggleLeft)
