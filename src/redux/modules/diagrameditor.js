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
        hn: undefined,
        ID: undefined,
        IDbase: 10
    };
};

const getID = (state) => bigInt(state.ID, state.IDbase)

const setState = (state, name, value) => {
    let newState = undefined;

    switch (name) {
    case 'IDbase':
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
                ID: undefined,
                [name]: value
            }
            break;
      default:
        newState = {
                ...state,
            [name]: value
        }
    }
    return newState;
}

export default function diagramEditorReducer(state = initialState(), action = {}) {
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
