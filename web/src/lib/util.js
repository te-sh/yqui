export const toIntMap = obj => {
  return new Map(Object.entries(obj).map(([key, value]) => [parseInt(key), value]))
}

export const normalizeArray = v => v || []

export const parseNumber = text => {
  if (text !== '') {
    const i = parseInt(text)
    return isNaN(i) ? 0 : i
  } else {
    return ''
  }
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

export const minSecTime = s => {
  const min = Math.floor(s / 60)
  const sec = s - min * 60
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

const fd2 = new Intl.NumberFormat('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fd1 = new Intl.NumberFormat('ja-JP', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const fd0 = new Intl.NumberFormat('ja-JP', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

export const readableTime = ms => {
  if (ms < 1000) {
    return `${ms}ms`
  } else if (ms < 10000) {
    return `${fd2.format(ms / 1000)}s`
  } else if (ms < 100000) {
    return `${fd1.format(ms / 1000)}s`
  } else {
    return `${fd0.format(ms / 1000)}s`
  }
}

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const displayAttr = cond => ({ display: cond ? 'block' : 'none' })
