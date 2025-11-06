import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLockBodyScroll from "../hooks/useLockBodyScroll";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/orders", label: "Orders" },
  { to: "/holdings", label: "Holdings" },
  { to: "/positions", label: "Positions" },
  { to: "/funds", label: "Funds" },
  { to: "/apps", label: "Apps" },
];

export default function MobileNavDrawer({ open, onClose, username, onLogout }) {
  useLockBodyScroll(open);
  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const lastFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocusRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'a,button,[tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    // focus drawer
    setTimeout(() => drawerRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      const el = lastFocusRef.current;
      if (el && typeof el.focus === "function") el.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) onClose?.();
    // close on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!open) return null;

  return (
    <div className="drawer-overlay" role="presentation" style={{ zIndex: 1100 }} onClick={onClose}>
      <aside
        id="mobile-nav-drawer"
        className="drawer drawer--left"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-labelledby="mobile-nav-title"
        tabIndex={-1}
        ref={drawerRef}
        style={{ zIndex: 1110 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <img src="logo.png" alt="Kite" className="drawer-logo" />
          <button className="drawer-close" aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <h2 id="mobile-nav-title" className="sr-only">Menu</h2>
        <nav className="drawer-nav">
          <div className="drawer-section">
            <div className="drawer-overline">Main</div>
            {links.slice(0,4).map((link) => (
              <button
                key={link.to}
                className={`drawer-link ${location.pathname === link.to ? "is-active" : ""}`}
                onClick={() => { navigate(link.to); onClose?.(); }}
              >{link.label}</button>
            ))}
          </div>
          <div className="drawer-section">
            <div className="drawer-overline">Money</div>
            <button
              className={`drawer-link ${location.pathname === "/funds" ? "is-active" : ""}`}
              onClick={() => { navigate("/funds"); onClose?.(); }}
            >Funds</button>
          </div>
          <div className="drawer-section">
            <div className="drawer-overline">Apps & Settings</div>
            <button
              className={`drawer-link ${location.pathname === "/apps" ? "is-active" : ""}`}
              onClick={() => { navigate("/apps"); onClose?.(); }}
            >Apps</button>
            <button
              className="drawer-link"
              onClick={() => {
                onClose?.();
                // Fire after drawer closes to avoid overlay race
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("openProfileModal"));
                  }, 150);
                });
              }}
            >Profile</button>
            <button className="drawer-link danger" onClick={onLogout}>Logout</button>
          </div>
        </nav>
        <div className="drawer-footer">
          <div className="drawer-profile">
            <div className="prof-avatar" aria-hidden>
              {username?.slice(0, 2).toUpperCase()}
            </div>
            <div className="prof-username" title={username}>{username}</div>
          </div>
          <button className="drawer-logout" onClick={onLogout} aria-label="Logout">
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}


