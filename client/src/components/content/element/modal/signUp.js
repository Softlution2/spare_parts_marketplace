import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import { SetVerifyMethod, SetSignupStep } from "../../../../Store/action/signupActions";
import OTPVerification from "../signup/otp-verification";
import PasswordForm from "../signup/password";
import DetailsForm from "../signup/details-form";
import LogoForm from "../signup/logo-form";
import SimpleReactValidator from "simple-react-validator";

const noAction = (e) => e.preventDefault();
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signuptype: null,
      username: "woadud akand",
      email: "",
      password: "",
    };
    this.validator = new SimpleReactValidator();
    this.setSignupType = this.setSignupType.bind(this);
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  async componentDidMount() {
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  setSignupType = (e, value) => {
    noAction(e);
    this.setState({ signuptype: value });
  };

  handleContinue = (e) => {
    noAction(e);
    let { signuptype } = this.state;
    this.props.setVerifyMethod(signuptype).then((res) => {
      if (this.props.signup.verifyMethod) {
        this.props.setSignupStep(1);
      }
    });
  };

  handleCloseModal() {
    this.closeSignupButton.click();
  }

  render() {
    let { signuptype } = this.state;
    let { signupStep } = this.props.signup;
    const { t } = this.props;
    return (
      <Fragment>
        <div
          className="modal fade"
          id="signup_modal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="signup_modal_label"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="signup_modal_label">
                  {t("auth_sign_up")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={(ref) => (this.closeSignupButton = ref)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {signupStep === 0 && (
                  <React.Fragment>
                    <h2 className="welcome">{t("auth_welcome")}</h2>
                    <p className="text-center mt-3">
                      {t("auth_how_you_want_signup")}
                    </p>
                    <div className="signup-types">
                      <div
                        className={`signup-type-email type-item ${
                          signuptype === "email" ? "active" : ""
                        }`}
                        onClick={(e) => this.setSignupType(e, "email")}
                      >
                        <i className="la la-envelope" />
                        {t("auth_email")}
                      </div>
                      <div
                        className={`signup-type-phone type-item ${
                          signuptype === "phone" ? "active" : ""
                        }`}
                        onClick={(e) => this.setSignupType(e, "phone")}
                      >
                        <i className="la la-phone" />
                        {t("auth_phone")}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-continue"
                      disabled={signuptype === null ? true : false}
                      onClick={this.handleContinue}
                    >
                      {t("auth_continue")}
                    </button>
                    <p className="footer-text">
                      By doing this, i agree to{" "}
                        <a href="/terms">Terms</a> and{" "}
                        <a href="/privacy">Privacy Policy</a>
                    </p>
                  </React.Fragment>
                )}
                {signupStep == 1 && (
                  <OTPVerification />
                )}
                {signupStep == 2 && (
                  <PasswordForm />
                )}
                {signupStep == 3 && (
                  <DetailsForm />
                )}
                {signupStep == 4 && (
                  <LogoForm
                    handleCloseModal={this.handleCloseModal}
                  />
                )}
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
    signup: state.signup,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    setVerifyMethod: (method) => dispatch(SetVerifyMethod(method)),
    setSignupStep: (step) => dispatch(SetSignupStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(Register);
