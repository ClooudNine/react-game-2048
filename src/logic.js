import _ from 'lodash';
import {cloneState} from "./utils";

export const moveCells = (row) => {
    let numbers = row.filter(item => item > 0);
    let result = [];
    numbers.forEach(function (item, index) {
        if (item === numbers[index + 1]) {
            result.push(item + numbers[index + 1]);
            numbers.splice(index, 1);
        } else {
            result.push(item)
        }
    })
    for (let i = result.length; i < row.length; i++) {
        result.push(0);
    }
    return result;
}

export const moveLeft = (state, size) => _
    .chain(cloneState(state))
    .chunk(size)
    .map((row => moveCells(row)))
    .flatten()
    .value();

export const moveRight = (state, size) => _
    .chain(cloneState(state))
    .reverse()
    .chunk(size)
    .map((row => moveCells(row)))
    .flatten()
    .reverse()
    .value();

export const moveUp = (state, size) => _
    .chain(cloneState(state))
    .chunk(size)
    .unzip()
    .map((row => moveCells(row)))
    .unzip()
    .flatten()
    .value();

export const moveDown = (state, size) => _
    .chain(cloneState(state))
    .reverse()
    .chunk(size)
    .unzip()
    .map((row => moveCells(row)))
    .unzip()
    .flatten()
    .reverse()
    .value();

export const getEmptyCellIndexes = (state) => {
    const result = [];
    state.forEach((item, index) => {
        if (item === 0) {
            result.push(index);
        }
    });
    return result;
}

export const randomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];

export const addNewNumber = (state) => {
    const emptyCellIndexes = getEmptyCellIndexes(state);
    const randomEmptyCellIndex = _.sample(emptyCellIndexes);
    let result = cloneState(state);
    result[randomEmptyCellIndex] = _.sample(randomNumbers);
    return result;
};


export const getIsGameOver = (state, size) => {
    if (state.includes(0)) {
        return false
    } else return ([moveLeft, moveRight, moveUp, moveDown].every((func) => _.isEqual(func(state, size), state)));
};