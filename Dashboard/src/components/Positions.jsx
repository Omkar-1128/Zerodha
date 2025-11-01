import React from "react";
// import { positions } from "../data/data";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Positions = () => {
  let [allPositions , setAllPositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/getPositions").then((res) => {
      setAllPositions(res.data);
    })
  } , [])

  return (
    <>
      <h3 className="title">Positions (2)</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          {allPositions.map(function (position, idx) {
            const currValue = position.price * position.qty;
            const isProfit = currValue - position.avg * position.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = position.isLoss ? "loss" : "profit";
            return (
              <tbody key={idx}>
                <tr>
                  <td>{position.product}</td>
                  <td>{position.name}</td>
                  <td>{position.qty}</td>
                  <td>{position.avg}</td>
                  <td>{position.price}</td>
                  <td className={profClass}>
                    {((position.price - position.avg) * position.qty).toFixed(
                      2
                    )}
                  </td>
                  <td className={dayClass}>{position.day}</td>
                  <td></td>
                </tr>
              </tbody>
            );
          })}

          {/* {
        product: "CNC",
        name: "JUBLFOOD",
        qty: 1,
        avg: 3124.75,
        price: 3082.65,
        net: "+10.04%",
        day: "-1.35%",
        isLoss: true,
      } */}
        </table>
      </div>
    </>
  );
};

export default Positions;
