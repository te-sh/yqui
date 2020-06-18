import React from 'react'
import { connect } from 'react-redux'
import Master from './Master'
import Player from './Player'

const Boardactions = ({ className, isMaster }) => {
  if (isMaster) {
    return <Master className={className} />
  } else {
    return <Player className={className} />
  }
}

export default connect(
  state => ({
    isMaster: state.isMaster
  })
)(Boardactions)
