import persist from '../persist';
import bigInt from 'big-integer';

const PREFIX = 'diagrameditor';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.config.key);
  if (stored) {
        return JSON.parse(localStorage.getItem(persist.config.key))[PREFIX];
    }
    return {
        hn: '',
        ID: 0,
        IDbase: 10
    };
};

const getID = (state) => bigInt(state.ID, state.IDbase)

const setState = (state, name, value) => {
    let newState = undefined;

    switch (name) {
    case 'IDbase':
        console.log(getID(state))
        newState = {
                ...state,
            ID: getID(state).toString(value),
            [name]: value
        }
            break;
        case 'hn':
            console.log(`set hn: ${value}`)
            newState = {
                ...state,
                ID: bigInt(0),
                [name]: value
            }
            break;
      default:
        newState = {
                ...state,
            [name]: value
        }
    }

    console.log(newState);
    return newState;
}

export default function diagramEditorReducer(state = initialState(), action = {}) {
  console.log(`diagramEditorReducer was called with action ${action.type}`);
  switch (action.type) {
  case SET_PARAM:
      return setState(state, action.payload.name, action.payload.value);

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