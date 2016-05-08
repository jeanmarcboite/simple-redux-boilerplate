import Logger from 'js-logger';

export default function handDistributionReducer(state = JSON.parse(localStorage.getItem('redux')).handdistribution, action) {
  var newstate = {twohands: false};
  if (state) newstate = JSON.parse(JSON.stringify(state)); 

  console.log(`handDistributionReducer was called with state ${newstate.twohands}, and action ${action.type} ${action.payload}`)
  switch (action.type) {
    case 'SET_2HANDS':
      newstate.twohands = action.payload
      return newstate;
      break;
    default:
      return newstate;
  }
}
