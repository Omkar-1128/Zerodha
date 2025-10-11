import React from "react";

import { holdings } from "../data/data";

const Holdings = () => {
  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {holdings.map(function (holding , index) {
            const currValue = holding.price * holding.qty;
            const isProfit = currValue - holding.avg * holding.qty >= 0.0;
            const profClass = isProfit? "profit" : "loss";
            const dayClass = holding.isLoss? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{holding.name}</td>
                <td>{holding.qty}</td>
                <td>{holding.avg}</td>
                <td>{holding.price}</td>
                <td>{holding.qty * holding.price}</td>
                <td>{((holding.price - holding.avg) * holding.qty).toFixed(2)}</td>
                <td className={profClass}>{holding.net}</td>
                <td className={dayClass}>{holding.day}</td>
              </tr>
            )
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
