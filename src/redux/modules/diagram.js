import persist from '../persist';

const PREFIX = 'diagram';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.config.key);
  if (stored) {
        return JSON.parse(localStorage.getItem(persist.config.key))[PREFIX];
    }
    return {
      IDbase: 10
    };
};

export default function diagramReducer(state = initialState(), action = {}) {
  console.log(`diagramReducer was called with action ${action.type}`);
  console.log(state);
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
