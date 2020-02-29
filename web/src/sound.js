const sounds = {
  push: new Audio('/snd/push.wav')
}

for (let name of Object.keys(sounds)) {
  sounds[name].preload = 'auto'
}

const playSound = name => {
  sounds[name].play()
}

export default playSound
