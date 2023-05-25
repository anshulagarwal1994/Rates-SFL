import React, { Children, Component } from "react";
import logoImage from "../assets/img/logo-new.svg";
import backIcon from "../assets/img/back-icon.svg";
import tickIcon from "../assets/img/get-quote/success.svg";
// const rateurl = "https://phpstack-773983-2649424.cloudwaysapps.com/"; //rates.sflworldwide.com/";
const rateurl = "https://rates.sflworldwide.com/"; //rates.sflworldwide.com/";

const productiourl = "https://www.sflworldwide.com/";
class GetQuoteThankyou extends Component {
  constructor(props) {
    super(props);
  }

  urlclick() {
    debugger;
    window.location = "https://www.sflworldwide.com/";
  }
  render() {
    return (
      <div className="get-quote-wrap">
        <div className="quote-header">
          <div className="container">
            <div className="header-inner">
              <div className="logo">
                <a href={productiourl}>
                  <img src={logoImage} alt="SFL Worldwide" />
                </a>
              </div>
              <div className="header-right">
                <a onClick={() => this.urlclick()}>
                  <img src={backIcon} alt="Back" />
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="get-quote-success-outer">
          <div className="container">
            <div className="quote-success">
              <img src={tickIcon} alt="Success" />
              <h3>WONDERFUL! THANK YOU FOR SUBMITTING YOUR REQUEST.</h3>
              <p>
                One of our representatives will call you or email you shortly
                with pricing you will love!
              </p>
            </div>
          </div>
        </div>
        <div className="quote-footer">
          <div className="container">
            <div className="quote-footer-inner quote-completed">
              <a className="next-btn" href={rateurl}>
                Get a New Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetQuoteThankyou;
