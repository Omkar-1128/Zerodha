import React from "react";

function Quicklinks() {
  return (
    <div>
        <div className="QuickLinks">
            <ul>
                <li><a style={{color:"#397DD0"}} href="#">Exclusion of F&O contracts on 8 securities from August 29, 2025</a></li>
                <li><a style={{color:"#397DD0"}} href="#">Revision in expiry day of Index and Stock derivatives contracts</a></li>
            </ul>
        </div>
      <div className="table-responsive d-flex justify-content-center">
        <table className="table equal-columns AccountCharges">
          <thead>
            <tr>
              <th>Quick links</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  style={{ textDecoration: "none", color: "#397DD0" }}
                  onMouseEnter={(e) => (e.target.style.color = "#424242")}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#397DD0"; // original color
                  }}
                  href="#"
                >
                  1. Track account opening
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  style={{ textDecoration: "none", color: "#397DD0" }}
                  onMouseEnter={(e) => (e.target.style.color = "#424242")}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#397DD0"; // original color
                  }}
                  href="#"
                >
                  2. Track segment activation
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  style={{ textDecoration: "none", color: "#397DD0" }}
                  onMouseEnter={(e) => (e.target.style.color = "#424242")}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#397DD0"; // original color
                  }}
                  href="#"
                >
                  3. Intraday margins
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  style={{ textDecoration: "none", color: "#397DD0" }}
                  onMouseEnter={(e) => (e.target.style.color = "#424242")}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#397DD0"; // original color
                  }}
                  href="#"
                >
                  4. Kite user manual
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Quicklinks;
