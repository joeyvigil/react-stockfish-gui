const STOCKFISH_API_URL = 'https://stockfish.online/api/s/v2.php';

export async function getBestMove(fen, depth = 15) {
  const params = new URLSearchParams({ fen, depth });
  const res = await fetch(`${STOCKFISH_API_URL}?${params}`);
  if (!res.ok) throw new Error(`Stockfish API error: ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Stockfish API returned failure');
  return data.bestmove;
}
