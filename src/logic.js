import _ from 'lodash';
import {cloneState, isArraysEqualWith} from "./utils";
import {customizer} from "./App";

export const moveCells = (row) => {
    const rowWithPositions = row.map(({value}, index) => ({value, prevPos: index}));

    let numbers = rowWithPositions.filter(item => item.value > 0);
    let result = [];
    numbers.forEach(function (item, index) {
        if (numbers[index + 1] && item.value === numbers[index + 1].value) {
            result.push({value: item.value * 2, prevPos: null, id: getId()});
            numbers.splice(index, 1);
        } else {
            result.push(item)
        }
    })
    for (let i = result.length; i < row.length; i++) {
        result.push({value: 0, prevPos: null});
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
        if (item.value === 0) {
            result.push(index);
        }
    });
    return result;
}

export const getId = () => '_' + Math.random().toString(36).substr(2, 9);

const probabilities = [
    {number: 2, probability: 9},
    {number: 4, probability: 1},
]

export const randomNumbers = probabilities.reduce((acc, {number, probability}) => {
    return [...acc, ...new Array(probability).fill(number)]
}, []);

export const addNewNumber = (state) => {
    const emptyCellIndexes = getEmptyCellIndexes(state);
    const randomEmptyCellIndex = _.sample(emptyCellIndexes);
    let result = cloneState(state);
    result[randomEmptyCellIndex] = {value: _.sample(randomNumbers), prevPos: null, id: getId()}
    return result;
};

export const getIsGameOver = (state, size) => {
    if (state.some((item) => item.value === 0)) {
        return false
    } else {
        return ([moveLeft, moveRight, moveUp, moveDown].every((func) => isArraysEqualWith(state, func(state, size), customizer)));
    }
};