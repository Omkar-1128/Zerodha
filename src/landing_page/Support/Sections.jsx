import React from "react";
import "./style.css";

function Sections({ icon, heading, link1, link2, link3, link4, link5, id }) {
  return (
    <div>
      <div className="col">
        <div class="accordion" id="accordionExample">
          <div
            style={{ border: "1px solid rgb(238, 238, 238)" }}
            class="accordion-item"
          >
            <h2 class="accordion-header " id="headingOne">
              <button
                class="accordion-button collapsed d-flex align-items-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${id}`}
              >
                <div style={{ color: "rgb(13, 110, 253)" }} className="me-3">
                  {icon}
                </div>
                <div className="HeadingSection">{heading}</div>
              </button>
            </h2>
            <div
              id={id}
              class="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                <ul>
                  <li>
                    <a className="anchorList" href="#">
                      {link1}
                    </a>
                  </li>
                  <li>
                    <a className="anchorList" href="#">
                      {link2}
                    </a>
                  </li>
                  <li>
                    <a className="anchorList" href="#">
                      {link3}
                    </a>
                  </li>
                  <li>
                    <a className="anchorList" href="#">
                      {link4}
                    </a>
                  </li>
                  <li>
                    <a className="anchorList" href="#">
                      {link5}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
