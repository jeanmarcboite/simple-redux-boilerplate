const SET_PARAM = 'suitbreak/SET_PARAM'

initialState = () => {
  var stored = localStorage.getItem('redux');
  if (stored) {
        return JSON.parse(localStorage.getItem('redux')).suitbreak;
    }
    return {
      precision: 1,
      missing: 4,
      leftVacant: 13,
      rightVacant: 13
    }
}

export default function suitBreakReducer(state = initialState(), action) {
  console.log(`suitBreakReducer was called with state ${state}, and action ${action.type}`)
  switch (action.type) {
    case SET_PARAM:
      var newstate = JSON.parse(JSON.stringify(state));
      newstate[action.payload.name.toString()] = action.payload.value
      return newstate;
      break;
    default:
      return state;
  }
}

export function setSuitBreakParam(param, value) {
  return {
  type: SET_PARAM,
  payload: {name: param, value: value}
};
}
