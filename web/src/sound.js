const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

let buffer = {}
const sounds = ['push', 'correct', 'wrong', 'roundwin']

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

const playSound = names => {
  let t = 0
  for (let name of names.split(',')) {
    let source = context.createBufferSource()
    source.buffer = buffer[name]
    source.connect(context.destination)
    source.start(t)
    console.log(source)
    t += source.buffer.duration
  }
}

export default playSound
