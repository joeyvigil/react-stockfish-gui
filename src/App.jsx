import { useState, useCallback, useRef, useReducer } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import GameInfo from './components/GameInfo';
import MoveHistory from './components/MoveHistory';
import { getBestMove } from './services/stockfishApi';
import './App.css';

function fenToBoard(fen) {
  const rows = fen.split(' ')[0].split('/');
  return rows.map(row => {
    const squares = [];
    for (const ch of row) {
      if (isNaN(ch)) {
        squares.push(ch);
      } else {
        for (let i = 0; i < parseInt(ch); i++) squares.push(null);
      }
    }
    return squares;
  });
}

function App() {
  const game = useRef(new Chess());
  const [, forceRender] = useReducer(x => x + 1, 0);
  const [selected, setSelected] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('');
  const [thinking, setThinking] = useState(false);

  const aiMove = useCallback(async () => {
    setThinking(true);
    setStatus('Stockfish is thinking...');
    try {
      const bestMove = (await getBestMove(game.current.fen())).trim();
      const result = game.current.move(bestMove, { sloppy: true });
      setHistory(game.current.history({ verbose: true }));
      setLastMove({ from: result.from, to: result.to });
      setStatus('');
      forceRender();
    } catch (err) {
      setStatus(`API error: ${err.message}`);
      forceRender();
    } finally {
      setThinking(false);
    }
  }, []);

  const handleSquareClick = useCallback((square) => {
    if (thinking || game.current.turn() === 'b') return;

    if (selected) {
      const moves = game.current.moves({ square: selected, verbose: true });
      const move = moves.find(m => m.to === square || m.san === square);
      if (move) {
        game.current.move(move);
        setHistory(game.current.history({ verbose: true }));
        setLastMove({ from: move.from, to: move.to });
        setSelected(null);
        forceRender();

        if (!game.current.isGameOver()) {
          setTimeout(aiMove, 100);
        }
        return;
      }
      setSelected(null);
    }

    const clickedMoves = game.current.moves({ square, verbose: true });
    if (clickedMoves.length > 0) {
      setSelected(square);
    }
  }, [selected, thinking, aiMove]);

  const resetGame = () => {
    game.current = new Chess();
    setSelected(null);
    setLastMove(null);
    setHistory([]);
    setStatus('');
    setThinking(false);
    forceRender();
  };

  return (
    <div className="app">
      <div className="board-section">
        <GameInfo game={game.current} side="w" status={status} />
        <ChessBoard
          position={fenToBoard(game.current.fen())}
          onSquareClick={handleSquareClick}
          lastMove={lastMove}
          flipped={false}
          selectedSquare={selected}
        />
        <button className="reset-btn" onClick={resetGame}>New Game</button>
      </div>
      <MoveHistory history={history} />
    </div>
  );
}

export default App;
