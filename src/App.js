import { useState, useEffect } from "react";
import Cell from "./Cell";
import Row from "./Row";

function App() {
    const size = 100;
    const row = size;
    const col = size;
    const [board, setBoard] = useState();

    useEffect(() => {
        let newBoard = new Array(row);
        for (var i = 0; i < row; i++) {
            newBoard[i] = Array.from(Array(col), () => false);
        }
        setBoard(newBoard);
    }, []);

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
        if (!board) return 0;
        let aliveCount = 0;
        for (var i = r - 1; i <= r + 1; i++) {
            for (var j = c - 1; j <= c + 1; j++) {
                if (i < 0 || j < 0 || i >= size || j >= size) continue;
                if (i === r && j === c) continue;
                if (board[i][j]) aliveCount++;
            }
        }
        return aliveCount;
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
                    <Cell
                        key={`${i},${j}`}
                        row={i}
                        col={j}
                        toggle={toggle}
                        alive={board[i][j]}
                        aliveNCount={getAliveNeighborCount(i, j)}
                    />
                );
            }
            rows.push(<Row key={`${i}`}>{singleRow}</Row>);
        }
        return rows;
    };

    return (
        <div>
            {renderBoard()}
            <button onClick={progressTime}>Next</button>
        </div>
    );
}

export default App;
