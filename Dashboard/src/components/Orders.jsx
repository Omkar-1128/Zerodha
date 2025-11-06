import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import { API_BASE_URL } from "../config/api.js";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/orders`)
      .then((res) => {
        const sortedOrders = res.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setAllOrders(sortedOrders);
      })
      .catch((err) => {
        console.error("Axios error:", err?.code, err?.message);
        console.error("Full error:", err?.toJSON?.() || err);
      });
  }, []);

  function formatOrderTime(utcString) {
    if (!utcString) return "";
    const date = new Date(utcString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  }

  return (
    <>
      <h3 className="orders__title">Orders ({allOrders.length})</h3>

      <div className="orders__container">
        {allOrders.length === 0 ? (
          <div className="orders__empty">
            <p className="orders__empty-text">
              You haven't placed any orders today
            </p>
            <Link to={"/"} className="orders__btn">
              Get started
            </Link>
          </div>
        ) : (
          <div className="orders__table-wrapper">
            <table className="orders__table">
              <thead className="orders__thead">
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Mode</th>
                  <th>Avg. Cost (₹)</th>
                  <th>Total Value (₹)</th>
                  <th>Status</th>
                  <th>Order Time</th>
                </tr>
              </thead>
              <tbody className="orders__tbody">
                {allOrders.map((order, index) => {
                  const total = (order.qty * order.price).toFixed(2);
                  const status = order.status || "NAN";
                  return (
                    <tr key={order._id || index} className="orders__row">
                      <td>{order.name}</td>
                      <td className="orders__cell--num">{order.qty}</td>
                      <td
                        className={`orders__mode ${
                          (order.mode == "BUY")? "orders__mode--buy": "orders__mode--sell"
                        }`}
                      >
                        {order.mode}
                      </td>
                      <td className="orders__cell--num">
                        {order.price.toFixed(2)}
                      </td>
                      <td className="orders__cell--num">{total}</td>
                      <td>
                        <span
                          className={`orders__status orders__status--${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td>{formatOrderTime(order.updatedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
