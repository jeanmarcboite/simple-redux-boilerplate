import Logger from 'js-logger';
import {REHYDRATE} from 'redux-persist/constants'

export default function suitBreakReducer(state = {}, action) {
  console.log(`suitBreakReducer was called with state ${state}, and action ${action.type}`)
  switch (action.type) {
    case '@@redux/INIT':
    var ls = JSON.parse(localStorage.getItem('redux'))
    console.log(ls['suitbreak']);
    return ls['suitbreak'];
    break;
    case 'SET_PARAM':
    var newstate = JSON.parse(JSON.stringify(state));
    newstate[action.payload.name.toString()] = action.payload.value
      //return state.set(action.payload.name.toString(), action.payload.value)
      return newstate;
      break;
      case REHYDRATE:
      return state.merge(action.payload.suitbreak)
    default:
      return state;
  }
}
