export const parseJsonOr = (json, defaultValue = {}) => {
  try {
    return JSON.parse(json) || defaultValue
  }
  catch (e) {
    return defaultValue
  }
}
