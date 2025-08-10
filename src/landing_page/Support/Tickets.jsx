import React from "react";
import "./style.css";
function Tickets() {
  return (
    <div className="ticketContainer">
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2><b>Support Portal</b></h2>
          </div>
          <div className="col-2">
            <button className="ticketButton">My tickets</button>
          </div>
        </div>
        <div className="row">
          <div className="col-11">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 SearchBar"
                id="searchInput"
                placeholder="Eg: How do I open my account, How do I activate F&O..."
                aria-label="Search tickets"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
