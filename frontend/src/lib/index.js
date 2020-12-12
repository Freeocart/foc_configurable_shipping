export const intOrNull = value => {
  const number = parseInt(value)
  return isNaN(number) ? null : number
}

export const T = () => true

export const mergeLeft = (a = {}, b = {}, checkFn = T) => {
  const keys = Object.keys(a)
  if (keys.length > 0) {
    return keys.reduce((prev, key) => {
      if (b.hasOwnProperty(key) && checkFn(b[key])) {
        prev[key] = b[key]
      }
      else {
        prev[key] = a[key]
      }

      return prev
    }, {})
  }
  return a
}