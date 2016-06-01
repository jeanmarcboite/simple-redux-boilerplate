import _ from 'lodash';

import Chance from 'chance';

const chance = new Chance();

const randomUser = () => {
    return ({
        "id": chance.guid(),
        "name": chance.name(),
        "email": chance.email(),
        "birthday": chance.birthday({string: true})
    });
}



export default function usersReducer(state = [], action) {
    // console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_RANDOM_USER':
            return _.concat(state, randomUser());

        case 'ADD_USER':
            return _.concat(state, randomUser());

        case 'DELETE_FIRST_USER':
            return _.tail(state)

        default:
            return state;
    }
}
