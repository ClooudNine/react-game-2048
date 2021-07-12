import React, {useCallback, useState, useEffect} from 'react';
import './App.css';
import {addNewNumber, moveDown, moveLeft, moveRight, moveUp, getIsGameOver} from "./logic";

const cellSize = 100;

function App() {
    return <Game size={4} />
}

const Field = ({size, children}) => (
    <div
        style={{
            display: "inline-grid",
            background: "#BBADA0",
            borderRadius: 12,
            gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
            gridGap: 8,
            padding: 8,
        }}>
        {children}
    </div>
)


const valueToColor = {
    0: "#CDC1B4",
    2: "#EEE4DA",
    4: "#EDE0C8",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EBC850",
    1024: "#EEC63F",
    2048: "#EFC32E",
}

const valueToTextColor = {
    0: "#776E65",
    2: "#776E65",
    4: "#776E65",
    8: "#F9F6F2",
    16: "#F9F6F2",
    32: "#F9F6F2",
    64: "#F9F6F2",
    128: "#F9F6F2",
    256: "#F9F6F2",
    512: "#F9F6F2",
    1024: "#F9F6F2",
    2048: "#F9F6F2",
}

const valueToFontSize = {
    0: 44,
    2: 44,
    4: 44,
    8: 44,
    16: 44,
    32: 44,
    64: 44,
    128: 38,
    256: 38,
    512: 38,
    1024: 32,
    2048: 32,
}

const Cell = ({value}) => (
    <div
        style={{
            width: cellSize,
            height: cellSize,
            fontSize: valueToFontSize[value],
            fontWeight: 800,
            backgroundColor: valueToColor[value],
            color: valueToTextColor[value],
            lineHeight: `${cellSize}px`,
            textAlign: "center",
            borderRadius: 8,
        }}>
        {value > 0 ? value : null}
    </div>
);

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
                {state.map((value, index) => <Cell key={index} value={value} />)}
            </Field>
        </div>
    );
}

export default App;
