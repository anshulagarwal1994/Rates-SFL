import React from "react";
import PropTypes from "prop-types";
// core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import { CommonConfig } from "../../utils/constant";

import api from "../../utils/apiClient";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import SimpleBackdrop from "../../utils/general";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class esign_employee_temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Invoicedata: [],
      InvoicePaydata: [],
      FromAddress: {},
      ToAddress: {},
      TrackingNumber: "",
      ShipmentType: "",
      FromCountryName: "",
      ToCountryName: "",
      BookingDate: "",
      TotalCost: 0,
      InvoiceDate: "",
      InvoiceDueDate: "",
      TotalReceivedCost: 0,
      DatePaidOn: "",
      ShippingID: "",
      Service: "",
      Mode: "",
      TotalInvoiceAmount: 0,
      totalCFT: 0,
      insurancevalue: "Not Applicable",
      Loading: false,
      InsuranceList: [
        { value: "Not Applicable", label: "Not Applicable" },
        { value: "Mover’s Liability", label: "Mover’s Liability" },
        { value: "All Risk Policy 1", label: "All Risk Policy 1" },
        { value: "All Risk Policy 2", label: "All Risk Policy 2" },
      ],
      In_ExSelectList: [
        { value: "Inclusions", label: "Inclusions" },
        { value: "Exclusions", label: "Exclusions" },
        { value: "Not Applicable", label: "Not Applicable" },
      ],
      In_ExList: [
        //-----------7----------Inclusions----------------------------------------------//
        {
          value:
            "Door pickup & Transportation to CFS, Palletization if required; Ocean Freight, Door Delivery & Unloading up to 2nd and above with elevator access.",
          label:
            "Door pickup & Transportation to CFS, Palletization if required; Ocean Freight, Door Delivery & Unloading up to 2nd and above with elevator access.",
        },
        {
          value: "Storage at origin or destination for up to 1 month.",
          label: "Storage at origin or destination for up to 1 month.",
        },
        {
          value: "Basic export custom clearance at origin.",
          label: "Basic export custom clearance at origin.",
        },
        {
          value: "Movers Liability Coverage.",
          label: "Movers Liability Coverage.",
        },
        {
          value: "Preparation of overseas shipping documentations.",
          label: "Preparation of overseas shipping documentations.",
        },
        {
          value: "Indian customs filling and documentations.",
          label: "Indian customs filling and documentations.",
        },
        {
          value:
            "De-stuffing, opening and repacking during customs inspections, single strapping on each box after customs examinations and loading, concur charges.",
          label:
            "De-stuffing, opening and repacking during customs inspections, single strapping on each box after customs examinations and loading, concur charges.",
        },
        //------------8---------Exclusions----------------------------------------------//
        {
          value:
            "Overweight/Oversize charges. Abnormal access, Parking Permits, Stair carry, long carry, Split pickup/Delivery charges.",
          label:
            "Overweight/Oversize charges. Abnormal access, Parking Permits, Stair carry, long carry, Split pickup/Delivery charges.",
        },
        {
          value: "Port Charges, Union Charges and D.O. Charges at Destination.",
          label: "Port Charges, Union Charges and D.O. Charges at Destination.",
        },
        {
          value: "Custom Duties, Taxes and Octroi Charges at Destination.",
          label: "Custom Duties, Taxes and Octroi Charges at Destination.",
        },
        {
          value: "Demurrage and Detention charges.",
          label: "Demurrage and Detention charges.",
        },
        {
          value: "Standard Unpacking & Removal of Packing debris.",
          label: "Standard Unpacking & Removal of Packing debris.",
        },
        {
          value:
            "Crating Charges. Handling of heavy weight and odd items like Piano, Pool table, Safe etc.",
          label:
            "Crating Charges. Handling of heavy weight and odd items like Piano, Pool table, Safe etc.",
        },
        {
          value: "Packing (Labor & Material) Charges.",
          label: "Packing (Labor & Material) Charges.",
        },
        {
          value: "AES Filling Charge of USD 75 for Shipment over USD 2500.",
          label: "AES Filling Charge of USD 75 for Shipment over USD 2500.",
        },
      ],
      In_ExValue: [
        "Inclusions",
        "Inclusions",
        "Inclusions",
        "Inclusions",
        "Inclusions",
        "Inclusions",
        "Inclusions",

        "Exclusions",
        "Exclusions",
        "Exclusions",
        "Exclusions",
        "Exclusions",
        "Exclusions",
        "Exclusions",
        "Exclusions",
      ],
      isSubmitClick: false,
      InsuranceType: "",
      ContainerType: "",
      MovingBackToIndia: false,
      NameAsPerPassport: "",
      YearsOutsideIndia: "",
      StayInIndia: "",
      LatestArrivalDate: "",
      AppliedForTR: "",
      AbleToProvidePassport: "",
      VisaValidDate: "",
      ArrivalCategory: "",
      NAText: "Not Applicable",
      InsuranceWaiver: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmitClick) {
      this.handlesave();
    }
  }

  async componentDidMount() {
    let totalCost = 0;
    for (var i = 0; i < this.props.InvoiceData.length; i++) {
      totalCost = this.props.InvoiceData[i].TotalAmount + totalCost;
    }
    let totalCFT = 0;
    for (var i = 0; i < this.props.shipmentstatusList.PackageList.length; i++) {
      totalCFT = this.props.shipmentstatusList.PackageList[i].CFT + totalCFT;
    }
    this.setState({
      propData: this.props,
      FromAddress: this.props.FromAddress.AddressDetail,
      InsuranceType: this.props.InsuranceType,
      ShipmentType: this.props.FromAddress.AddressDetail.ShipmentType,
      FromCountryName: this.props.FromAddress.CountryName,
      DocumentManagedBy: this.props.DocumentManagedBy,
      BookingDate: this.props.FromAddress.AddressDetail.ShipmentDate,
      ToAddress: this.props.ToAddress.AddressDetail,
      ToCountryName: this.props.ToAddress.CountryName,
      TrackingNumber: this.props.TrackingNumber,
      ContainerType: this.props.ContainerType,
      TotalReceivedCost: this.props.TotalReceivedCost,
      DatePaidOn: this.props.DatePaidOn,
      ShippingID: this.props.ShippingID,
      Service: this.props.shipmentstatusList.SubServiceName.value,
      Mode: this.props.shipmentstatusList.ShipmentType.value,
      InvoicePaydata: this.props.InvoiceData,
      TotalInvoiceAmount: totalCost ? parseFloat(totalCost).toFixed(2) : "0.00",
      totalCFT: this.props.TotalCFT
        ? parseFloat(this.props.TotalCFT).toFixed(2)
        : "0.00",
      isSubmitClick: this.props.isSubmitClick,

      MovingBackToIndia: this.props.MovingBackToIndia.DocumentMovingBackToIndia,
      NameAsPerPassport: this.props.MovingBackToIndia.DocumentNameAsPerPassport,
      YearsOutsideIndia: this.props.MovingBackToIndia.DocumentYearsOutsideIndia,
      StayInIndia: this.props.MovingBackToIndia.DocumentStayInIndia
        ? "Yes"
        : "No",
      LatestArrivalDate: this.props.MovingBackToIndia.DocumentLatestArrivalDate,
      AppliedForTR: this.props.MovingBackToIndia.DocumentAppliedForTR
        ? "Yes"
        : "No",
      AbleToProvidePassport: this.props.MovingBackToIndia
        .DocumentAbleToProvidePassport
        ? "Yes"
        : "No",
      VisaValidDate: this.props.MovingBackToIndia.DocumentVisaValidDate,
      ArrivalCategory: this.props.MovingBackToIndia.DocumentArrivalCategory,
    });
  }

  handleChangeinsurancevalue = (event) => {
    const { value } = event.target;
    if (value !== null) {
      this.setState({ insurancevalue: value.value });
    }
  };

  renderInsurancelist = () => {
    return this.state.InsuranceList.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  renderIn_ExSelectList = () => {
    return this.state.In_ExSelectList.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  ListOfIn_EX = (type) => {
    return this.state.In_ExList.map((content, idx) => {
      if (this.state.In_ExValue[idx] == type) {
        return (
          <div>
            <li style={{ float: "left", width: "70%" }}>{content.label}</li>
            <FormControl
              style={{ float: "right", width: "30%" }}
              className={classes.formControl}
              fullWidth
            >
              <Select
                id="package_number"
                name="package_number"
                value={this.state.In_ExValue[idx]}
                className="form-control"
                onChange={(event) => this.handleChangeIn_Exvalue(event, idx)}
              >
                {this.renderIn_ExSelectList()}
              </Select>
            </FormControl>
          </div>
        );
      }
    });
  };

  handleChangeIn_Exvalue = (event, index) => {
    const { value } = event.target;
    const PackageList = this.state.In_ExValue;
    if (value !== null) {
      PackageList[index] = value;
    }
    this.setState({ In_ExValue: PackageList });
  };

  ValueOfIn_EX = (type) => {
    return this.state.In_ExValue.map((content, idx) => {
      if (content == type) {
        return (
          <div
            className="package-select table-select small"
            style={{ height: "40px", width: "100%" }}
          >
            <FormControl className={classes.formControl} fullWidth>
              <Select
                id="package_number"
                name="package_number"
                value={content}
                className="form-control"
                onChange={(event) => this.handleChangeIn_Exvalue(event, idx)}
              >
                {this.renderIn_ExSelectList()}
              </Select>
            </FormControl>
          </div>
        );
      }
    });
  };

  renderInvoice = () => {
    return this.state.InvoicePaydata.map((invoice, idx) => {
      return (
        <tr>
          <td
            style={{
              border: "1px solid #000",
              padding: "5px",
              width: "20px",
              textAlign: "center",
            }}
          >
            {idx + 1}.
          </td>
          <td style={{ border: "1px solid #000", padding: "5px" }}>
            {invoice.ServiceDescription}
            {invoice.Description ? " - " + invoice.Description : ""}
          </td>
          <td
            style={{
              border: "1px solid #000",
              padding: "5px",
              textAlign: "right",
              width: "170px",
            }}
          >
            {invoice.TotalAmount ? "$" : null}
            {invoice.TotalAmount
              ? parseFloat(invoice.TotalAmount).toFixed(2)
              : null}
          </td>
        </tr>
      );
    });
  };

  handlesave = () => {
    try {
      this.showLoader();
      var data = {
        ShippingID: this.props.ShippingID,
        TrackingNumber: this.state.TrackingNumber,
        UserID: CommonConfig.loggedInUserData().PersonID,
        In_ExList: this.state.In_ExList,
        In_ExValue: this.state.In_ExValue,
        InsuranceWaiver: this.state.InsuranceWaiver ? "Yes" : "No",
      };
      api
        .post("scheduleshipment/GenerateContractOcean", data)
        .then((res) => {
          this.hideLoader();
          if (res.success) {
            if (res.data.message) {
              this.props.generatePath(res.data.message.AttachmentPath);
            }
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log(err);
        });
    } catch (error) {
      this.hideLoader();
      console.log(error);
    }
  };

  insuranceChange = (e) => {
    this.setState({
      InsuranceWaiver: e.target.checked,
    });
  };

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  render() {
    const {
      InsuranceType,
      FromAddress,
      ShipmentType,
      FromCountryName,
      DocumentManagedBy,
      ContainerType,
      Service,
      Mode,
      InvoicePaydata,
      ToAddress,
      ToCountryName,
      TrackingNumber,
      TotalInvoiceAmount,
      MovingBackToIndia,
      NameAsPerPassport,
      YearsOutsideIndia,
      StayInIndia,
      InsuranceWaiver,
      LatestArrivalDate,
      AppliedForTR,
      AbleToProvidePassport,
      VisaValidDate,
      ArrivalCategory,
      NAText,
    } = this.state;

    return (
      <div className="esign-employee-table font-11">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <table style={{ width: "100%", marginTop: "30px", fontSize: "11px" }}>
          <tr>
            <td
              colspan="4"
              style={{
                border: "1px solid #000",
                textAlign: "center",
                padding: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#fff",
                background: "#002060",
              }}
            >
              Contract for Overseas Relocation Services
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Customer Name:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {FromAddress.ContactName}
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Quote Ref.:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {TrackingNumber}
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Origin City:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {FromAddress.City} - {FromAddress.ZipCode}
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Delivery City:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {ToAddress.City} - {ToAddress.ZipCode}
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Phone:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {FromAddress.Phone1}
              {!CommonConfig.isEmpty(FromAddress.Phone2) ? "," : ""}
              {FromAddress.Phone2}
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Email Id:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              <a href="#">{FromAddress.Email}</a>
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Est. Volume:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {this.state.totalCFT} Cft.
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Container Type:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {ContainerType}
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Commodity:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              HHG
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Mode:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {Mode}
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Insurance:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {InsuranceType}
            </td>
            <td
              style={{
                border: "1px solid #000",
                width: "20%",
                padding: "5px",
                textAlign: "right",
              }}
            >
              <b>Managed By:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              {DocumentManagedBy}
            </td>
          </tr>
          <tr>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            >
              <b>Insurance Waiver:</b>
            </td>
            <td
              style={{ border: "1px solid #000", width: "30%", padding: "5px" }}
            >
              <Checkbox
                disabled={false}
                onChange={(e) => this.insuranceChange(e)}
                value={InsuranceWaiver}
              />
            </td>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            ></td>
            <td
              style={{ border: "1px solid #000", width: "20%", padding: "5px" }}
            ></td>
          </tr>
        </table>

        <table style={{ width: "100%", marginTop: "20px" }}>
          <tr>
            <td
              colspan="2"
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
              }}
            >
              DESCRIPTION OF SERVICES
            </td>
            <td
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
                textAlign: "right",
              }}
            >
              COST (IN USD)
            </td>
          </tr>
          {this.renderInvoice()}
          <tr>
            <td
              colspan="2"
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
                textAlign: "right",
              }}
            >
              TOTAL:
            </td>
            <td
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
                textAlign: "right",
              }}
            >
              $ {TotalInvoiceAmount}
            </td>
          </tr>
        </table>

        <table style={{ width: "100%", marginTop: "20px" }}>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                textAlign: "center",
                padding: "5px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#fff",
                background: "#002060",
              }}
            >
              Best Price{" "}
              <span style={{ borderBottom: "1px solid #fff" }}>Guaranteed</span>
              . We Will Meet or Beat the Best Door to Door Rates!
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
                width: "50%",
              }}
            >
              Inclusions
            </td>
          </tr>
          <tr>
            <td style={{ width: "50%", border: "1px solid #000" }}>
              <ul className="icon-list">{this.ListOfIn_EX("Inclusions")}</ul>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontWeight: "bold",
                padding: "5px",
                border: "1px solid #000",
                background: "#ffc000",
                width: "50%",
              }}
            >
              Exclusions (If Applicable)
            </td>
          </tr>
          <tr>
            <td style={{ width: "50%", border: "1px solid #000" }}>
              <ul className="icon-list">{this.ListOfIn_EX("Exclusions")}</ul>
            </td>
          </tr>
        </table>

        <div class="table-responsive">
          <table style={{ width: "100%", marginTop: "20px" }}>
            <tr>
              <td
                colspan="2"
                style={{
                  border: "1px solid #000",
                  textAlign: "center",
                  padding: "5px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#002060",
                }}
              >
                Moving Insurance options
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  fontWeight: "bold",
                  padding: "5px",
                  border: "1px solid #000",
                  background: "#ffc000",
                  textAlign: "left",
                }}
              >
                Movers Liability Coverage
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  width: "80%",
                }}
              >
                All licensed movers have a standard liability of 60 cents per
                pound per article. For example, if a 50–pound article is damaged
                as a result of a move, the mover is required to reimburse you
                $30 (50 lbs. X 0.60 = $30). You can obtain additional insurance
                to protect your items.
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "right",
                  width: "20%",
                  verticalAlign: "top",
                }}
              >
                <span class="nowrap">
                  Premium: <b>$ 0</b>
                </span>
                <br />
                <span class="nowrap">
                  Deductible: <b>$ 0</b>
                </span>
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  fontWeight: "bold",
                  padding: "5px",
                  border: "1px solid #000",
                  background: "#ffc000",
                  textAlign: "left",
                }}
              >
                Selective Insurance Coverage
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  width: "80%",
                }}
              >
                Under Selective Risk Insurance shipper can insurance selective
                item(s) and does not need to take insurance on entire shipment.
                Your selective item(s) is covered against risks such as
                breakage, damage, theft, fire, earthquake, collision, accidents,
                etc. Shipment packed by owner is not covered under Selective
                Risk Insurance. If the shipment is Packed by owner and required
                repacking at our warehouse; selective risk insurance will be
                activated from SFL Worldwide warehouse once items are inspected
                and repacked professionally. Shipment will be covered at current
                value and does not cover shipping charges, packing charges,
                customs duty etc. It is shipper responsibility to review and
                accept terms and condition offered under Selective Insurance or
                selects any other insurance provider if needed.
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "right",
                  width: "20%",
                  verticalAlign: "top",
                }}
              >
                <span class="nowrap">
                  Premium: <b>5 %</b>
                </span>
                <br />
                <span class="nowrap">
                  Deductible: <b>$ 250</b>
                </span>
                <br />
                <span class="nowrap">
                  Minimum: <b>$ 50</b>
                </span>
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                style={{
                  fontWeight: "bold",
                  padding: "5px",
                  border: "1px solid #000",
                  background: "#ffc000",
                  textAlign: "left",
                }}
              >
                All Risk Insurance Coverage{" "}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  width: "80%",
                }}
              >
                Your shipment is covered against risks such as breakage, damage,
                theft, fire, earthquake, collision, accidents, etc. Shipment
                packed by owner is not covered under All Risk Insurance. If the
                shipment is Packed by owner and required repacking at our
                warehouse; all risk insurance will be activated from SFL
                Worldwide warehouse once items are inspected and repacked
                professionally. Shipment will be covered at current value and
                does not cover shipping charges, packing charges, customs duty
                etc. It is shipper responsibility to review and accept terms and
                condition offered by the insurance company or selects any other
                insurance provider if needed.
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  textAlign: "right",
                  width: "20%",
                  verticalAlign: "top",
                }}
              >
                <span class="nowrap">
                  Premium: <b>3 %</b>
                </span>
                <br />
                <span class="nowrap">
                  Deductible: <b>$ 1000</b>
                </span>
                <br />
                <span class="nowrap">
                  Minimum: <b>$300</b>
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div class="table-responsive">
          <table style={{ width: "100%", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td
                  colspan="2"
                  style={{
                    border: "1px solid #000",
                    textAlign: "center",
                    padding: "5px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#fff",
                    background: "#002060",
                  }}
                >
                  Documentation Requirement
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    border: "1px solid #000",
                    background: "#ffc000",
                    width: "50%",
                  }}
                >
                  Foreign Passport Holder(s)
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", border: "1px solid #000" }}>
                  <ul class="icon-list">
                    <li>
                      Scanned copy of passport photo page only (not the entire
                      passport)
                    </li>
                    <li>Copy of Visa / OCI / PIO card</li>
                    <li>
                      Copy of EIN number / Authorization to us to apply for and
                      obtain EIN on your behalf
                    </li>
                    <li>
                      Signatures on export forms that will be provided by us
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    border: "1px solid #000",
                    background: "#ffc000",
                    width: "50%",
                  }}
                >
                  Indian Passport Holder(s)
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", border: "1px solid #000" }}>
                  <ul class="icon-list">
                    <li>
                      Scanned copy of passport photo page (not entire passport)
                    </li>
                    <li>
                      Signatures on export forms that will be provided by us
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    border: "1px solid #000",
                    background: "#ffc000",
                    width: "50%",
                  }}
                >
                  Documents Required at Destination
                </td>
              </tr>
              <tr>
                <td style={{ width: "50%", border: "1px solid #000" }}>
                  <ul class="icon-list">
                    <li>Original Passport</li>
                    <li>OCI / PIO Card, if holding foreign passport</li>
                    <li>
                      Signature on Customs forms that will be provided by us
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {InsuranceWaiver ? (
          <div class="table-responsive">
            <table style={{ width: "100%", marginTop: "20px" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #000",
                      textAlign: "center",
                      padding: "5px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#fff",
                      background: "#002060",
                    }}
                  >
                    Insurance Waiver
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}

        <div class="table-responsive">
          <table style={{ width: "100%", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    textAlign: "center",
                    padding: "5px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#fff",
                    background: "#002060",
                  }}
                >
                  Terms & Conditions
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", border: "1px solid #002060" }}>
                  <b>
                    Shipper's presence in India when the shipment reaches is
                    mandatory. If the shipper has not arrived into India or has
                    to travel out again when the shipment reaches, we cannot
                    clear it and additional charges may incur. We would need
                    Original Passport along with Customer's Signatures on Custom
                    Documentation which will be provided by SFL Worldwide as
                    without this document we won't able to clear shipment from
                    customs and additional charges will incur which SFL
                    Worldwide will not be liable for
                  </b>
                  <br />
                  <br />
                  <b>Transit Times:</b> Standard transit time would be 3 to 4
                  Months unforeseen any delays outside our control. SFL
                  Worldwide would not be able to control any delays on account
                  of the shipping lines as they do not fully disclose to us the
                  reasons for the delayed arrival. These can typically be
                  attributed to adverse weather conditions, port congestion, and
                  vessel maintenance or in some instances delayed departure at
                  the origin. SFL Worldwide will not be responsible for any
                  delays caused due to customs clearance procedure.
                  <br />
                  <br />
                  <b>Palletization:</b> Palletizing is done for the protection
                  of your cargo and adds up to 30% the volume of your shipment,
                  please factor this in your calculation, Palletization volume
                  cannot be estimated until actual measurement is done.
                  <br />
                  <br />
                  <b>Our Liability:</b> SFL Worldwide is only liable for loss of
                  entire package or article that is expressly stated in the
                  household goods descriptive inventory and may occur while your
                  shipment is in our physical possession. Our maximum liability
                  for such loss is limited to an amount not exceeding $0.60 per
                  pound package. For items Packed by owner, SFL Worldwide will
                  not be liable for any damage or missing content inside any
                  package or article and our liability only covers if entire
                  box/package is missing. We are not liable for loss or damage
                  that may occur after the shipment leaves our physical
                  possession.
                  <br />
                  <br />
                  An optional extended protection plan for your household goods,
                  personal effects and automobiles moving by land, sea and/or
                  air is available subject to your application, acceptance,
                  payment of premiums and compliance with the terms and
                  conditions of our 3rd party insurance underwriter at least 4
                  days prior to the pickup of your shipment. SFL Worldwide, LLC
                  does recommend that you purchase an extended protection plan
                  for your shipment.
                  <br />
                  <br />
                  If the shipment arrives at the warehouse in damaged condition,
                  we can either return shipment back to the shipper or dispose
                  shipment at written confirmation from the shipper. Depending
                  upon the option selected to and from shipping charges and
                  disposal fees will be applied. SFL Worldwide is not liable for
                  any damage of loss of the shipment arrived in damaged
                  conditional at SFL or its authorized receiving center. If your
                  shipment does not arrive within 3 weeks from pickup date to
                  our warehouse or we are not able to trace the part or full
                  shipment, SFL Worldwide will compensate under Movers Liability
                  Coverage. <br />
                  <br />
                  <b>Quote Validity:</b> We appreciate and thank you for the
                  opportunity to submit this proposal for international
                  relocation services. The scope of services to be performed by
                  SFL Worldwide and its agents are limited to the performance of
                  only those services expressly stated in this proposal. Please
                  note, that our services are entirely flexible and can be
                  adapted to your changing requirements. The prices stated
                  herein are valid for a period of Thirty (30) days from the
                  date of this proposal.
                  <br />
                  <br />
                  <b>Payment Terms:</b> All charges, as above must be paid by
                  check or wire transfer within seven days from the receipt of
                  our trade invoice after pickup of your shipment. Credit Card
                  will be only accepted for payment under $500.00 and credit
                  card fees will be charged at 3% if payment is being made by
                  Credit Card. If payment is not made by due date late fees of
                  $35.00 and interest of 14.99 % per annum will be applied.
                  <br />
                  <br />
                  <b>Weight Limit:</b> You are allowed to keep the weight equal
                  to the dimensional weight of the box. For Example: If you are
                  using a box with dimension 18x18x24 Inches, so the dimensional
                  weight of this box is 56lbs therefore you can fill this box up
                  to 56 lbs. Here if the actual weight exceeds the allowed limit
                  you will be charged as $2/lb. for additional Lbs. If any of
                  your box is more than 50lbs then there will be additional
                  Charge of $25.00 for that particular box for Over Weight
                  Charges.
                  <br />
                  <br />
                  Overseas shipping entails handling of cargo multiple times and
                  therefore standard boxes do not have the quality or cardboard
                  strength to sustain all the handling. You must buy Double
                  Walled or Heavy-Duty boxes to ship your belongings which is
                  easily available from Home Depot or Lowes Stores. If boxes are
                  received in damaged condition to our warehouse additional $
                  15.00 repacking charges per box will be applied to repack
                  damaged boxes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive">
          <table style={{ width: "100%", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td
                  colspan="2"
                  style={{
                    border: "1px solid #000",
                    textAlign: "center",
                    padding: "5px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#fff",
                    background: "#002060",
                  }}
                >
                  Transfer of Residence Questionnaire
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Are you Moving back to India?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Your Name as per passport?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? NameAsPerPassport : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  How many years stayed outside India?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? YearsOutsideIndia : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Stayed in India for more than 6 months in last 2 years?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? StayInIndia : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Have you applied for TR in last 3 years?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? AppliedForTR : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Will Provide Original Passport for Custom Clearance?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? AbleToProvidePassport : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Your latest arrival date in India?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? LatestArrivalDate : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Arriving in India with?
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? ArrivalCategory : NAText}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    width: "50%",
                  }}
                >
                  Validity Date
                </td>
                <td
                  style={{
                    border: "1px solid #000",
                    padding: "5px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {MovingBackToIndia ? VisaValidDate : NAText}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table style={{ width: "100%", marginTop: "20px" }} class="page">
          <tr>
            <td
              style={{
                border: "1px solid #000",
                textAlign: "center",
                padding: "5px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#fff",
                background: " #002060",
                width: "50%",
              }}
            >
              Your rights and responsibilities
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #000" }}>
              <ul className="icon-list">
                <li>Our House Bill of Lading is the title to your cargo.</li>
                <li>
                  By signing this contract, you agree that our Household Goods
                  Descriptive Inventory is the official document that contains
                  the pickup date, delivery date, quantity and description of
                  your packages shipped and received.
                </li>
                <li>
                  You agree to denote damages to items during packing or loading
                  at the origin in our Household Goods Descriptive Inventory
                  prior to signing and dating at the origin.
                </li>
                <li>
                  You agree to denote any missing or damaged packages along with
                  your signature upon delivery of your shipment in our Household
                  Goods Descriptive Inventory prior to signing and dating at the
                  destination.
                </li>
                <li>
                  In the event that your shipment is not delivered in whole, you
                  agree to submit your claim in writing to us within 120 days
                  after pickup. We will attempt to locate your shipment within 4
                  weeks of receiving your written claim. If we are unable to
                  locate your shipment in four weeks and if you have purchased
                  an extended protection plan with us, we will file a claim with
                  the insurance company during the fifth week. If you have not
                  purchased an extended protection plan or if your claim is
                  denied by the insurance company you will be compensated per
                  Movers Liability stated above.
                </li>
                <li>
                  In the event that your shipment is delivered in part or in the
                  case of any damages, you agree to submit your claim in writing
                  to us within 7 days after delivery. You agree to denote the
                  missing / damaged packages in our Household Goods Descriptive
                  Inventory during delivery. Upon receipt of your written claim
                  and if you have purchased an All-Risk insurance extended
                  protection plan with us we will file a claim with the
                  insurance company. If you have not purchased All Risk
                  Insurance or if your insurance claim is denied by the
                  insurance company you will be compensated per Movers Liability
                  stated above.
                </li>
                <li>
                  You may address your claim to SFL Worldwide at
                  contact@sflworldwide.com or By Faxing at 1-888-609-0778
                </li>
                <li>
                  Please confirm acceptance of this proposal by signing and
                  returning this proposal along with booking deposit USD 250.00
                  so that we can lock the rates and process your booking.
                  Balance Payment is due in full upon receipt of our Invoice
                  which will be sent after pickup of your shipment.
                </li>
                <li>
                  Service provided pursuant to this NVOCC Negotiated Rate
                  Arrangement (NRA) is subject to Carrier's governing rules
                  tariff, which is accessible at www.dpiusa.com in compliance
                  with FMC Regulations as provided in 46 CFR 532.7.”
                </li>
                <li>
                  Any legal disputes will be subject to the jurisdiction of
                  Texas State Law where SFL Worldwide LLC is registered.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                fontSize: "13px",
                textAlign: "center",
                fontWeight: "bold",
                padding: "15px 5px",
              }}
            >
              SFL Worldwide LLc<br></br>
              3364 Garden Brook Drive, Farmers Branch, TX - 75234<br></br>
              Website: www.SFLWorldwide.com | Fax: 888-609-0778
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                textAlign: "center",
                padding: "5px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#fff",
                background: " #002060",
                width: "50%",
              }}
            >
              Signature Confirmation{" "}
              <i style={{ fontWeight: "normal" }}>
                (Please sign when ready to confirm)
              </i>
              :
            </td>
          </tr>
          <tr>
            <td
              style={{
                height: "80px",
                border: "1px solid #000",
                borderWidth: "1px 1px 0 1px",
                padding: "0 10px",
              }}
            >
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ padding: "5px 0", width: "30%" }}></td>
                  <td style={{ padding: "5px 0", width: "50%" }}></td>
                  <td style={{ padding: "5px 0", textAlign: "right" }}>
                    {DocumentManagedBy}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "0 10px",
                borderWidth: "0 1px 1px 1px",
              }}
            >
              <table style={{ width: "100%", borderTop: "1px solid #000" }}>
                <tr>
                  <td style={{ padding: "5px 0", width: "30%" }}>
                    Customer Signature
                  </td>
                  <td style={{ padding: "5px 0", width: "50%" }}>Date</td>
                  <td style={{ padding: "5px 0", textAlign: "right" }}>
                    Working on Proposal
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style={{ textAlign: "center", paddingBottom: "5px" }}
                  >
                    By signing above, you agree that they are incorporated
                    herein by reference and apply to this account.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <div>
          {/* <Button onClick={() => this.handlesave()}>Submit</Button> */}
        </div>
      </div>
    );
  }
}
esign_employee_temp.propTypes = {
  classes: PropTypes.object,
};

export default withStyles()(esign_employee_temp);
