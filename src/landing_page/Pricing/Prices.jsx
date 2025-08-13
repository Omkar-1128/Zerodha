import React from "react";
import './Style.css'

function Pricing() {
  return (
    <div>
      <div className="container">
        <div className="row text-center PricesContainer justify-content-evenly">
          <div className="col-3">
            <img
              style={{ width: "80%" }}
              src="Media\images\pricing0.svg"
              alt="pricing image"
            />
            <h4 className="mb-4 mt-4">Free equity delivery</h4>
            <p className="PriceContent text-muted">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
          </div>
          <div className="col-3">
            <img
              style={{ width: "80%" }}
              src="Media\images\pricing20.svg"
              alt="pricing image"
            />
            <h4 className="mb-4 mt-4">Intraday and F&O trades</h4>
            <p className="PriceContent text-muted">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
          </div>
          <div className="col-3">
            <img
              style={{ width: "80%" }}
              src="Media\images\pricing0.svg"
              alt="pricing image"
            /> 
            <h4 className="mb-4 mt-4">Free direct MF</h4>
            <p className="PriceContent text-muted">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
