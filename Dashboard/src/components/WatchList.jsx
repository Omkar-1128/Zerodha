import React, { useState, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "./Modal";
import axios from "axios";
import { toast, ToastContainer  } from "react-toastify";

const WatchList = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [mode, setMode] = useState("BUY");
  const [qty, setQty] = useState(1);

  // modal open hote hi quantity reset
  useEffect(() => {
    if (orderModalOpen) setQty(1);
  }, [orderModalOpen, selectedStock]);

  // unit price ko number me sanitize (₹ ya commas ho to bhi chalega)
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
        mode, // "BUY" or "SELL"
      };
      const { data } = await axios.post(
        "http://localhost:8080/orders",
        payload,
        { withCredentials: true }
      );
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

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, idx) => {
          return (
            <WatchListItem
              stock={stock}
              key={idx}
              onBuy={() => openOrderModal(stock, "BUY")}
              onSell={() => openOrderModal(stock, "SELL")}
            />
          );
        })}
      </ul>

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
          <h3
            style={{ marginBottom: "4px", textAlign: "center", color: "#333" }}
          >
            {mode} {selectedStock?.name ?? ""}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", color: "#555" }}>Quantity</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              placeholder="Enter Quantity"
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <p style={{ fontSize: "15px", marginTop: "4px", marginBottom: 0 }}>
            <strong>Price (per unit):</strong> ₹
            {unitPrice.toLocaleString("en-IN")}
          </p>
          <p style={{ fontSize: "16px", marginTop: "2px" }}>
            <strong>Total:</strong> ₹
            {total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>

          <button
            onClick={placeOrder}
            disabled={qty < 1 || unitPrice <= 0}
            style={{
              marginTop: "10px",
              padding: "10px 0",
              backgroundColor:
                qty < 1 || unitPrice <= 0 ? "#9e9e9e" : "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: qty < 1 || unitPrice <= 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "15px",
              transition: "0.2s ease",
            }}
            onMouseOver={(e) => {
              if (qty >= 1 && unitPrice > 0)
                e.target.style.backgroundColor = "#1b5e20";
            }}
            onMouseOut={(e) => {
              if (qty >= 1 && unitPrice > 0)
                e.target.style.backgroundColor = "#2e7d32";
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
      < ToastContainer />
    </div>
    
  );
};

export default WatchList;

const WatchListItem = ({ stock, onBuy, onSell }) => {
  let [showWatchListActions, setShowWatchListActions] = useState(false);

  function handleMouseEnter() {
    setShowWatchListActions(true);
  }

  function handleMouseExit() {
    setShowWatchListActions(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="down" />
          ) : (
            <KeyboardArrowUpIcon className="up" />
          )}
          <span>{stock.price}</span>
        </div>
        {showWatchListActions && <WatchListActions onBuy={onBuy} onSell={onSell} />}
      </div>
    </li>
  );
};

const WatchListActions = ({ onBuy, onSell }) => {
  return (
    <>
      <span className="actions">
        <span>
          <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
            <button className="buy" onClick={onBuy}>
              B
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip
            title="Sell"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="sell" onClick={onSell}>S</button>
          </Tooltip>
        </span>

        <span>
          <Tooltip
            title="Menu"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <ListIcon />
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip
            title="Analytics"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <BarChartIcon className="icon" />
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip
            title="Delete"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <DeleteForeverIcon />
            </button>
          </Tooltip>
        </span>

        <span>
          <Tooltip
            title="More"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <MoreVertIcon />
            </button>
          </Tooltip>
        </span>

        <span></span>
      </span>
    </>
  );
};
