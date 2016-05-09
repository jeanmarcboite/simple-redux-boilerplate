import persist from '../persist';

const PREFIX = 'distribution';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.key);
  if (stored) {
    return JSON.parse(localStorage.getItem(persist.key))[PREFIX];
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

export function setParam(param, value) {
  return {
    type: SET_PARAM,
    payload: {name: param, value: value}
  };
}
