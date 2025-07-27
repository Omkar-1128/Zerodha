import React from "react";
import "./styles.css";

function Footer() {
  return (
    <div>
      <footer className="border-top footer-border">
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                className="footer-image"
                src="/Media/images/logo.svg"
                alt="footer logo"
              />
              <p style={{ fontSize: "12.8px" }}>
                &copy; 2010 - 2025, Zerodha Broking Ltd.
              </p>
              <p style={{ fontSize: "12.8px" }}>All rights reserved.</p>
              <div className="border-bottom">
                <i class="fa-brands fa-x-twitter footer-icon"></i>
                <i class="fa-brands fa-square-facebook footer-icon"></i>
                <i class="fa-brands fa-instagram footer-icon"></i>
                <i class="fa-brands fa-linkedin-in footer-icon"></i>
              </div>
              <div>
                <i class="fa-brands fa-youtube footer-icon"></i>
                <i class="fa-brands fa-whatsapp footer-icon"></i>
                <i class="fa-brands fa-telegram footer-icon"></i>
              </div>
            </div>
            <div className="col">
              <p>Account</p>
              <a href="#">Open demat account</a>
              <br />
              <a href="#">Minor demat account</a>
              <br />
              <a href="#">NRI demat account</a>
              <br />
              <a href="#">Commodity</a>
              <br />
              <a href="#">Dematerialisation</a>
              <br />
              <a href="#">Fund transfer</a>
              <br />
              <a href="#">MTF</a>
              <br />
              <a href="#">Referral program</a>
            </div>
            <div className="col">
              <p>Support</p>
              <a href="#">Contact us</a>
              <br />
              <a href="#">Support portal</a>
              <br />
              <a href="#">How to file a complaint?</a>
              <br />
              <a href="#">Status of your complaints</a>
              <br />
              <a href="#">Bulletinn</a>
              <br />
              <a href="#">Circular</a>
              <br />
              <a href="#">Z-Connect blog</a>
              <br />
              <a href="#">Downloads</a>
            </div>
            <div className="col">
              <p>Company</p>
              <a href="#">About</a>
              <br />
              <a href="#">Philosophy</a>
              <br />
              <a href="#">Press & media</a>
              <br />
              <a href="#">Careers</a>
              <br />
              <a href="#">Zerodha Cares (CSR)</a>
              <br />
              <a href="#">Zerodha.tech</a>
              <br />
              <a href="#">Open source</a>
            </div>
            <div className="col">
              <p>Quick links</p>
              <a href="#">Upcoming IPOs</a>
              <br />
              <a href="#">Brokerage charges</a>
              <br />
              <a href="#">Market holidays</a>
              <br />
              <a href="#">Economic calendar</a>
              <br />
              <a href="#">Calculators</a>
              <br />
              <a href="#">Markets</a>
              <br />
              <a href="#">Sectors</a>
            </div>
          </div>
          <div className="footer-content">
            <p>
              Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI
              Registration no.: INZ000031633 CDSL/NSDL: Depository services
              through Zerodha Broking Ltd. – SEBI Registration no.:
              IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt.
              Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238
              Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
              Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
              Bengaluru - 560078, Karnataka, India. For any complaints
              pertaining to securities broking please write to{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                complaints@zerodha.com
              </a>
              , for DP related to{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                dp@zerodha.com
              </a>
              . Please ensure you carefully read the Risk Disclosure Document as
              prescribed by SEBI | ICF
            </p>
            <p>
              Procedure to file a complaint on{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                SEBI SCORES
              </a>
              : Register on SCORES portal. Mandatory details for filing
              complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail
              ID. Benefits: Effective Communication, Speedy redressal of the
              grievances
            </p>
            <p>
              <a href="#" style={{ textDecoration: "none" }}>
                Smart Online Dispute Resolution | Grievances Redressal Mechanism{" "}
              </a>
            </p>
            <p>
              Investments in securities market are subject to market risks; read
              all the related documents carefully before investing.
            </p>
            <p>
              Attention investors: 1) Stock brokers can accept securities as
              margins from clients only by way of pledge in the depository
              system w.e.f September 01, 2020. 2) Update your e-mail and phone
              number with your stock broker / depository participant and receive
              OTP directly from depository on your e-mail and/or mobile number
              to create pledge. 3) Check your securities / MF / bonds in the
              consolidated account statement issued by NSDL/CDSL every month.
            </p>
            <p>
              India's largest broker based on networth as per NSE.{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                NSE broker factsheet
              </a>
            </p>
            <p>
              "Prevent unauthorised transactions in your account. Update your
              mobile numbers/email IDs with your stock brokers. Receive
              information of your transactions directly from Exchange on your
              mobile/email at the end of the day. Issued in the interest of
              investors. KYC is one time exercise while dealing in securities
              markets - once KYC is done through a SEBI registered intermediary
              (broker, DP, Mutual Fund etc.), you need not undergo the same
              process again when you approach another intermediary." Dear
              Investor, if you are subscribing to an IPO, there is no need to
              issue a cheque. Please write the Bank account number and sign the
              IPO application form to authorize your bank to make payment in
              case of allotment. In case of non allotment the funds will remain
              in your bank account. As a business we don't give stock tips, and
              have not authorized anyone to trade on behalf of others. If you
              find anyone claiming to be part of Zerodha and offering such
              services, please{" "}
              <a href="#" style={{ textDecoration: "none" }}>
                create a ticket here
              </a>
              .
            </p>
          </div>
          <div className="footer-bottom-div">
            <p className="footer-bottom-links"><a href="#" >NSE</a>  </p>
            <p className="footer-bottom-links"><a href="#" >BSE</a></p>
            <p className="footer-bottom-links"><a href="#" >MCX</a> </p>
            <p className="footer-bottom-links"><a href="#" >Terms & conditions</a></p>
            <p className="footer-bottom-links"><a href="#" >Policies & procedures</a></p>
            <p className="footer-bottom-links"><a href="#" >Privacy policy</a></p>
            <p className="footer-bottom-links"><a href="#" >Disclosure</a> </p>
            <p className="footer-bottom-links"><a href="#" >For investor's attention</a> </p>
            <p className="footer-bottom-links"><a href="#" >Investor charter </a></p>
                 
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
