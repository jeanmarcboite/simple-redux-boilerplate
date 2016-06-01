import _ from 'lodash';

module.exports.scanLeft = function (array, fun, initial) {
    if (typeof fun !== 'function') {
        throw new TypeError();
    }
    const newarray = [initial];

    for (const i in array) {
        newarray.push(fun(_.last(newarray), array[i]));
    }

    return newarray;
};

module.exports.scanRight = function (array, fun, initial) {
    if (typeof fun !== 'function') {
        throw new TypeError();
    }
    const newarray = [initial];

    for (let i = array.length; i-- > 0;) {
        newarray.push(fun(array[i], _.last(newarray)));
    }

    return _.reverse(newarray);
};
