export const ordial = x => {
  const t = x % 1000
  if (t === 1 || (t > 20 && t % 10 === 1)) {
    return x.toString() + 'st'
  } else if (t === 2 || (t > 20 && t % 10 === 2)) {
    return x.toString() + 'nd'
  } else if (t === 3 || (t > 20 && t % 10 === 3)) {
    return x.toString() + 'rd'
  } else {
    return x.toString() + 'th'
  }
}
