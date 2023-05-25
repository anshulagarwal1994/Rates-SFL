import React, { Children, Component } from "react";
import logoImage from "../assets/img/logo-new.svg";
import HeadContact from "../assets/img/mobile_head.svg";
import HeadGetQuote from "../assets/img/get_quote_head.svg";
import HeadUser from "../assets/img/Head_User.svg";
import HeadSearch from "../assets/img/HeadSearch.svg";
import HeadMenu from "../assets/img/HeadMenu.svg";
import EnvelopIcon from "../assets/img/Envelop-icon.svg";
import BoxIcon from "../assets/img/Box-icon.svg";
import ArrorIcon from "../assets/img/arrow-icon.svg";
import FedexLogo from "../assets/img/fedex.svg";
import SFlSaver from "../assets/img/SFl-Saver.svg";
import DHL from "../assets/img/DHL.svg";
import Tooltip from "@material-ui/core/Tooltip";

// const rateurl = "https://phpstack-773983-2649424.cloudwaysapps.com/"; //rates.sflworldwide.com/";
const rateurl = "https://rates.sflworldwide.com/"; //rates.sflworldwide.com/";
// const commonUrl = "https://phpstack-773983-3486562.cloudwaysapps.com/";
// const commonUrl = "http://localhost:3000/";
const commonUrl = "https://rates.sflworldwide.com/";

const productiourl = "https://www.sflworldwide.com/";

const newRateUrl = "https://hubapi.sflworldwide.com/getQuote/getRates";
const bookurl = `https://hub.sflworldwide.com/auth/SalesLeadsRedirect-page/`;

let getRateValue = JSON.parse(localStorage.getItem("gerRates"));
let Baseurl = "";
let salesLeadID = localStorage.getItem("salesLeadID");
console.log("getRateValue = ", getRateValue);

if (getRateValue != null) {
  for (let index = 0; index < getRateValue.length; index++) {
    console.log("Hello");

    Baseurl = window.btoa(
      getRateValue[index].ServiceType +
        "/" +
        getRateValue[index].MainServiceName +
        "/" +
        getRateValue[index].ServiceDisplayName +
        "/" +
        getRateValue[index].Rates.toFixed(2) +
        ""
    );

    let bookNowURL =
      bookurl + Baseurl + `?saleid=` + encodeURIComponent(salesLeadID);

    console.log("BaseUrl = ", bookNowURL);

    getRateValue[index].bookNowURL = bookNowURL;

    console.log("BaseUrl = ", getRateValue[index]);
  }
}

console.log("getRateValue = ", getRateValue);
let LeadDetails = [JSON.parse(localStorage.getItem("LeadDetails"))];
var packageType = "";

if (LeadDetails != null) {
  packageType = LeadDetails.PackageTypeValue;
  // packageType.toUpperCase();
}

console.log("chekratesDatttaavaluedis", getRateValue);
class GetRate extends Component {
  constructor(props) {
    super(props);
  }

  urlclick() {
    debugger;
    window.location = "https://www.sflworldwide.com/";
  }

  GetNewGetRate() {
    window.location = commonUrl;
  }
  render() {
    const { dataaa } = this.props;
    const { AllRatesDetails } = this.props;
    console.log("checkpioropsss", dataaa);
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
                    <a
                      className="headCursor"
                      href="https://rates.sflworldwide.com/"
                    >
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
        <div className="wizard-outer get-rates-outer">
          <div className="container">
            <div className="wizard-top-section">
              {LeadDetails?.map(
                (leadItem) => (
                  console.log("checkdataleadi", leadItem),
                  (
                    <ul>
                      <li className="get-col-1">
                        {/* Hello{leadItem.PackageTypeValue} */}

                        {leadItem.PackageTypeValue === "envelope" ? (
                          <div className="get-envelop">
                            <img src={EnvelopIcon}></img>
                            <label>Envelop</label>
                          </div>
                        ) : null}

                        {leadItem.PackageTypeValue === "box" ? (
                          <div className="get-envelop">
                            <img src={BoxIcon}></img>
                            <label>Box</label>
                            <p>Chargable: {leadItem.Weight} LBS</p>
                          </div>
                        ) : null}
                      </li>
                      <li className="get-col-2 location-outer">
                        <div className="get-location fst">
                          {/* <Tooltip title={leadItem.PhoneNumber}>
                              <label>{leadItem.PhoneNumber}</label>
                            </Tooltip> */}

                          <Tooltip title={leadItem.FromCountryValue?.label}>
                            <label>{leadItem.FromCountryValue?.label}</label>
                          </Tooltip>
                          {/* <p>Zip Code: {leadItem.FromZipCode}</p> */}
                          {leadItem.FromZipCode == "" ? (
                            <Tooltip title={leadItem.FromCity}>
                              <p>City: {leadItem.FromCity}</p>
                            </Tooltip>
                          ) : (
                            <Tooltip title={leadItem.FromZipCode}>
                              <p>Zip Code: {leadItem.FromZipCode}</p>
                            </Tooltip>
                          )}
                        </div>
                        <span className="arrow-icon">
                          <img src={ArrorIcon}></img>
                        </span>
                        <div className="get-location lst">
                          <Tooltip title={leadItem.ToCountryValue?.label}>
                            <label>{leadItem.ToCountryValue?.label}</label>
                          </Tooltip>
                          {leadItem.ToZipCode == "" ? (
                            <Tooltip title={leadItem.ToCity}>
                              <p>City: {leadItem.ToCity}</p>
                            </Tooltip>
                          ) : (
                            <Tooltip title={leadItem.ToZipCode}>
                              <p>Zip Code: {leadItem.ToZipCode}</p>
                            </Tooltip>
                          )}
                        </div>
                      </li>
                      <li className="get-col-3 contact-outer desktop">
                        <ul>
                          {/* <li>
                            <span>Name</span>
                            <Tooltip>
                              <label>{leadItem.ContactName}</label>
                            </Tooltip>
                          </li> */}
                          <li>
                            <span>Name</span>
                            <Tooltip title={leadItem.ContactName}>
                              <label>{leadItem.ContactName}</label>
                            </Tooltip>
                          </li>
                          <li>
                            {/* <span>Email</span>
                            <label>{leadItem.Email}</label> */}
                            <span>Email</span>
                            <Tooltip title={leadItem.Email}>
                              <label>{leadItem.Email}</label>
                            </Tooltip>
                          </li>
                          <li>
                            <span>Phone Number</span>
                            <label>{leadItem.PhoneNumber}</label>
                          </li>
                        </ul>
                      </li>
                      <li className="get-col-3 contact-outer mobile">
                        <ul>
                          <li>
                            <span>Name</span>
                            <Tooltip title={leadItem.ContactName}>
                              <label>{leadItem.ContactName}</label>
                            </Tooltip>
                          </li>
                          <li>
                            <span>Phone Number</span>
                            <label>{leadItem.PhoneNumber}</label>
                          </li>
                          <li>
                            {/* <span>Email</span>
                            <label>{leadItem.Email}</label> */}
                            <span>Email</span>
                            <Tooltip title={leadItem.Email}>
                              <label>{leadItem.Email}</label>
                            </Tooltip>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )
                )
              )}
            </div>
            {/* <div className="filter-outer">
              <ul className="desktop">
                <li>
                  <label>Sort By:</label>
                </li>
                <li>
                  <a href="#">Chippest First</a>
                </li>
                <li>
                  <a href="#">Highest Rating first</a>
                </li>
                <li className="active">
                  <a href="#">Fastest first</a>
                </li>
                <li className="drop-down">
                  <label>Filter Your Quote Result</label>
                </li>
              </ul>
              <ul className="mobile">
                <li>
                  <a href="#">Filter By</a>
                </li>
                <li>
                  <a href="#">Sort By:</a>
                </li>
              </ul>
            </div> */}
            <div className="rates-listing-outer">
              {getRateValue?.map((ratesItem) => (
                <ul>
                  <li>
                    <ul>
                      <li className="img">
                        <img src={ratesItem.urlIMG}></img>
                      </li>
                      <li className="heading">
                        <h2> {ratesItem.ServiceDisplayName}</h2>
                      </li>
                      <li className="delivery-date">
                        <label>Estimated Delivery</label>
                        <span className="date-time">
                          {ratesItem.Delivery_Date}
                        </span>
                      </li>

                      {ratesItem.Discounts && ratesItem.BaseP > ratesItem.Rates ? (
                        <li className="price saver-price">
                          <ul>
                            <li className="retail-outer">
                              <span
                                className="retail-price"
                                style={{ textDecoration: "line-through" }}
                              >
                                Retail: ${ratesItem.BaseP}
                              </span>
                              <span className="save-price">
                                Save {ratesItem.Discounts}
                              </span>
                            </li>
                            <li className="ac-price">
                              ${ratesItem.Rates.toFixed(2)}
                            </li>
                          </ul>
                        </li>
                      ) : (
                        <li className="price">
                          <label>Price</label>
                          <span className="date-time">
                            $ {ratesItem.Rates.toFixed(2)}
                          </span>
                        </li>
                      )}

                      <li className="booking-btn">
                        <a href={ratesItem.bookNowURL}>Book Now</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              ))}
            </div>
            <div className="container">
              <div className="get-rates-btn-outer">
                <a
                  href={productiourl}
                  // onClick={this.GetNewGetRate}
                >
                  Back to Home
                </a>
                <a className="get-new-quote" onClick={this.GetNewGetRate}>
                  Get a New Quote
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <div className="get-rates-btn-outer">
            <a
              href={productiourl}
              // onClick={this.GetNewGetRate}
            >
              Back to Home
            </a>
            <a className="get-new-quote" onClick={this.GetNewGetRate}>
              Get a New Quote
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default GetRate;
