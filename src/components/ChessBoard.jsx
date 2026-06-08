const PIECE_UNICODE = {
  K: '\u2654', Q: '\u2655', R: '\u2656', B: '\u2657', N: '\u2658', P: '\u2659',
  k: '\u265A', q: '\u265B', r: '\u265C', b: '\u265D', n: '\u265E', p: '\u265F',
};

const FILES = 'abcdefgh';

export default function ChessBoard({ position, onSquareClick, lastMove, flipped, selectedSquare }) {
  const board = [];
  for (let r = 0; r < 8; r++) {
    const fenRow = flipped ? 7 - r : r;
    const rank = 8 - fenRow;
    for (let c = 0; c < 8; c++) {
      const fenCol = flipped ? 7 - c : c;
      const square = FILES[fenCol] + rank;
      const piece = position[fenRow][fenCol];
      const isLight = (fenRow + fenCol) % 2 === 0;
      const isLast = lastMove && (square === lastMove.from || square === lastMove.to);
      const isSelected = square === selectedSquare;
      board.push(
        <div
          key={square}
          className={`square ${isLight ? 'light' : 'dark'} ${isLast ? 'last-move' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => onSquareClick(square)}
        >
          {piece && <span className="piece">{PIECE_UNICODE[piece]}</span>}
        </div>
      );
    }
  }

  return (
    <div className="chessboard">
      {board}
    </div>
  );
}
