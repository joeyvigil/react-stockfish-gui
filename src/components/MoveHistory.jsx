import { useRef, useEffect } from 'react';

export default function MoveHistory({ history }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history.length]);

  const rows = [];
  for (let i = 0; i < history.length; i += 2) {
    const n = Math.floor(i / 2) + 1;
    rows.push(
      <div key={i} className="move-row">
        <span className="move-number">{n}.</span>
        <span className="move-white">{history[i]?.san || ''}</span>
        <span className="move-black">{history[i + 1]?.san || ''}</span>
      </div>
    );
  }

  return (
    <div className="move-history">
      <h3>Moves</h3>
      <div className="move-list">
        {rows}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
