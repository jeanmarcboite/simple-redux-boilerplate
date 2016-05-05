export function setPrecision(precision) {
  return {
    type: 'SET_PRECISION',
    payload: precision
  };
}
export function setMissingCount(count) {
  return {
    type: 'SET_MISSING_COUNT',
    payload: count
  };
}
export function setVacantPlaces(hand, count) {
  return {
    type: 'SET_VACANT_PLACES',
    payload: {hand: hand, count: count}
  };
}
export function setParam(param, value) {
  return {
  type: 'SET_PARAM',
  payload: {name: param, value: value}
};
}
