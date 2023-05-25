import React, { Children, Component } from "react";
import logoImage from "../assets/img/logo-new.svg";
import HeadContact from "../assets/img/mobile_head.svg";
import HeadGetQuote from "../assets/img/get_quote_head.svg";
import HeadUser from "../assets/img/Head_User.svg";
import HeadSearch from "../assets/img/HeadSearch.svg";
import HeadMenu from "../assets/img/HeadMenu.svg";
import SuccessCheck from "../assets/img/suss-check.svg";

// const commonUrl = "http://localhost:3000/";
const commonUrl = "https://rates.sflworldwide.com/";

// const rateurl = "https://phpstack-773983-2649424.cloudwaysapps.com/"; //rates.sflworldwide.com/";
const rateurl = "https://rates.sflworldwide.com/"; //rates.sflworldwide.com/";

const productiourl = "https://www.sflworldwide.com/";
class SuccessPage extends Component {
  constructor(props) {
    super(props);
  }

  urlclick() {
    debugger;
    window.location = "https://www.sflworldwide.com/";
  }
  GetNewGetRate() {
    window.location = commonUrl ;
  }
  render() {
    return (
      <div className="get-quote-wrap success-outer">
        <div className="quote-header">
          <div className="container">
            <div className="header-inner">
              <div className="logo">
                <a href={productiourl}>
                  <img src={logoImage} alt="SFL Worldwide" />
                </a>
              </div>
              <div className="header-main-menu">
                <ul>
                  <li>
                    <a href="https://www.sflworldwide.com/track-shipment/">
                      Tracking
                    </a>
                  </li>
                  <li>
                    <a href="https://hub.sflworldwide.com/">Book Shipment</a>
                  </li>
                  <li>
                    <a href="https://www.sflworldwide.com/contact-us">
                      Contact Us
                    </a>
                  </li>
                  <li className="head-contact-no">
                    <a href="#">
                      <img src={HeadContact}></img>
                      <label>1-800-691-2335</label>
                    </a>
                  </li>
                  <li className="head-get-quote">
                    <a className="headCursor" href="https://rates.sflworldwide.com/">
                      <img className="headCursor" src={HeadGetQuote}></img>
                      <label className="headCursor">Get Quote</label>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-right">
                <ul>
                  <li>
                    <a href="#">
                      <img src={HeadUser}></img>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={HeadSearch}></img>
                    </a>
                  </li>
                  <li className="head-menu-outer">
                    <a href="#">
                      <img src={HeadMenu}></img>
                    </a>
                  </li>
                </ul>
                {/* <a onClick={() => this.urlclick()}>
                  <img src={backIcon} alt="Back" />
                  Back to Home
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="success-wrap">
          <div className="success-wrap-inner">
            <span>
              <img src={SuccessCheck}></img>
            </span>
            <h2>Wonderful! Thank You for Submitting Your Request.</h2>
            <p>
              One of our representatives will call you or email you shortly with
              pricing you will love!
            </p>
            <a href={productiourl}>Back to Home</a>
            <a className="get-new-quote" onClick={this.GetNewGetRate}>
              Get a New Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPage;
