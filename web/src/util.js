import numbro from 'numbro'

export const intKeys = obj => Object.keys(obj).map(key => parseInt(key))

export const normalizeArray = v => v || []

export const parseNumber = text => {
  const i = parseInt(text)
  return isNaN(i) ? 0 : i
}

export const ordial = x => {
  const t = x % 1000
  if (t === 1 || (t > 20 && t % 10 === 1)) {
    return `${x}st`
  } else if (t === 2 || (t > 20 && t % 10 === 2)) {
    return `${x}nd`
  } else if (t === 3 || (t > 20 && t % 10 === 3)) {
    return `${x}rd`
  } else {
    return `${x}th`
  }
}

export const readableTime = ms => {
  if (ms < 1000) {
    return `${ms}ms`
  } else if (ms < 10000) {
    return `${numbro(ms / 1000).format({ mantissa: 2 })}s`
  } else if (ms < 100000) {
    return `${numbro(ms / 1000).format({ mantissa: 1 })}s`
  } else {
    return `${numbro(ms / 1000).format({ mantissa: 0 })}s`
  }
}

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
