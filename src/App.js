import React, {useCallback, useState, useEffect} from 'react';
import './App.css';
import {addNewNumber, moveDown, moveLeft, moveRight, moveUp, getIsGameOver, getId} from "./logic";

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
            position: "relative"
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

const Cell = ({value, prevPos, lastMove}) => {
  return (
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
        transform: "translate(0, 0)",
        position: "relative",
        zIndex: prevPos ? "10" : "0",
        animation: value > 0 ? prevPos ? `0.2s ease-in 1 move` : `0.2s ease-in 1s 1 drop` : "none",
        "--ty": ["up", "down"].includes(lastMove) ? `${lastMove === "down" ? "-" : ""}${prevPos * cellSize}px` : "0px",
        "--tx": ["left", "right"].includes(lastMove) ? `${lastMove === "right" ? "-" : ""}${prevPos * cellSize}px` : "0px",
      }}>
      {value > 0 ? value : null}
    </div>
  );
};

const getInitialState = (size) => {
    let state = [];
    for (let i = 0; i < size * size; i++) {
        state.push({value: 0, prevPos: null, id: getId()});
    }
    state = addNewNumber(state);
    state = addNewNumber(state);

    return state
}

const moveToTransformer = {
  up: moveUp,
  down: moveDown,
  left: moveLeft,
  right: moveRight,
}

function Game(props) {
    const {size} = props;
    const [state, setState] = useState(getInitialState(size));
    const [lastMove, setLastMove] = useState(null);

    console.log({state});

    const [isGameOver, setIsGameOver] = useState(false);
    const onMove = useCallback(
        (move) => {
            const transformer = moveToTransformer[move];
            setLastMove(move);
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
            case "ArrowDown": onMove("down"); break;
            case "ArrowUp": onMove("up"); break;
            case "ArrowLeft": onMove("left"); break;
            case "ArrowRight": onMove("right"); break;
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
                <div>
                    <div className="header">
                        <h1>2048</h1>
                        <button onClick={onReset}>Новая игра</button>
                    </div>
                    <Field size={size}>
                        {state.map((value, index) => <Cell key={index} value={value} />)}
                        <div className="endgame">
                            <h3>Игра окончена!</h3>
                            <button onClick={onReset}>Начать новую игру</button>
                        </div>
                    </Field>
                </div>
            </div>
    )}

    return (
        <div>
            <div className="header">
               <h1>2048</h1>
                <button onClick={onReset}>Новая игра</button>
            </div>
            <Field size={size}>
                {state.map((item) => <Cell key={item.id} value={item.value} prevPos={item.prevPos} lastMove={lastMove} />)}
            </Field>
        </div>
    );
}

export default App;
