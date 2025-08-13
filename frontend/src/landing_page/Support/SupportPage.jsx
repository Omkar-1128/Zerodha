import React from "react";
import Tickets from "./Tickets";
import Sections from "./Sections";
import Quicklinks from "./Quicklinks";

function SupportPage() {
  return (
    <>
      <div>
        <Tickets />
        <div className="container">
          <div className="row">
            <div className="col-8">
          <Sections
            heading={"Account Opening"}
            icon={<i className="fa-solid fa-circle-plus"></i>}
            id={"one"}
            link1={"Resident individual"}
            link2={"Minor"}
            link3={"Non Resident Indian (NRI)"}
            link4={"Company, Partnership, HUF and LLP"}
            link5={"Glossary"}
          />
          <Sections
            heading={"Your Zerodha Account"}
            icon={<i className="fa-regular fa-circle-user"></i>}
            id={"two"}
            link1={"Your Profile"}
            link2={"Account modification"}
            link3={"Client Master Report (CMR) and Depository Participant (DP)"}
            link4={"Nomination"}
            link5={"Transfer and conversion of securities"}
          />
          <Sections
            heading={"Kite"}
            icon={<i className="fa-solid fa-circle-chevron-up"></i>}
            id={"three"}
            link1={"IPO"}
            link2={"Trading FAQs"}
            link3={"Margin Trading Facility (MTF) and Margins"}
            link4={"Charts and orders"}
            link5={"Alerts and Nudges"}
          />
          <Sections
            heading={"Funds"}
            icon={<i className="fa-solid fa-indian-rupee-sign"></i>}
            id={"four"}
            link1={"Add money"}
            link2={"Withdraw money"}
            link3={"Add bank accounts"}
            link4={"eMandates"}
            link5={"General"}
          />
          <Sections
            heading={"Console"}
            icon={<i className="fa-solid fa-circle-half-stroke"></i>}
            id={"five"}
            link1={"Portfolio"}
            link2={"Corporate actions"}
            link3={"Funds statement"}
            link4={"Reports"}
            link5={"Profile"}
          />
          <Sections
            heading={"Coin"}
            icon={<i className="fa-solid fa-coins"></i>}
            id={"six"}
            link1={"Mutual funds"}
            link2={"National Pension Scheme (NPS)"}
            link3={"Fixed Deposit (FD)"}
            link4={"Features on Coin"}
            link5={"Payments and Orders"}
          />
          </div>
          <div className="col-4">
            <Quicklinks />
          </div>
        </div>
        </div>
      </div>
      
    </>
  );
}

export default SupportPage;
