const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

let buffer = {}
const sounds = ['push', 'correct', 'wrong', 'roundwin']

const loadSound = (name, url) => {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  request.onload = () => {
    let data = request.response
    context.decodeAudioData(data, decoded => {
      buffer[name] = decoded
    })
  }
  request.send()
}

for (let name of sounds) {
  loadSound(name, '/snd/' + name + '.wav')
}

const playSound = names => {
  let t = 0
  for (let name of names.split(',')) {
    const source = context.createBufferSource()
    source.buffer = buffer[name]

    const gainNode = context.createGain()
    source.connect(gainNode);
    gainNode.connect(context.destination)
    gainNode.gain.value = parseInt(localStorage.getItem('volume') || '100') / 100.0

    source.start(t)
    t += source.buffer.duration
  }
}

export default playSound
