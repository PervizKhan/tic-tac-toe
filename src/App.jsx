/* eslint-disable react/prop-types */

import { useState } from "react";
import "./index.css"; // Make sure to include your styles here

const Square = ({ value, onClick }) => {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onSquareClick }) => {
  const renderSquare = (index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => onSquareClick(index)}
        key={index}
      />
    );
  };

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const handleSquareClick = (index) => {
    const squaresCopy = [...squares];
    if (calculateWinner(squaresCopy) || squaresCopy[index]) {
      return;
    }
    squaresCopy[index] = xTurn ? "X" : "O";
    setSquares(squaresCopy);
    setXTurn(!xTurn);
  };

  const winner = calculateWinner(squares);
  const isFull = isBoardFull(squares);
  const status = winner
    ? `Winner: ${winner}`
    : isFull
    ? `It's a draw!`
    : `${xTurn ? "X" : "O"} Player turn`;

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={squares} onSquareClick={handleSquareClick} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default App;
