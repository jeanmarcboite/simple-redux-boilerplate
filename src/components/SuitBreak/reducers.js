import {Map} from 'immutable';

export default function suitBreakReducer(state = Map({precision : 1, missing: 4, leftVacant: 13, rightVacant: 13}), action) {
  switch (action.type) {
    case 'SET_PARAM':
      return state.set(`${action.payload.name}`, action.payload.value)
      break;
    default:
      return state;
  }
}
