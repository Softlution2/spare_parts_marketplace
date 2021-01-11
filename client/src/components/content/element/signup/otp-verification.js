import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import {
  SetVerifyPassed,
  SetEmailAddress,
  SetPhoneNumber,
  SetSignupStep,
} from "../../../../Store/action/signupActions";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios";

const noAction = (e) => e.preventDefault();
class OTPVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      otpCode: "",
      otpLoading: false,
      verifyLoading: false,
      codeSent: false,
      errMsg: "",
      typingTimeout: 0,
      phoneValid: false,
    };
    this.validator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.getOTP = this.getOTP.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
  }

  componentDidMount() {
    let { email, phone, verifyMethod } = this.props.signup;
    if (verifyMethod === "phone" && phone !== "") {
      this.setState({ phone });
      this.verifyPhoneNumber(phone);
    } else if (verifyMethod === "email") {
      this.setState({ email });
    }
  }

  setStateFromInput(e) {
    noAction(e);
    if (e.target.name === 'email') {
      this.setState({codeSent: false});
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  verifyOTP(e) {
    noAction(e);
    if (this.validator.allValid()) {
      this.setState({ verifyLoading: true, errMsg: "" });
      let identify = null;
      let { verifyMethod } = this.props.signup;
      if (verifyMethod === "email") {
        identify = this.state.email;
      } else {
        identify = "+" + this.state.phone;
      }
      axios
        .post(`/api/users/verify-otp`, {
          identify: identify,
          code: this.state.otpCode,
        })
        .then((res) => {
          if (res.data.message === "success") {
            this.setState({ verifyLoading: false });
            verifyMethod === "email"
              ? this.props.setEmailAddress(this.state.email)
              : this.props.setPhoneNumber(this.state.phone);
            this.props.setVerifyPassed(true);
            this.props.setSignupStep(2);
          } else {
            this.props.setVerifyPassed(false);
          }
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
    noAction(e);
    this.setState({ otpLoading: true, codeSent: false, errMsg: "" });
    let { verifyMethod } = this.props.signup;
    if (verifyMethod === "email") {
      axios
        .post(`/api/users/get-otp-by-email`, { email: this.state.email })
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
    } else {
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

  render() {
    let { verifyMethod } = this.props.signup;
    let {
      email,
      phone,
      otpCode,
      codeSent,
      otpLoading,
      verifyLoading,
      errMsg,
      phoneValid,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <h2 className="welcome">{t("auth_welcome")}</h2>
        <p className="text-center mt-3">
          Please verify with your {verifyMethod}.
        </p>
        <form action="/" id="signup-form">
          <div className="form-group">
            {verifyMethod && verifyMethod === "email" && (
              <Fragment>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.setStateFromInput}
                  className="form-control"
                  placeholder={t("auth_email")}
                  required
                />
                <div className="text-danger">
                  {this.validator.message("Email", email, "required|email")}
                </div>
              </Fragment>
            )}

            {verifyMethod && verifyMethod === "phone" && (
              <Fragment>
                <PhoneInput
                  placeholder={t("auth_phone_placeholder")}
                  name="Phone"
                  value={phone || ""}
                  onChange={(phone) => this.handleChangePhone(phone)}
                />
                <div className="text-danger">
                  {this.validator.message("Phone", phone, "required")}
                </div>
              </Fragment>
            )}
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
            {verifyMethod === "email" && (
              <button
                type="button"
                disabled={email && otpLoading === false ? false : true}
                onClick={this.getOTP}
                className="btn"
                id="get-otp-btn"
              >
                {otpLoading && <i className="las la-spinner la-spin mr-2"></i>}
                {t("auth_get_otp")}
              </button>
            )}
            {verifyMethod === "phone" && (
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
            )}
          </div>
          <div className="text-danger">
            {this.validator.message("otp code", otpCode, "required|string")}
          </div>
          {codeSent === true && (
            <p className="text-info text-center">
              We have sent code to {verifyMethod === "email" ? email : phone}.{" "}
              <a href=" " onClick={this.getOTP}>
              {t("auth_send_again")}
              </a>
              ?
            </p>
          )}
          {errMsg && <p className="text-danger text-center">{errMsg}</p>}
          <button
            type="button"
            onClick={(e) => this.props.setSignupStep(0)}
            className="btn btn-continue  mr-2"
          >
            {t("auth_previous")}
          </button>
          <button
            type="submit"
            disabled={verifyLoading === false ? false : true}
            onClick={this.verifyOTP}
            className="btn btn-continue"
          >
            {verifyLoading && <i className="las la-spinner la-spin mr-2"></i>}
            {t("auth_continue")}
          </button>
        </form>
        <p className="footer-text">
          By doing this, i agree to MyCar.Africa's <a href="/terms">Terms</a>{" "}
          and <a href="/privacy">Privacy Policy</a>
        </p>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    setVerifyPassed: (data) => dispatch(SetVerifyPassed(data)),
    setEmailAddress: (data) => dispatch(SetEmailAddress(data)),
    setPhoneNumber: (data) => dispatch(SetPhoneNumber(data)),
    setSignupStep: (step) => dispatch(SetSignupStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(OTPVerification);
