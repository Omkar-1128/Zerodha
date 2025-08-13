import React from "react";

function Rightsection({ heading, description, image, learnMore }) {
  return (
    <div>
      <div className="container LeftSection">
        <div className="row d-flex align-items-center justify-content-evenly">
          <div className="col-4 LeftSectionContent">
            <h3>{heading}</h3>
            <p>{description}</p>
            <span>
              <a style={{ textDecoration: "none", color: "#387ed1" }} href="#">
                {learnMore} <i class="fa-solid fa-arrow-right"></i>
              </a>
            </span>
          </div>

          <div className="col-5 productImage">
            <a href="#">
              <img src={image} alt="Kite image" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightsection;
