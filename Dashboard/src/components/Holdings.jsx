import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";

// import { holdings } from "../data/data";

const Holdings = () => {
  let [allHoldings , setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/getHoldings").then((res) => {
      setAllHoldings(res.data)
    })
    .catch(err => {
      console.error("Axios error:", err?.code, err?.message);
      console.error("Full error:", err?.toJSON?.() || err);
    });
  } , [])


  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
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
          </thead>
          {allHoldings.map(function (holding, index) {
            const currValue = holding.price * holding.qty;
            const isProfit = currValue - holding.avg * holding.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = holding.isLoss ? "loss" : "profit";

            return (
              <tbody key={index}>
                <tr>
                  <td>{holding.name}</td>
                  <td>{holding.qty}</td>
                  <td>{holding.avg}</td>
                  <td>{holding.price}</td>
                  <td>{holding.qty * holding.price}</td>
                  <td>
                    {((holding.price - holding.avg) * holding.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{holding.net}</td>
                  <td className={dayClass}>{holding.day}</td>
                </tr>
              </tbody>
            );
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
