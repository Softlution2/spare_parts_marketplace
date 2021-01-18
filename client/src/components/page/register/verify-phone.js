import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import Header from "../../layout/header";
import PreHeader from "../../layout/pre-header";
import Footer from "../../layout/footer";
import { PageBanner } from "../../content/element/page-banner";
import { SetPhoneNumber } from "../../../Store/action/signupActions";

class VerifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      verifyLoading: false,
      otpLoading: false,
      codeSent: false,
      errMsg: "",
      otpCode: "",
      typingTimeout: 0,
      phoneValid: false,
    };
    this.validator = new SimpleReactValidator();
    this.getOTP = this.getOTP.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
  }

  componentDidMount() {
    if (!this.props.signup.accountType) {
      this.props.history.push("/register");
      return;
    }
    if (!this.props.signup.email) {
      this.props.history.push("/register/verify-email");
      return;
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

  handleChangeInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
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

  verifyOTP(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ verifyLoading: true, errMsg: "" });
      const identify = "+" + this.state.phone;
      axios
        .post(`/api/users/verify-otp`, {
          identify: identify,
          code: this.state.otpCode,
        })
        .then((res) => {
          if (res.data.message === "success") {
            this.setState({ verifyLoading: false });
            this.props.setPhoneNumber(this.state.phone);
            this.props.history.push("/register/password");
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
    const { t } = this.props;
    const { otpLoading, phone, codeSent, errMsg, verifyLoading, otpCode, phoneValid } = this.state;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title={`CREATE A ${this.props.signup.accountType} ACCOUNT`} />
        <section className="verify-phone-page section-padding-strict mb-5">
          <div className="container">
            <p className="text-center">Please verify your phone number with One Time Password</p>
            <form action="/">
              <div className="form-group">
                  
                <PhoneInput
                  placeholder={t("auth_phone_placeholder")}
                  name="Phone"
                  value={phone || ""}
                  onChange={(phone) => this.handleChangePhone(phone)}
                />
                <div className="text-danger">
                  {this.validator.message("Phone", phone, "required")}
                </div>
              </div>
            </form>
            <div className="opt-password-wrapper form-group">
              <input type="text" name="otpCode" className="form-control" placeholder="OTP" onChange={this.handleChangeInput} />
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
                We have sent code to {this.state.phone}.{" "}
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
    setPhoneNumber: (data) => dispatch(SetPhoneNumber(data)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(VerifyPhone);
