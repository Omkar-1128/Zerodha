import React, { useEffect, useMemo, useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "./Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PieChart from "./PieChart.jsx";
import "react-toastify/dist/ReactToastify.css";
// ⬇️ ensure your old CSS is imported (this often fixes “lost styles”)
import "./watchlist.css"; // <-- add/keep your old stylesheet here

// === Configuration ===
const SYMBOLS = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN"];
const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://zerodha-onfe.onrender.com";

// two-decimal formatter (keeps UX consistent)
const formatPrice = (n, locale = "en-US") =>
  Number(n || 0).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function WatchList() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [mode, setMode] = useState("BUY");
  const [qty, setQty] = useState(1);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderModalOpen) setQty(1);
  }, [orderModalOpen, selectedStock]);

  const unitPrice =
    Number(String(selectedStock?.price ?? 0).replace(/[^0-9.]/g, "")) || 0;
  const total = (Number(qty) > 0 ? Number(qty) : 0) * unitPrice;

  const placeOrder = async () => {
    if (!selectedStock) return;
    try {
      const payload = {
        name: selectedStock.name,
        qty: Number(qty),
        price: Number(unitPrice),
        mode,
      };
      const { data } = await axios.post(`${BACKEND_URL}/orders`, payload, {
        withCredentials: true,
      });
      if (data?.success) {
        toast.success(
          `${mode} order placed successfully for ${selectedStock.name}!`,
          { position: "bottom-right" }
        );
        closeOrderModal();
      } else {
        toast.error(data?.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again.");
    }
  };

  const openOrderModal = (stock, m = "BUY") => {
    setSelectedStock(stock);
    setMode(m);
    setOrderModalOpen(true);
  };
  const closeOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedStock(null);
  };

  // ---- API + fallback ----
  const parseNumber = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };

  const normalizeAPI = (payload) => {
    const root =
      payload && typeof payload === "object" && payload.data && typeof payload.data === "object"
        ? payload.data
        : payload;

    if (root?.status === "error" || root?.code) {
      throw new Error(root?.message || "API error");
    }

    const list = SYMBOLS.map((sym) => root?.[sym]).filter(Boolean);

    return list
      .filter((q) => !q?.code)
      .map((q) => {
        const price =
          parseNumber(q.price) ||
          parseNumber(q.close) ||
          parseNumber(q.previous_close);

        let pct = parseNumber(q.percent_change);
        if (!Number.isFinite(pct) || pct === 0) {
          const close = parseNumber(q.close);
          const prev = parseNumber(q.previous_close);
          pct = prev > 0 ? ((close - prev) / prev) * 100 : 0;
        }

        return {
          name: q.name || q.symbol,
          price, // number; we format at render
          percent: `${pct.toFixed(2)}%`,
          isDown: pct < 0,
        };
      });
  };

  const fetchFromAPI = async () => {
    if (!API_KEY) throw new Error("Missing API key");
    const url = `https://api.twelvedata.com/quote?symbol=${SYMBOLS.join(",")}&apikey=${API_KEY}`;
    const { data } = await axios.get(url, { timeout: 10000 });
    return normalizeAPI(data);
  };

  const fetchFromMongo = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/watchlist`, {
      withCredentials: true,
    });
    if (!data || !Array.isArray(data)) throw new Error("Invalid Mongo data");
    return data.map((s) => ({
      name: s.name,
      price: Number(s.price) || 0,
      percent: s.percent || "0.00%",
      isDown: s.isDown ?? false,
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiRows = await fetchFromAPI();
      if (apiRows?.length) {
        setRows(apiRows);
      } else {
        throw new Error("Empty API data");
      }
    } catch (e) {
      console.warn("API failed → fallback to Mongo:", e?.message);
      try {
        const mongoRows = await fetchFromMongo();
        setRows(mongoRows);
      } catch (mErr) {
        console.error("Mongo fallback failed:", mErr);
        toast.error("Failed to load data from both API and MongoDB");
        setRows([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30000); // ⬅️ 30 seconds
    return () => clearInterval(id);
  }, []);

  // ---- PieChart ----
  const pieData = useMemo(() => {
    const labels = rows.map((s) => s.name);
    const data = rows.map((s) => Number(s.price) || 0);
    return {
      labels,
      datasets: [
        {
          label: "Price",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [rows]);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, gold mcx"
          className="search"
        />
        <span className="counts"> {rows.length} / 50</span>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul className="list">
          {rows.map((stock, idx) => (
            <WatchListItem
              key={idx}
              stock={stock}
              onBuy={() => openOrderModal(stock, "BUY")}
              onSell={() => openOrderModal(stock, "SELL")}
            />
          ))}
        </ul>
      )}

      <PieChart data={pieData} />

      <Modal isOpen={orderModalOpen} onClose={closeOrderModal} title>
        <div
          style={{
            minWidth: 300,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "stretch",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {mode} {selectedStock?.name ?? ""}
          </h3>

          <label>Quantity</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />

          <p>
            <strong>Price:</strong>{" "}
            ₹{formatPrice(unitPrice, "en-IN")}
          </p>
          <p>
            <strong>Total:</strong>{" "}
            ₹{Number(total).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <button
            onClick={placeOrder}
            disabled={qty < 1 || unitPrice <= 0}
            className="confirm-btn"
          >
            Confirm
          </button>
        </div>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

function WatchListItem({ stock, onBuy, onSell }) {
  const [showActions, setShowActions] = useState(false);
  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="down" />
          ) : (
            <KeyboardArrowUpIcon className="up" />
          )}
          {/* two-decimal display */}
          <span>{formatPrice(stock.price)}</span>
        </div>

        {showActions && (
          <span className="actions">
            <Tooltip title="Buy" arrow TransitionComponent={Grow}>
              <button className="buy" onClick={onBuy}>
                B
              </button>
            </Tooltip>
            <Tooltip title="Sell" arrow TransitionComponent={Grow}>
              <button className="sell" onClick={onSell}>
                S
              </button>
            </Tooltip>
            <Tooltip title="Menu" arrow TransitionComponent={Grow}>
              <button className="action">
                <ListIcon />
              </button>
            </Tooltip>
            <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
              <button className="action">
                <BarChartIcon />
              </button>
            </Tooltip>
            <Tooltip title="Delete" arrow TransitionComponent={Grow}>
              <button className="action">
                <DeleteForeverIcon />
              </button>
            </Tooltip>
            <Tooltip title="More" arrow TransitionComponent={Grow}>
              <button className="action">
                <MoreVertIcon />
              </button>
            </Tooltip>
          </span>
        )}
      </div>
    </li>
  );
}
