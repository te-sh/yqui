import { retrieveChatSound, retrieveVolume } from './dexie'

let context
const buffer = {}

const sounds = ['push', 'correct', 'wrong', 'roundwin', 'open', 'timeup', 'chat']

window.addEventListener('load', () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  context = new AudioContext()

  for (const name of sounds) {
    loadSound(name, `/snd/${name}.mp3`)
  }
})

const loadSound = (name, url) => {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  request.onload = () => {
    const data = request.response
    context.decodeAudioData(data, decoded => {
      buffer[name] = decoded
    })
  }
  request.send()
}

const playSound = async sounds => {
  const chatSound = await retrieveChatSound()
  let t = 0
  for (const name of sounds) {
    if (name === 'chat' && !chatSound) {
      continue
    }

    const source = context.createBufferSource()
    source.buffer = buffer[name]

    const gainNode = context.createGain()
    source.connect(gainNode)
    gainNode.connect(context.destination)
    gainNode.gain.value = (await retrieveVolume()) / 100.0

    source.start(context.currentTime + t)
    t += source.buffer.duration
  }
}

export default playSound
