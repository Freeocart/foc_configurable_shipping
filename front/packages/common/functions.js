/*
  Parse int with no NaN values
*/
export const intOrNull = value => {
  const number = parseInt(value)
  return isNaN(number) ? null : number
}

/*
  Always returns true
*/
export const T = () => true

/*
  Safe parse JSON
*/
export const parseJsonOr = (json, defaultValue = {}) => {
  try {
    return JSON.parse(json) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};