import React from "react";

function Leftsection({
  heading,
  description,
  image,
  tryDemo,
  learnMore,
  playStore,
  appStore,
}) {
  return (
    <div>
      <div className="container LeftSection">
        <div className="row d-flex align-items-center justify-content-evenly">
          <div className="col-5 productImage">
            <a href="#">
              <img src={image} alt="Kite image" />
            </a>
          </div>
          <div className="col-4 LeftSectionContent">
            <h3>{heading}</h3>
            <p>{description}</p>
            <span>
              <a
                style={{ textDecoration: "none", color: "#387ed1" }}
                href={tryDemo}
              >
                Try demo <i class="fa-solid fa-arrow-right"></i>
              </a>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <a
                style={{ textDecoration: "none", color: "#387ed1" }}
                href={learnMore}
              >
                Learn more <i class="fa-solid fa-arrow-right"></i>
              </a>
            </span>
            <br />
            <span>
              <a href={playStore} target="_blank">
                <img
                  className="mt-4 me-3"
                  src="\Media\images\googlePlayBadge.svg"
                  alt="playStore"
                />
              </a>
              <a href={appStore} target="_blank">
                <img
                  className="mt-4"
                  src="\Media\images\appstoreBadge.svg"
                  alt="appStore"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftsection;
