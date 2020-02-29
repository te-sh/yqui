import React from 'react'
import { connect } from 'react-redux'
import Sound from 'react-sound'
import { playSound } from './redux/actions'

const SoundEffect = ({ sound, playSound }) => {
  return (
    <Sound url="/snd/push.wav" autoload={true}
           playStatus={sound === 'push' ? Sound.status.PLAYING  : Sound.status.STOPPED}
           onFinishedPlaying={() => playSound(null)}
           playFromPosition={50} />
  )
}

export default connect(
  state => ({
    sound: state.sound
  }),
  dispatch => ({
    playSound: name => dispatch(playSound(name))
  })
)(SoundEffect)
