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
const Cell = ({children}) => <div style={{width: cellSize, height: cellSize, fontSize:24, textAlign: "center", lineHeight: `${cellSize}px`}}>{children}</div>

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
    let result = [];
    for (let i = 0; i < size * size; i++) {
        result.push(0);
    }
    result = addNewNumber(result);
    result = addNewNumber(result);

    return result
}

function Game(props) {
    const {size} = props;
    const [state, setState] = useState(getInitialState(size));
    const left = useCallback(
        () => {
            let newstate = moveLeft(state, size)
            setState(newstate);
        },
        
        [state],
    );
    const right = useCallback(
        () => {
            let newstate = moveRight(state, size)
            setState(newstate);
        },

        [state],
    );
    const up = useCallback(
        () => {
            let newstate = moveUp(state, size)
            setState(newstate);
        },

        [state],
    );
    const down = useCallback(
        () => {
            let newstate = moveDown(state, size)
            setState(newstate);
        },

        [state],
    );
    return (
        <div>
            <Field size={size}>
                {state.map(item => <Cell>{item}</Cell>)}
            </Field>
            <button onClick={left}>Влево</button>
            <button onClick={right}>Вправо</button>
            <button onClick={up}>Вверх</button>
            <button onClick={down}>Вниз</button>
        </div>
    );
}

export default App;
