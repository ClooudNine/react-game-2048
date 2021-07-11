import React, {useCallback, useState, useEffect} from 'react';
import './App.css';
import {addNewNumber, moveDown, moveLeft, moveRight, moveUp, getIsGameOver} from "./logic";

const cellSize = 100;

function App() {
    return <Game size={4} />
}

const Field = ({size, children}) => <div style={{display: "flex", width: size * cellSize, height: size * cellSize, flexWrap: "wrap"}}>{children}</div>
const Cell = ({children}) => <div style={{width: cellSize, height: cellSize, fontSize: 24, textAlign: "center", lineHeight: `${cellSize}px`}}>{children}</div>

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
    const [isGameOver, setIsGameOver] = useState(false);
    const onMove = useCallback(
        (transformer) => {
            let newState = transformer(state, size);
            newState = addNewNumber(newState);
            setState(newState);
            if (getIsGameOver(state, size)) {
                setIsGameOver(true);
            }
        },
        [size, state],
    );

    const onKeyDown = useCallback((e) => {
        switch (e.key) {
            case "ArrowDown": onMove(moveDown); break;
            case "ArrowUp": onMove(moveUp); break;
            case "ArrowLeft": onMove(moveLeft); break;
            case "ArrowRight": onMove(moveRight); break;
            default: break;
        }
    }, [onMove]);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);}, [onKeyDown]);

    const onReset = useCallback(
        () => {
            setState(getInitialState(size));
            setIsGameOver(false);
        },
        [size]
    );

    if (isGameOver) {
        return (
            <div>
                <h3>Игра окончена!</h3>
                <button onClick={onReset}>Начать новую игру</button>
            </div>
    )}

    return (
        <div>
            <Field size={size}>
                {state.map((item, index) => <Cell key={index}>{item}</Cell>)}
            </Field>
            {/*<button onClick={onMove}>Влево</button>*/}
            {/*<button onClick={onRight}>Вправо</button>*/}
            {/*<button onClick={onUp}>Вверх</button>*/}
            {/*<button onClick={onDown}>Вниз</button>*/}
        </div>
    );
}

export default App;
