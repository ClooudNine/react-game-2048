import _ from 'lodash';

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
    .chain(state)
    .chunk(size)
    .map((row => moveCells(row)))
    .flatten()
    .value();

export const moveRight = (state, size) => _
    .chain(state)
    .reverse()
    .chunk(size)
    .map((row => moveCells(row)))
    .flatten()
    .reverse()
    .value();

export const moveUp = (state, size) => _
    .chain(state)
    .chunk(size)
    .unzip()
    .map((row => moveCells(row)))
    .unzip()
    .flatten()
    .value();

export const moveDown = (state, size) => _
    .chain(state)
    .reverse()
    .chunk(size)
    .unzip()
    .map((row => moveCells(row)))
    .unzip()
    .flatten()
    .reverse()
    .value();
