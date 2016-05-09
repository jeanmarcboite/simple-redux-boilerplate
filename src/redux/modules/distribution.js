const SET_PARAM = 'distribution/SET_PARAM';

const initialState = () => {
  var stored = localStorage.getItem('redux');
  if (stored) {
    return JSON.parse(localStorage.getItem('redux')).distribution;
  }
  return {
    twoHands: false
  };
};


export default function distributionReducer(state = initialState(), action = {}) {
  'use strict';
  console.log(`distributionReducer was called with state ${state}, and action ${action.type}`);
  switch (action.type) {
    case SET_PARAM:
    var newstate = JSON.parse(JSON.stringify(state));
    newstate[action.payload.name.toString()] = action.payload.value;
    return newstate;
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
