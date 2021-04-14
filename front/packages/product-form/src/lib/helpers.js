export const parseJsonOr = (json, defaultValue = {}) => {
  try {
    return JSON.parse(json) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const intOrNull = (value) => {
  const number = parseInt(value);
  return isNaN(number) ? null : number;
};
