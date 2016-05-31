import persist from '../persist';

const PREFIX = 'distribution';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.config.key);
  if (stored) {
    return JSON.parse(localStorage.getItem(persist.config.key))[PREFIX];
  }
    return {
        HCPrange: 1,
    twoHands: false,
    cardCount: 5,
    precision: 1
  };
};


export default function distributionReducer(state = initialState(), action = {}) {
  'use strict';
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
