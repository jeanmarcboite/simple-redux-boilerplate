const SET_PARAM = 'distribution/SET_PARAM';

const initialState = () => {
  var stored = localStorage.getItem('redux');
  if (stored) {
    return JSON.parse(localStorage.getItem('redux')).distribution;
  }
  console.log('return initialState');
  return {
    twoHands: false
  };
};


export default function distributionReducer(state = initialState(), action = {}) {
  'use strict';
  console.log(`distributionReducer was called with action ${action.type}`);
  switch (action.type) {
    case SET_PARAM:
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
    default:
    return state;
  }
}

export function setDistributionParam(param, value) {
  return {
    type: SET_PARAM,
    payload: {name: param, value: value}
  };
}


export function set2Hands(bool) {
  return {
    type: 'SET_2HANDS',
    payload: bool
  };
}
