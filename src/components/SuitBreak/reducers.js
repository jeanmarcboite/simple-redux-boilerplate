import {Map} from 'immutable';

export default function suitBreakReducer(state = Map(), action) {
  console.log(`precision was: ${state.get('precision')}`)
  switch (action.type) {
    case 'SET_PRECISION':
      return state.set('precision', action.payload)
      break;
    case 'SET_PARAM':
      return state.set(action.payload.name, action.payload.value)
      break;
    default:
      return state;
  }
}
