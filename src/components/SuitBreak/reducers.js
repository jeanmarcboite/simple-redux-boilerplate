import Logger from 'js-logger';
import {REHYDRATE} from 'redux-persist/constants'

export default function suitBreakReducer(state = JSON.parse(localStorage.getItem('redux')).suitbreak, action) {
  console.log(`suitBreakReducer was called with state ${state}, and action ${action.type}`)
  switch (action.type) {
    case 'SET_PARAM':
      var newstate = JSON.parse(JSON.stringify(state));
      newstate[action.payload.name.toString()] = action.payload.value
      return newstate;
      break;
    default:
      return state;
  }
}
