import React from "react";

function Investment() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <h3 className="Investment-Heading">
            Investment options with Zerodha demat account
          </h3>
        </div>
        <div className="row justify-content-evenly">
          <div className="col-12 col-md-6 col-lg-5 mb-4 mb-lg-0">
            <div className="row align-items-center justify-content-center justify-content-md-end mb-4 mb-md-0">
              <div className="col-auto col-md-3 text-center text-md-end">
                <img
                  className="investment-icon"
                  src="/Media/images/stocks-acop(investment).svg"
                  alt="stocks-acop(investment)"
                />
              </div>
              <div className="col-12 col-md-6 investment-info text-center text-md-start">
                <h4>Stocks</h4>
                <p>Invest in all exchange-listed securities</p>
              </div>
            </div>
            <div className="row align-items-center justify-content-center justify-content-md-end mt-4 mt-md-5">
              <div className="col-auto col-md-3 text-center text-md-end">
                <img
                  className="investment-icon"
                  src="/Media/images/ipo-acop(investment).svg"
                  alt="IPO-acop(investment)"
                />
              </div>
              <div className="col-12 col-md-6 investment-info text-center text-md-start">
                <h4>IPO</h4>
                <p>Apply to the latest IPOs instantly via UPI</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="row align-items-center justify-content-center justify-content-md-start mb-4 mb-md-0">
              <div className="col-auto col-md-3 text-center text-md-start">
                <img
                  className="investment-icon"
                  src="/Media/images/mf-acop(investment).svg"
                  alt="MF-acop(investment)"
                />
              </div>
              <div className="col-12 col-md-6 investment-info text-center text-md-start">
                <h4>Mutual funds</h4>
                <p>Invest in commission-free direct mutual funds</p>
              </div>
            </div>
            <div className="row align-items-center justify-content-center justify-content-md-start mt-4 mt-md-5">
              <div className="col-auto col-md-3 text-center text-md-start">
                <img
                  className="investment-icon"
                  src="/Media/images/fo-acop(investment).svg"
                  alt="FO-acop(investment)"
                />
              </div>
              <div className="col-12 col-md-6 investment-info text-center text-md-start">
                <h4>Futures & options</h4>
                <p>
                  Hedge and mitigate market risk through simplified F&O trading
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button className="exploreButton">Explore Investments</button>
        </div>
      </div>
    </div>
  );
}

export default Investment;
