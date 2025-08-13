import React from "react";

function Universe() {
  return (
    <div>
      <div className="container text-center mt-5 p-4 text-muted">
        <h5>
          Want to know more about our technology stack? Check out the{" "}
          <a style={{ textDecoration: "none", color: "#387ed1" }} href="#">
            Zerodha.tech
          </a>{" "}
          blog.
        </h5>
      </div>
      <div className="container">
        <div className="container universeHero text-center">
          <h3>The Zerodha Universe</h3>
          <p>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>

        <div className="row justify-content-center p-5 text-center align-items-center text-muted">
          <div className="col-3">
            <img
              style={{ height: "55px" }}
              className="mb-3"
              src="Media\images\zerodhaFundhouse.png"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Our asset management venture that is creating simple and
              transparent index funds to help you save for your goals.
            </p>
          </div>
          <div className="col-3">
            <img
              style={{ width: "80%", height: "55px" }}
              className="mb-3"
              src="Media\images\sensibullLogo.svg"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Options trading platform that lets you create strategies, analyze
              positions, and examine data points like open interest, FII/DII,
              and more.
            </p>
          </div>
          <div className="col-3">
            <img
              style={{ height: "55px" }}
              className="mb-3"
              src="Media\images\tijori.svg"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Investment research platform that offers detailed insights on
              stocks, sectors, supply chains, and more.
            </p>
          </div>
        </div>

        <div className="row justify-content-center p-5 text-center align-items-center text-muted">
          <div className="col-3">
            <img
              style={{ height: "55px" }}
              className="mb-3"
              src="Media\images\streakLogo.png"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Systematic trading platform that allows you to create and backtest
              strategies without coding.
            </p>
          </div>
          <div className="col-3">
            <img
              style={{ height: "55px" }}
              className="mb-3"
              src="Media\images\smallcaseLogo.png"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs.
            </p>
          </div>
          <div className="col-3">
            <img
              style={{ height: "55px" }}
              className="mb-3"
              src="Media\images\dittoLogo.png"
              alt="universe images"
            />
            <p className="universeContent text-center">
              Personalized advice on life and health insurance. No spam and no
              mis-selling.
            </p>
          </div>
        </div>
        <div className="text-center">
          <button className="mt-3 btn btn-primary accountButton">
            <b>Sign up for free</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;
