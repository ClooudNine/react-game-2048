import React, {useCallback, useState} from 'react';
import './App.css';
import _ from 'lodash';
import {cloneState} from "./utils";
import {moveLeft, moveRight, moveUp, moveDown} from "./logic";

const cellSize = 100;

function App() {
    return <Game size={4} />
}

const Field = ({size, children}) => <div style={{display: "flex", width: size * cellSize, height: size * cellSize, flexWrap: "wrap"}}>{children}</div>
const Cell = ({children}) => <div style={{width: cellSize, height: cellSize, fontSize: 24, textAlign: "center", lineHeight: `${cellSize}px`}}>{children}</div>

let randomNumbers = [2, 2, 2, 2, 4];

const getEmptyCellIndexes = (state) => {
    const result = [];
    state.forEach((item, index) => {
        if (item === 0) {
            result.push(index);
        }
    });
    return result;
}

const addNewNumber = (state) => {
    const emptyCellIndexes = getEmptyCellIndexes(state);
    const randomEmptyCellIndex = _.sample(emptyCellIndexes);
    let result = cloneState(state);
    result[randomEmptyCellIndex] = _.sample(randomNumbers);
    return result;
}

const getInitialState = (size) => {
    let state = [];
    for (let i = 0; i < size * size; i++) {
        state.push(0);
    }
    state = addNewNumber(state);
    state = addNewNumber(state);

    return state
}

function Game(props) {
    const {size} = props;
    const [state, setState] = useState(getInitialState(size));
    const onLeft = useCallback(
        () => {
            let newState = moveLeft(state, size);
            newState = addNewNumber(newState);
            setState(newState);
        },
        [size, state],
    );
    const onRight = useCallback(
        () => {
            let newState = moveRight(state, size);
            newState = addNewNumber(newState);
            setState(newState);
        },
        [size, state],
    );
    const onUp = useCallback(
        () => {
            let newState = moveUp(state, size);
            newState = addNewNumber(newState);
            setState(newState);
        },
        [size, state],
    );
    const onDown = useCallback(
        () => {
            let newState = moveDown(state, size);
            newState = addNewNumber(newState);
            setState(newState);
        },
        [size, state],
    );
    return (
        <div>
            <Field size={size}>
                {state.map(item => <Cell>{item}</Cell>)}
            </Field>
            <button onClick={onLeft}>Влево</button>
            <button onClick={onRight}>Вправо</button>
            <button onClick={onUp}>Вверх</button>
            <button onClick={onDown}>Вниз</button>
        </div>
    );
}

export default App;
