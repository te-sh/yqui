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

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
