import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Summary.css"
import { API_BASE_URL } from "../config/api.js";

const INR = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 2 })
    : "—";

const isToday = (d) => {
  if (!d) return false;
  const x = new Date(d);
  const now = new Date();
  return (
    x.getFullYear() === now.getFullYear() &&
    x.getMonth() === now.getMonth() &&
    x.getDate() === now.getDate()
  );
};

const Summary = () => {
  const [username, setUsername] = useState("");

  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Cookie is httpOnly, so we can't check it directly
        // Always try to verify - cookie will be sent automatically with withCredentials: true
        const ver = await axios.post(
          `${API_BASE_URL}/verify`,
          {},
          { withCredentials: true }
        );
        if (ver?.data?.status) setUsername(ver.data.user || "User");

        // fetch data in parallel
        const [hRes, pRes, oRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/getHoldings`, {
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/getPositions`, {
            withCredentials: true,
          }),
          axios.get(`${API_BASE_URL}/orders`, {
            withCredentials: true,
          }),
        ]);

        setHoldings(Array.isArray(hRes.data) ? hRes.data : []);
        setPositions(Array.isArray(pRes.data) ? pRes.data : []);
        // sort orders newest first (like your Orders page)
        const olist = Array.isArray(oRes.data) ? oRes.data : [];
        olist.sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        );
        setOrders(olist);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [cookies]);

  // ---- derived metrics ----
  const {
    holdingsCount,
    investment,
    currentValue,
    pnl,
    pnlPct,
    ordersTodayCount,
  } = useMemo(() => {
    const holdingsCount = holdings.length;

    const investment = holdings.reduce(
      (sum, h) => sum + Number(h.avg || 0) * Number(h.qty || 0),
      0
    );
    const currentValue = holdings.reduce(
      (sum, h) => sum + Number(h.price || 0) * Number(h.qty || 0),
      0
    );
    const pnl = currentValue - investment;
    const pnlPct = investment > 0 ? (pnl / investment) * 100 : 0;

    const ordersTodayCount = orders.filter(
      (o) => isToday(o.updatedAt) || isToday(o.createdAt)
    ).length;

    return {
      holdingsCount,
      investment,
      currentValue,
      pnl,
      pnlPct,
      ordersTodayCount,
    };
  }, [holdings, orders]);

  // NOTE: we don't have a funds endpoint here, so we keep "Margin available"
  // as "—". If you add a funds/balance API, compute and display it here.
  const marginAvailable = null; // placeholder (no API given)
  const marginsUsed = 0; // adjust if you track this in backend

  if (loading) {
    return (
      <>
        <div className="username">
          <h6>Loading…</h6>
          <hr className="divider" />
        </div>
      </>
    );
  }

  return (
    <div className="summary-root">
      <div className="username">
        <h6>Hi, {username || "User"}!</h6>
        <hr className="divider" />
      </div>

      {/* EQUITY / FUNDS SUMMARY */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{marginAvailable == null ? "—" : INR(marginAvailable)}</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>{INR(marginsUsed)}</span>
            </p>
            <p>
              Opening balance <span>{INR(investment)}</span>
            </p>
            {/* Tiny bonus: show orders today count to add useful context */}
            <p style={{ marginTop: 6 }}>
              Orders today <span>{ordersTodayCount}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* HOLDINGS SUMMARY */}
      <div className="section">
        <span>
          <p>Holdings ({holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {INR(pnl)}{" "}
              <small>
                {pnl >= 0 ? "+" : ""}
                {Number.isFinite(pnlPct) ? pnlPct.toFixed(2) : "0.00"}%
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value <span>{INR(currentValue)}</span>
            </p>
            <p>
              Investment <span>{INR(investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* POSITIONS QUICK GLANCE (optional) */}
      <div className="section">
        <span>
          <p>Positions ({positions.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {
                // net not strictly numeric (schema shows string). We'll safely sum numerics we can parse.
                INR(
                  positions.reduce((sum, p) => {
                    const n = Number(String(p.net || "0").replace(/[^0-9.-]/g, ""));
                    return sum + (Number.isFinite(n) ? n : 0);
                  }, 0)
                )
              }
            </h3>
            <p>Net (sum)</p>
          </div>
          <hr />
          <div className="second">
            <p>
              In profit{" "}
              <span>
                {
                  positions.filter((p) => p.isLoss === false).length
                }
              </span>
            </p>
            <p>
              In loss{" "}
              <span>
                {positions.filter((p) => p.isLoss === true).length}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Summary;
