export function setParam(param, value) {
  return {
  type: 'SET_PARAM',
  payload: {name: param, value: value}
};
}
