import React from "react";

function Benefits() {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 Benefits-image-h mb-4 mb-lg-0">
            <div>
              <img
                className="Benefits-image"
                src="/Media/images/acop-benefits(investment).svg"
                alt="Benefits-image"
              />
            </div>
            <h4>Benefits of opening a Zerodha demat account</h4>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <div className="Benefits-h-p">
              <h5>Unbeatable pricing</h5>
              <p>
                Zero charges for equity & mutual fund investments. Flat ₹20 fees
                for intraday and F&O trades.
              </p>
            </div>
            <div className="Benefits-h-p">
              <h5>Best investing experience</h5>
              <p>
                Simple and intuitive trading platform with an easy-to-understand
                user interface.
              </p>
            </div>
            <div className="Benefits-h-p">
              <h5>No spam or gimmicks</h5>
              <p>
                Committed to transparency — no gimmicks, spam, "gamification",
                or intrusive push notifications.
              </p>
            </div>
            <div className="Benefits-h-p">
              <h5>The Zerodha universe</h5>
              <p>
                More than just an app — gain free access to the entire ecosystem
                of our partner products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
