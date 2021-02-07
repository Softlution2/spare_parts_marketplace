import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { LogInAc } from "../../../../Store/action/loginActions";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { withTranslation } from 'react-i18next';
import axios from "axios";

import OTPVerification from "./otp-verification";
import PasswordForm from "./password";

const noAction = (e) => e.preventDefault();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinType: null,
      recoverType: null,
      identity: null,
      signinStep: 0,
      email: "",
      phone: "",
      password: "",
      disabled: false,
      signinLoading: false,
      errMsg: "",
    };
    this.validator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.setSigninType = this.setSigninType.bind(this);
    this.setRecoverType = this.setRecoverType.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  setSigninType = (e, value) => {
    noAction(e);
    this.setState({ signinType: value });
  };

  setRecoverType = (e, value) => {
    noAction(e);
    this.setState({ recoverType: value });
  }

  handleContinue = (e) => {
    noAction(e);
    this.setState({ signinStep: 1 });
  };

  handleChangePhone = (number) => {
    this.setState({ phone: number });
  };

  forgetPassword = (e) => {
    e.preventDefault();
    this.setState({ signinStep: 2 });
  }

  handleLogin = (e) => {
    noAction(e);
    if (this.validator.allValid()) {
      this.setState({ signinLoading: true });
      axios
        .post(`/api/users/login`, {
          method: this.state.signinType,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
        })
        .then((res) => {
          this.props.login({...res.data.user, token: res.data.token});
          window.location.reload();
        })
        .catch((err) => {
          this.setState({ signinLoading: false });
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
  };

  render() {
    let {
      signinStep,
      signinType,
      signinLoading,
      email,
      phone,
      password,
      errMsg,
      recoverType,
      identity
    } = this.state;
    const { t } = this.props;

    return (
      <Fragment>
        <div
          className="modal fade"
          id="login_modal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="login_modal_label"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="login_modal_label">
                  {
                    signinStep >= 2 ? (
                      <>Forgot your password?</>
                    ) : 
                    <>{t("auth_sign_in")}</>
                  }
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {signinStep === 0 && (
                  <React.Fragment>
                    <h2 className="welcome">{t("auth_welcome")}</h2>
                    <p className="text-center mt-3">
                      {t("auth_how_you_want_login")}
                    </p>
                    <div className="signin-types">
                      <div
                        className={`signin-type-email type-item ${
                          signinType === "email" ? "active" : ""
                        }`}
                        onClick={(e) => this.setSigninType(e, "email")}
                      >
                        <i className="la la-envelope" />
                        {t("auth_email")}
                      </div>
                      <div
                        className={`signin-type-phone type-item ${
                          signinType === "phone" ? "active" : ""
                        }`}
                        onClick={(e) => this.setSigninType(e, "phone")}
                      >
                        <i className="la la-phone" />
                        {t("auth_phone")}
                      </div>
                    </div>
                    <p>
                      <a href='#!' onClick={this.forgetPassword}>Forgot your password?</a>
                    </p>    
                    <button
                      type="button"
                      className="btn btn-continue"
                      disabled={signinType === null ? true : false}
                      onClick={this.handleContinue}
                    >
                      {t("auth_continue")}
                    </button>
                  </React.Fragment>
                )}
                {signinStep === 1 && (
                  <React.Fragment>
                    <form action="/" id="signin-form">
                      <div className="form-group">
                        {signinType && signinType === "email" && (
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
                              {this.validator.message(
                                "Email",
                                email,
                                "required|email"
                              )}
                            </div>
                          </Fragment>
                        )}

                        {signinType && signinType === "phone" && (
                          <Fragment>
                            <PhoneInput
                              placeholder={t("auth_phone_placeholder")}
                              name="Phone"
                              value={phone || ""}
                              onChange={(phone) =>
                                this.handleChangePhone(phone)
                              }
                            />
                            <div className="text-danger">
                              {this.validator.message(
                                "Phone",
                                phone,
                                "required"
                              )}
                            </div>
                          </Fragment>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={this.setStateFromInput}
                          className="form-control"
                          placeholder={t("auth_password_placeholder")}
                          required
                        />
                        <div className="text-danger">
                          {this.validator.message(
                            "Password",
                            password,
                            "required|string"
                          )}
                        </div>
                      </div>
                      {errMsg && <p className="text-danger">{errMsg}</p>}
                      <button
                        type="button"
                        onClick={(e) => this.setState({ signinStep: 0 })}
                        className="btn btn-continue  mr-2"
                      >
                        {t("auth_previous")}
                      </button>
                      <button
                        type="submit"
                        disabled={signinLoading === false ? false : true}
                        onClick={this.handleLogin}
                        className="btn btn-continue"
                      >
                        {signinLoading && (
                          <i className="las la-spinner la-spin mr-2"></i>
                        )}
                        {t("auth_continue")}
                      </button>
                    </form>
                  </React.Fragment>
                )}
                {
                  signinStep === 2 && (
                    <React.Fragment>
                      <h2 className="welcome">Forgot your password?</h2>
                      <p className="text-center mt-3">
                        {/* {t("auth_how_you_want_login")} */}
                        Please choose how you want to reset your password.
                      </p>
                      <div className="signin-types">
                        <div
                          className={`signin-type-email type-item ${
                            recoverType === "email" ? "active" : ""
                          }`}
                          onClick={(e) => this.setRecoverType(e, "email")}
                        >
                          <i className="la la-envelope" />
                          {t("auth_email")}
                        </div>
                        <div
                          className={`signin-type-phone type-item ${
                            recoverType === "phone" ? "active" : ""
                          }`}
                          onClick={(e) => this.setRecoverType(e, "phone")}
                        >
                          <i className="la la-phone" />
                          {t("auth_phone")}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-continue"
                        disabled={recoverType === null ? true : false}
                        onClick={() => { this.setState({signinStep: 3}) }}
                      >
                        {t("auth_continue")}
                      </button>
                    </React.Fragment>
                  )
                }
                {signinStep === 3 && (
                  <OTPVerification
                    verifyMethod={recoverType}
                    goPrev={() => this.setState({ signinStep: 2 })}
                    goNext={() => this.setState({ signinStep: 4 })}
                    setIdentity={(identity) => this.setState({ identity })}
                  />
                )}
                {
                  signinStep === 4 && (
                    <PasswordForm
                      method={recoverType}
                      identity={identity}
                      goPrev={() => this.setState({ signinStep: 3 })}
                      goNext={() => this.setState({ signinStep: 0 })}
                    />
                  )
                }

                <p className="footer-text">
                By doing this, i agree to{" "}
                  <a href="/terms">Terms</a> and{" "}
                  <a href="/privacy">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
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
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(Login);
