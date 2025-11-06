import React, { useEffect } from "react";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import WatchList from "./WatchList";
import WatchlistHeaderTickers from "./WatchlistHeaderTickers";

export default function WatchlistDrawer({ open, onClose }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="presentation">
      <aside
        className="drawer drawer--left drawer--full"
        role="dialog"
        aria-modal="true"
        aria-label="Watchlist"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-title">Watchlist</div>
          <button className="drawer-close" aria-label="Close watchlist" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-content">
          <WatchlistHeaderTickers />
          <WatchList />
        </div>
      </aside>
    </div>
  );
}


