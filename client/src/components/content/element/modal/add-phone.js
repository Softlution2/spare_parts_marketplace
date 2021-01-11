import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import axios from "axios";
import { LogInAc } from "../../../../Store/action/loginActions";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

class AddPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      otpCode: "",
      codeSent: false,
      phoneValid: false,
      otpLoading: false,
      errMsg: "",
      typingTimeout: 0,
      verifyLoading: false,
    };
    this.validator = new SimpleReactValidator();
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.getOTP = this.getOTP.bind(this);
  }

  handleChangePhone(phone) {
    this.setState({codeSent: false});
    let self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({
      phone: phone,
      phoneValid: false,
      typingTimeout: setTimeout(function () {
        self.verifyPhoneNumber(phone);
      }, 1000),
    });
  }
  setStateFromInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  verifyPhoneNumber(number) {
    axios
      .get(
        `https://apilayer.net/api/validate?access_key=152e6b0b8550cdddaf5f2ac1435e8cc9&number=${number}`
      )
      .then((res) => {
        this.setState({ phoneValid: res.data.valid });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  verifyOTP(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ verifyLoading: true, errMsg: "" });
      axios
        .post(`/api/users/verify-otp`, {
          identify: "+" + this.state.phone,
          code: this.state.otpCode,
        })
        .then((res) => {
          this.setState({
            phone: "",
            otpCode: "",
            codeSent: false,
            phoneValid: false,
            otpLoading: false,
            errMsg: "",
            typingTimeout: 0,
            verifyLoading: false,
          })
          this.props.addPhoneNumbers(this.state.phone);
        })
        .catch((err) => {
          this.setState({
            errMsg: err.response.data.message,
            codeSent: false,
            verifyLoading: false,
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  getOTP(e) {
    e.preventDefault();
    this.setState({ otpLoading: true, codeSent: false, errMsg: "" });
    axios
      .post(`/api/users/get-otp-by-phone`, { phone: "+" + this.state.phone })
      .then((res) => {
        this.setState({ otpLoading: false, codeSent: true });
      })
      .catch((err) => {
        this.setState({
          otpLoading: false,
          codeSent: false,
          errMsg: err.response.data.message,
        });
      });
  }

  render() {
    const { phone, otpCode, codeSent, otpLoading, phoneValid, verifyLoading, errMsg } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <form style={{padding: '2rem'}}>
          <div className="form-group">
            <PhoneInput
              placeholder="Enter phone number"
              name="Phone"
              value={phone || ""}
              onChange={(phone) => this.handleChangePhone(phone)}
            />
            {/* <div className="text-danger">
              {this.validator.message("Phone", phone, "required")}
            </div> */}
          </div>
          <div className="opt-password-wrapper form-group">
            <input
              type="text"
              name="otpCode"
              value={otpCode}
              onChange={this.setStateFromInput}
              className="form-control"
              placeholder="OTP"
              required
            />
            <button
              type="button"
              disabled={phoneValid && otpLoading === false ? false : true}
              onClick={this.getOTP}
              className="btn"
              id="get-opt-btn"
            >
              {otpLoading && <i className="las la-spinner la-spin mr-2"></i>}
              {t("auth_get_otp")}
            </button>
          </div>
          <div className="text-danger">
            {this.validator.message("otp code", otpCode, "required|string")}
          </div>
          {codeSent === true && (
            <p className="text-info text-center">
              We have sent code to {phone}.{" "}
              <a href=" " onClick={this.getOTP}>
                {t("auth_send_again")}
              </a>
              ?
            </p>
          )}
          {
            errMsg && (
              <p className="text-center text-danger">
                {errMsg}
              </p>
            )
          }
          <div className="form-group">
            <button className="btn btn-block btn-primary" disabled={!codeSent || verifyLoading} onClick={this.verifyOTP}>
              {verifyLoading && <i className="las la-spinner la-spin mr-2"></i>}
              {t("auth_verify")}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    login: (data) => dispatch(LogInAc(data)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(AddPhone);
