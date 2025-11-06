import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Holding.css";
import VerticalBarChart from "./VerticleBarChart";

const INR = (n) =>
  typeof n === "number" && Number.isFinite(n)
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 2 })
    : "—";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/getHoldings", { withCredentials: true })
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        setAllHoldings(arr);
      })
      .catch((e) => {
        console.error("Axios error:", e?.code, e?.message);
        setErr(e?.message || "Failed to load holdings");
      })
      .finally(() => setLoading(false));
  }, []);

  const labels = allHoldings.map((h) => h.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((h) => Number(h.price) || 0),
        backgroundColor: "rgba(37, 99, 235, 0.35)", // soft blue
      },
    ],
  };

  const { totalInvestment, totalCurrent, totalPnL, totalPnLPct } = useMemo(() => {
    const totalInvestment = allHoldings.reduce(
      (s, h) => s + Number(h.avg || 0) * Number(h.qty || 0),
      0
    );
    const totalCurrent = allHoldings.reduce(
      (s, h) => s + Number(h.price || 0) * Number(h.qty || 0),
      0
    );
    const totalPnL = totalCurrent - totalInvestment;
    const totalPnLPct = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
    return { totalInvestment, totalCurrent, totalPnL, totalPnLPct };
  }, [allHoldings]);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {/* states */}
      {loading && <div className="hold-state info">Loading holdings…</div>}
      {!!err && !loading && <div className="hold-state error">{err}</div>}
      {!loading && !err && allHoldings.length === 0 && (
        <div className="hold-state empty">No holdings found.</div>
      )}

      {/* table */}
      {!loading && !err && allHoldings.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th className="num">Qty.</th>
                <th className="num">Avg. cost</th>
                <th className="num">LTP</th>
                <th className="num">Cur. val</th>
                <th className="num">P&amp;L</th>
                <th className="num">Net chg.</th>
                <th className="num">Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((h, i) => {
                const qty = Number(h.qty || 0);
                const avg = Number(h.avg || 0);
                const ltp = Number(h.price || 0);
                const curVal = qty * ltp;
                const pnl = (ltp - avg) * qty;
                const isProfit = pnl >= 0;
                const dayIsLoss = !!h.isLoss;

                return (
                  <tr key={i}>
                    <td className="inst">
                      <div className="inst-name">{h.name}</div>
                      {h.symbol ? <div className="inst-sub">{h.symbol}</div> : null}
                    </td>
                    <td className="num">{INR(qty)}</td>
                    <td className="num">{INR(avg)}</td>
                    <td className="num">{INR(ltp)}</td>
                    <td className="num">{INR(curVal)}</td>
                    <td className={`num ${isProfit ? "profit" : "loss"}`}>{INR(pnl)}</td>
                    <td className={`num ${isProfit ? "profit" : "loss"}`}>{h.net}</td>
                    <td className={`num chip ${dayIsLoss ? "loss-chip" : "profit-chip"}`}>
                      {h.day}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* summary cards */}
      <div className="row">
        <div className="col">
          <h5>{INR(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{INR(totalCurrent)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {INR(totalPnL)}{" "}
            <span className={`pct ${totalPnL >= 0 ? "profit" : "loss"}`}>
              ({totalPnL >= 0 ? "+" : ""}
              {Number.isFinite(totalPnLPct) ? totalPnLPct.toFixed(2) : "0.00"}%)
            </span>
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {/* bar chart */}
      <VerticalBarChart data={data} />
    </>
  );
};

export default Holdings;
