import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';

import {
  SetSellingAuthIdentity,
  SetSellingAuthStep,
  SetUserDetails
} from "../../../Store/action/sellingAction";
import { LogInAc } from "../../../Store/action/loginActions";


const noAction = (e) => e.preventDefault();
class AuthVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      otpCode: "",
      password: "",
      checkLoading: false,
      loginLoading: false,
      otpLoading: false,
      verifyLoading: false,
      codeSent: false,
      typingTimeout: 0,
      phoneValid: false,
      accountExist: null,
    };
    this.validator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.getOTP = this.getOTP.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.checkAccount = this.checkAccount.bind(this);
    this.loginAction = this.loginAction.bind(this);
  }

  componentDidMount() {
    let { email, phone, authMethod } = this.props.selling;
    if (authMethod === "phone" && phone !== "") {
      this.setState({ phone });
      this.verifyPhoneNumber(phone);
    } else if (authMethod === "email") {
      this.setState({ email });
    }
  }

  setStateFromInput(e) {
    noAction(e);
    if (e.target.name === 'email') {
      this.setState({codeSent: false});
      let self = this;
      if (this.state.typingTimeout)
        clearTimeout(this.state.typingTimeout)
      this.setState({
        email: e.target.value,
        typingTimeout: setTimeout(function () {
          self.checkAccount();
        }, 1000)
      })
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  verifyOTP(e) {
    noAction(e);
    if (this.validator.allValid()) {
      this.setState({ verifyLoading: true });
      let identify = null;
      let { authMethod } = this.props.selling;
      if (authMethod === "email") {
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
          this.setState({ verifyLoading: false });
          this.props.setAuthIdentity({email: this.state.email, phone: this.state.phone});
          this.props.setSellingAuthStep(2);
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            codeSent: true,
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
    this.setState({ otpLoading: true, codeSent: false });
    let { authMethod } = this.props.selling;
    if (authMethod === "email") {
      axios
        .post(`/api/users/get-otp-by-email`, { email: this.state.email })
        .then((res) => {
          this.setState({ otpLoading: false, codeSent: true });
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            otpLoading: false,
            codeSent: false,
          });
        });
    } else {
      axios
        .post(`/api/users/get-otp-by-phone`, { phone: "+" + this.state.phone })
        .then((res) => {
          this.setState({ otpLoading: false, codeSent: true });
        })
        .catch((err) => {
          console.log(err.response);
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            otpLoading: false,
            codeSent: false,
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
      }, 800),
    });
  }

  verifyPhoneNumber(number) {
    if (!number) return;
    this.setState({checkLoading: true});
    axios
      .get(
        `https://apilayer.net/api/validate?access_key=152e6b0b8550cdddaf5f2ac1435e8cc9&number=${number}`
      )
      .then((res) => {
        this.setState({ phoneValid: res.data.valid });
        if (res.data.valid === true) {
          this.checkAccount();
        }
        else {
          this.setState({checkLoading: false});
        }
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({checkLoading: false});
      });
  }

  checkAccount() {
    this.setState({checkLoading: true});
    let { authMethod } = this.props.selling;
    let { phone, email } = this.state;
    axios.post(
      `/api/users/check-account`, {phone, email, method: authMethod}
    )
    .then((res) => {
      let isExist = res.data.is_exist;
      this.setState({checkLoading: false, accountExist: isExist});
    })
    .catch((err) => {
      console.log(err.response);
      this.setState({checkLoading: false});
    })
  }

  loginAction(e) {
    noAction(e);
    if (this.validator.allValid()) {
      this.setState({ loginLoading: true });
      axios
        .post(`/api/users/login`, {
          method: this.props.selling.authMethod,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
        })
        .then((res) => {
          const user = res.data.user;
          this.props.login(user);
          this.props.setUserDetails({name: user.name, location: user.location, phone: user.phone && user.phone.length > 0 ? user.phone[0] : ""});
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({ loginLoading: false });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    let { authMethod } = this.props.selling;
    let {
      email,
      phone,
      otpCode,
      codeSent,
      otpLoading,
      verifyLoading,
      checkLoading,
      password,
      phoneValid,
      accountExist,
      loginLoading
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <form action="/">
          <div className="form-group">
            {authMethod && authMethod === "email" && (
              <Fragment>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={email || ""}
                    onChange={this.setStateFromInput}
                    className="form-control"
                    placeholder={t("auth_email")}
                    required
                  />
                  {
                    checkLoading && (
                      <i className="las la-spinner la-spin mr-2"></i>
                    )
                  }
                </div>
                <div className="text-danger">
                  {this.validator.message("Email", email, "required|email")}
                </div>
              </Fragment>
            )}

            {authMethod && authMethod === "phone" && (
              <Fragment>
                <div className="input-wrapper">
                  <PhoneInput
                    placeholder={t("auth_phone_placeholder")}
                    name="Phone"
                    value={phone || ""}
                    onChange={(phone) => this.handleChangePhone(phone)}
                  />
                  {
                    checkLoading && (
                      <i className="las la-spinner la-spin mr-2"></i>
                    )
                  }
                </div>
                <div className="text-danger">
                  {this.validator.message("Phone", phone, "required")}
                </div>
              </Fragment>
            )}
          </div>
          {
            accountExist === true && (
              <Fragment>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={password || ""}
                    onChange={this.setStateFromInput}
                    className="form-control"
                    placeholder={t("auth_password_placeholder")}
                    required
                  />
                  <div className="text-danger">
                    {this.validator.message("password", password, "required|string")}
                  </div>
                </div>
              </Fragment>
            )
          }
          {
            accountExist === false && (
              <Fragment>
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
                  {authMethod === "email" && (
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
                  {authMethod === "phone" && (
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
                    We have sent code to {authMethod === "email" ? email : phone}.{" "}
                    <a href=" " onClick={this.getOTP}>
                      {t("auth_send_again")}
                    </a>
                    ?
                  </p>
                )}
              </Fragment>
            )
          }
          <button
            type="button"
            onClick={(e) => this.props.setSellingAuthStep(0)}
            className="btn btn-continue  mr-2"
          >
            {t("auth_previous")}
          </button>
          {
            accountExist === true ? (
              <button
                type="submit"
                disabled={loginLoading === false ? false : true}
                onClick={this.loginAction}
                className="btn btn-continue"
              >
                {loginLoading && <i className="las la-spinner la-spin mr-2"></i>}
                {t("auth_login")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={codeSent === false || accountExist === null}
                onClick={this.verifyOTP}
                className="btn btn-continue"
              >
                {verifyLoading && <i className="las la-spinner la-spin mr-2"></i>}
                {t("auth_continue")}
              </button>
            )
          }
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selling: state.selling,
    login: state.login,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    login: (data) => dispatch(LogInAc(data)),
    setAuthIdentity: (identity) => dispatch(SetSellingAuthIdentity(identity)),
    setSellingAuthStep: (step) => dispatch(SetSellingAuthStep(step)),
    setUserDetails: (details) => dispatch(SetUserDetails(details)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(AuthVerification);
