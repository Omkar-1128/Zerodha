import React from "react";

export default function WatchlistHeaderTickers() {
  const nifty = { points: 100.2, pct: 0.45 };
  const sensex = { points: 100.2, pct: -0.12 };
  return (
    <div className="wl-tickers" role="region" aria-label="Market indices">
      <div className="wl-ticker">
        <span className="index">NIFTY 50</span>
        <span className="index-points">{nifty.points}</span>
        <span className={`percent ${nifty.pct >= 0 ? "up" : "down"}`}>{nifty.pct >= 0 ? "+" : ""}{nifty.pct}%</span>
      </div>
      <div className="wl-ticker">
        <span className="index">SENSEX</span>
        <span className="index-points">{sensex.points}</span>
        <span className={`percent ${sensex.pct >= 0 ? "up" : "down"}`}>{sensex.pct >= 0 ? "+" : ""}{sensex.pct}%</span>
      </div>
    </div>
  );
}


