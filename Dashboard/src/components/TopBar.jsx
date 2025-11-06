import React from "react";
import Menu from "./Menu";
import "./TopMenu.css";

const TopBar = () => {
  // demo numbers; wire these to live data when ready
  const nifty = { points: 100.2, pct: 0.45 };
  const sensex = { points: 100.2, pct: -0.12 };

  return (
    <div className="topbar-container">
      <div className="topbar-inner">
        <div className="indices-container">
          <div className="index-card">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{nifty.points}</p>
            <p className={`percent ${nifty.pct >= 0 ? "up" : "down"}`}>
              {nifty.pct >= 0 ? "+" : ""}
              {nifty.pct}%
            </p>
          </div>

          <div className="index-card">
            <p className="index">SENSEX</p>
            <p className="index-points">{sensex.points}</p>
            <p className={`percent ${sensex.pct >= 0 ? "up" : "down"}`}>
              {sensex.pct >= 0 ? "+" : ""}
              {sensex.pct}%
            </p>
          </div>
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
