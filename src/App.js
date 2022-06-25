import { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import Row from "./Row";

function App() {
    const size = 75;
    const row = size;
    const col = size;
    const [board, setBoard] = useState();
    const [autoProgress, setAutoProgress] = useState();
    const [autoEnabled, setAutoEnabled] = useState(false);
    const savedCallback = useRef();

    useEffect(() => {
        let newBoard = new Array(row);
        for (var i = 0; i < row; i++) {
            newBoard[i] = Array.from(Array(col), () => false);
        }
        setBoard(newBoard);
    }, []);

    useEffect(() => {
        savedCallback.current = progressTime;
    }, [board]);

    const toggle = (r, c) => {
        let newBoard = new Array(row);
        for (var i = 0; i < row; i++) {
            newBoard[i] = Array.from(Array(col), () => false);
            for (var j = 0; j < col; j++) {
                if (i === r && j === c) {
                    newBoard[i][j] = !board[i][j];
                } else {
                    newBoard[i][j] = board[i][j];
                }
            }
        }
        setBoard(newBoard);
    };

    const progressTime = () => {
        let newBoard = new Array(row);
        for (var i = 0; i < row; i++) {
            newBoard[i] = Array.from(Array(col), () => false);
            for (var j = 0; j < col; j++) {
                let aliveNeighbors = getAliveNeighborCount(i, j);
                if (board[i][j]) {
                    if (aliveNeighbors === 2 || aliveNeighbors === 3) newBoard[i][j] = true;
                } else {
                    if (aliveNeighbors === 3) newBoard[i][j] = true;
                }
            }
        }

        setBoard(newBoard);
    };

    const getAliveNeighborCount = (r, c) => {
        let aliveCount = 0;
        for (var i = r - 1; i <= r + 1; i++) {
            for (var j = c - 1; j <= c + 1; j++) {
                let c_i = dontWrap(i);
                let c_j = dontWrap(j);

                if (i === r && j === c) continue;
                if (board[c_i][c_j]) aliveCount++;
            }
        }
        return aliveCount;
    };

    const reset = () => {
        clearInterval(autoProgress);
        setAutoEnabled(false);
        let newBoard = new Array(row);
        for (var i = 0; i < row; i++) {
            newBoard[i] = Array.from(Array(col), () => false);
        }
        setBoard(newBoard);
    };

    const wrapSafe = (v) => {
        if (v < 0) {
            return size + v;
        }
        if (v >= size) {
            return v % size;
        }
        return v;
    };

    const dontWrap = (v) => {
        if (v < 0) return 0;
        if (v >= size) return size - 1;
        return v;
    };

    const renderBoard = () => {
        if (!board) {
            return <div>Loading...</div>;
        }
        let rows = [];
        for (var i = 0; i < row; i++) {
            let singleRow = [];
            for (var j = 0; j < col; j++) {
                singleRow.push(
                    <Cell key={`${i},${j}`} row={i} col={j} toggle={toggle} alive={board[i][j]} />
                );
            }
            rows.push(<Row key={`${i}`}>{singleRow}</Row>);
        }
        return rows;
    };

    return (
        <div>
            {renderBoard()}
            <div style={{ margin: 10 }}>
                <button onClick={progressTime}>Next</button>
                {!autoEnabled && (
                    <button
                        onClick={() => {
                            let timer = setInterval(() => {
                                savedCallback.current();
                            }, 50);
                            setAutoProgress(timer);
                            setAutoEnabled(true);
                        }}
                        disabled={autoEnabled}
                    >
                        Start
                    </button>
                )}
                {autoEnabled && (
                    <button
                        onClick={() => {
                            clearInterval(autoProgress);
                            setAutoEnabled(false);
                        }}
                        disabled={!autoEnabled}
                    >
                        Stop
                    </button>
                )}
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default App;
