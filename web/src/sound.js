const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

let buffer = {}
const sounds = ['push', 'correct', 'wrong']

function loadSound(name, url) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  request.onload = () => {
    let data = request.response
    context.decodeAudioData(data)
      .then(decoded => {
        buffer[name] = decoded
      })
  }
  request.send()
}

for (let name of sounds) {
  loadSound(name, '/snd/' + name + '.wav')
}

const playSound = name => {
  let source = context.createBufferSource()
  source.buffer = buffer[name]
  source.connect(context.destination)
  source.start(0)
}

export default playSound
