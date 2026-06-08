export default function GameInfo({ game, gameOver, side, status }) {
  const turn = game.turn() === 'w' ? 'White' : 'Black';
  const inCheck = game.isCheck();
  const inCheckmate = game.isCheckmate();
  const inStalemate = game.isStalemate();
  const inDraw = game.isDraw();

  let message = `${turn} to move`;
  if (inCheckmate) message = `Checkmate! ${turn === 'White' ? 'Black' : 'White'} wins!`;
  else if (inStalemate) message = 'Stalemate – draw';
  else if (inDraw) message = 'Draw';
  else if (inCheck) message = `${turn} is in check`;

  return (
    <div className="game-info">
      <h2>Stockfish API GUI</h2>
      <p className="status">{message}</p>
      {status && <p className="api-status">{status}</p>}
      <p className="side">You play <strong>{side === 'w' ? 'White' : 'Black'}</strong></p>
    </div>
  );
}
