import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

import Header from "../../layout/header";
import PreHeader from "../../layout/pre-header";
import Footer from "../../layout/footer";
import { PageBanner } from "../../content/element/page-banner";
import { SetEmailAddress } from "../../../Store/action/signupActions";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      verifyLoading: false,
      otpLoading: false,
      codeSent: false,
      errMsg: "",
      otpCode: "",
    };
    this.validator = new SimpleReactValidator();
    this.getOTP = this.getOTP.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }

  componentDidMount() {
    if (!this.props.signup.accountType) {
      this.props.history.push("/register");
      return;
    }
  }

  handleChangeInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  getOTP(e) {
    e.preventDefault();
    this.setState({ otpLoading: true, codeSent: false, errMsg: "" });
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
  }

  verifyOTP(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ verifyLoading: true, errMsg: "" });
      const identify = this.state.email;
      axios
        .post(`/api/users/verify-otp`, {
          identify: identify,
          code: this.state.otpCode,
        })
        .then((res) => {
          if (res.data.message === "success") {
            this.setState({ verifyLoading: false });
            this.props.setEmailAddress(this.state.email);
            this.props.history.push("/register/verify-phone");
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

  render() {
    const { t } = this.props;
    const { otpLoading, email, codeSent, errMsg, verifyLoading, otpCode } = this.state;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="CREATE AN ACCOUNT" />
        <section className="verify-email-page section-padding-strict mb-5">
          <div className="container">
            <p className="text-center">Please verify your email with One Time Password!</p>
            <form action="/">
              <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleChangeInput} />
              </div>
            </form>
            <div className="opt-password-wrapper form-group">
              <input type="text" name="otpCode" className="form-control" placeholder="OTP" onChange={this.handleChangeInput} />
              <button
                type="button"
                disabled={email && otpLoading === false ? false : true}
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
                We have sent code to {this.state.email}.{" "}
                <a href=" " onClick={this.getOTP}>
                {t("auth_send_again")}
                </a>
                ?
              </p>
            )}
            {errMsg && <p className="text-danger text-center">{errMsg}</p>}
            <div className="form-group text-center">
              <button
                type="submit"
                disabled={(codeSent === true &&  verifyLoading === false) ? false : true}
                onClick={this.verifyOTP}
                className="btn btn-primary"
              >
                {verifyLoading && <i className="las la-spinner la-spin mr-2"></i>}
                {t("auth_continue")}
              </button>
            </div>

          </div>
        </section>
        <Footer />
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
    setEmailAddress: (data) => dispatch(SetEmailAddress(data)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(VerifyEmail);
