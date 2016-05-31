import persist from '../persist';

const PREFIX = 'suitbreak';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.config.key);
  if (stored) {
        return JSON.parse(localStorage.getItem(persist.config.key))[PREFIX];
    }
    return {
      precision: 1,
      missing: 4,
      leftVacant: 13,
      rightVacant: 13
    };
};

export default function suitBreakReducer(state = initialState(), action = {}) {
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
