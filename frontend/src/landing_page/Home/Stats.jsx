import React from "react";
import "./Home.css";

function Stats() {
  return (
    <div>
      <div className="container StatsContainer">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 StatsText">
            <h3>Trust with confidence</h3>
            <div className="StatsContent">
              <h4>Customer-first always</h4>
              <p>
                That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh
                crores of equity investments, making us India's largest broker;
                contributing to 15% of daily retail exchange volumes in India.
              </p>
            </div>
            <div>
              <h4>No spam or gimmicks</h4>
              <p>
                No gimmicks, spam, "gamification", or annoying push
                notifications. High quality apps that you use at your pace, the
                way you like.{" "}
                <a className="StatsContentLinks" href="#">
                  Our philosophies.
                </a>
              </p>
            </div>
            <div>
              <h4>The Zerodha universe</h4>
              <p>
                Not just an app, but a whole ecosystem. Our investments in 30+
                fintech startups offer you tailored services specific to your
                needs.
              </p>
            </div>
            <div>
              <h4>Customer-first always</h4>
              <p>
                With initiatives like{" "}
                <a className="StatsContentLinks" href="#">
                  Nudge
                </a>{" "}
                and{" "}
                <a className="StatsContentLinks" href="">
                  Kill Switch
                </a>
                , we don't just facilitate transactions, but actively help you
                do better with your money.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 justify-content-center">
            <a href="#">
              <img
                className="EcosystemImage"
                src="/Media/images/ecosystem.png"
                alt="ecosystem image"
              />
            </a>
            <div className="row">
              <span className="EcosystemLinks">
                <a href="#">
                  Explore our products <i class="fa-solid fa-arrow-right"></i>
                </a>
                <a href="#">
                  Try Kite demo <i class="fa-solid fa-arrow-right"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
