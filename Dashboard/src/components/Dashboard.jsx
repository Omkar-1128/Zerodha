import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import WatchlistDrawer from "./WatchlistDrawer";

const Dashboard = () => {
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsWatchlistOpen(false); };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setIsWatchlistOpen(true);
    const onCloseReq = () => setIsWatchlistOpen(false);
    window.addEventListener("openWatchlist", onOpen);
    window.addEventListener("closeWatchlist", onCloseReq);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("openWatchlist", onOpen);
      window.removeEventListener("closeWatchlist", onCloseReq);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Desktop watchlist visible, hidden on mobile via CSS */}
      <WatchList />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>

      {/* Mobile FAB to open watchlist */}
      <button
        className="watchlist-fab"
        aria-label="Open watchlist"
        onClick={() => setIsWatchlistOpen(true)}
      >
        ★ Watchlist
      </button>

      <WatchlistDrawer open={isWatchlistOpen} onClose={() => setIsWatchlistOpen(false)} />
    </div>
  );
};

export default Dashboard;
