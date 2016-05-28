import persist from '../persist';

const PREFIX = 'diagrameditor';
const SET_PARAM = PREFIX + '/SET_PARAM';

exports.prefix = PREFIX;

const initialState = () => {
  var stored = localStorage.getItem(persist.config.key);
  if (stored) {
        return JSON.parse(localStorage.getItem(persist.config.key))[PREFIX];
    }
    return {
        ID: 0,
        IDbase: 10
    };
};

const setState = (state, name, value) => {
    var newState = undefined;

    switch (name) {
    case 'IDbase':
    console.log(parseInt(state.ID, state.IDbase))
        newState = {
                ...state,
            ID: parseInt(state.ID, state.IDbase).toString(value),
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
