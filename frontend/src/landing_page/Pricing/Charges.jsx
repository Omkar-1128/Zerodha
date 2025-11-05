import React from "react";

function Charges() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <h4 className="ms-4 mb-4 ChargesHeading">Charges for account opening</h4>
          <div className="table-responsive d-flex justify-content-center">
            <table className="table equal-columns AccountCharges table-borderless">
              <thead>
                <tr style={{ borderBottom: "1px solid rgb(221, 221, 221)" }}>
                  <th>Type of account</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Online account</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "3px 7px",
                        borderRadius: "0.2rem",
                      }}
                    >
                      FREE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Offline account</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "3px 7px",
                        borderRadius: "0.2rem",
                      }}
                    >
                      FREE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>NRI account (offline only)</td>
                  <td>₹ 500</td>
                </tr>
                <tr>
                  <td>
                    Partnership, LLP, HUF, or Corporate accounts (offline only)
                  </td>
                  <td>₹ 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <h4 className="ms-4 mb-4 DematTable ChargesHeading">
            Demat AMC (Annual Maintenance Charge)
          </h4>
          <div className="table-responsive d-flex justify-content-center">
            <table className="table equal-columns AccountCharges table-borderless">
              <caption>
                <span>
                  * Lower AMC is aspanplicable only if the account qualifies as
                  a Basic Services Demat Account (BSDA). BSDA account holders
                  cannot hold more than one demat account. To learn more about
                  BSDA,{" "}
                </span>
                <p>
                  <a
                    style={{ textDecoration: "none", color: "#387ed1" }}
                    href="#"
                  >
                    click here.
                  </a>
                </p>
              </caption>
              <thead>
                <tr style={{ borderBottom: "1px solid rgb(221, 221, 221)" }}>
                  <th>Value of holdings</th>
                  <th>AMC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Up to ₹4 lakh</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "3px 7px",
                        borderRadius: "0.2rem",
                      }}
                    >
                      FREE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>₹4 lakh - ₹10 lakh</td>
                  <td>₹ 100 per year, charged quarterly*</td>
                </tr>
                <tr>
                  <td>Above ₹10 lakh</td>
                  <td>₹ 300 per year, charged quartlerly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <h4 className="ms-4 mb-4 ChargesHeading">Charges for account opening</h4>
          <div className="table-responsive d-flex justify-content-center">
            <table className="table equal-columns AccountCharges table-borderless">
              <thead>
                <tr style={{ borderBottom: "1px solid rgb(221, 221, 221)" }}>
                  <th>Service</th>
                  <th>Billing Frquency</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tickertape</td>
                  <td>Monthly / Annual</td>
                  <td>Free: 0 | Pro: 249/2399</td>
                </tr>
                <tr>
                  <td>Smallcase</td>
                  <td>Per transaction</td>
                  <td>Buy & Invest More: 100 | SIP: 10</td>
                </tr>
                <tr>
                  <td>Kite Connect</td>
                  <td>Monthly</td>
                  <td>Connect: 500 | Historical: 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="container p-4">
          <div>
            <h5 className="text-muted mt-4 mb-4">Disclaimer</h5>
            <p style={{ fontSize: "12px" }}>
              For Delivery based trades, a minimum of ₹0.01 will be charged per
              contract note. Clients who opt to receive physical contract notes
              will be charged ₹20 per contract note plus courier charges.
              Brokerage will not exceed the rates specified by SEBI and the
              exchanges. All statutory and regulatory charges will be levied at
              actuals. Brokerage is also charged on expired, exercised, and
              assigned options contracts. Free investments are available only
              for our retail individual clients. Companies, Partnerships,
              Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as
              delivery brokerage. A brokerage of 0.25% of the contract value
              will be charged for contracts where physical delivery happens. For
              netted off positions in physically settled contracts, a brokerage
              of 0.1% will be charged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charges;
