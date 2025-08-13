import React from "react";

function Explore() {
  return (
    <div>
      <div className="container">
        <h3 className="text-center Explore-heading">
          Explore different account types
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-3">
            <div className="ExploreCards">
              <h4>Individual Account</h4>
              <p>Invest in equity, mutual funds and derivatives</p>
            </div>
            <div className="ExploreCards">
              <h4>Individual Account</h4>
              <p>Invest in equity, mutual funds and derivatives</p>
            </div>
          </div>
          <div className="col-3">
            <div className="ExploreCards">
              <h4>Individual Account</h4>
              <p>Invest in equity, mutual funds and derivatives</p>
            </div>
            <div style={{ marginBottom: "100px" }} className="ExploreCards">
              <h4>Individual Account</h4>
              <p>Invest in equity, mutual funds and derivatives</p>
            </div>
          </div>
          <div className="col-3">
            <div className="ExploreCards">
              <h4>Individual Account</h4>
              <p>Invest in equity, mutual funds and derivatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
