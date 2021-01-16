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
import { SetPassword } from "../../../Store/action/signupActions";

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
    };
    this.validator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.continue = this.continue.bind(this);
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
    if (!this.props.signup.phone)
    {
      this.props.history.push("/register/verify-phone");
      return;
    }
  }

  setStateFromInput(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  continue(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { password } = this.state;
      this.props.setPassword(password);
      if (this.props.signup.accountType === "BUYER")
        this.props.history.push("/register/buyer");
      else
        this.props.history.push("/register/seller");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { t } = this.props;
    const {
      password,
      confirmPassword
    } = this.state;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="CREATE AN ACCOUNT" />
        <section className="password-form section-padding-strict mb-5">
          <div className="container">
            <p className="text-center">Please put your password!</p>
            <form action="/" id="signup-form">
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
                  {this.validator.message("password", password, `required`)}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.setStateFromInput}
                  className="form-control"
                  placeholder={t("auth_confirm_password_placeholder")}
                  required
                />
                <div className="text-danger">
                  {this.validator.message(
                    "confirmPassword",
                    confirmPassword,
                    `required|in:${password}`,
                    {
                      messages: {
                        in: t("auth_confirm_password_validation_error"),
                      },
                    }
                  )}
                </div>
              </div>
              <div className="form-group text-center">
                <button
                  type="submit"
                  onClick={this.continue}
                  className="btn btn-primary"
                >
                  {t("auth_continue")}
                </button>
              </div>
            </form>
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
    setPassword: (data) => dispatch(SetPassword(data)),
  };
};
export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(PasswordForm);
