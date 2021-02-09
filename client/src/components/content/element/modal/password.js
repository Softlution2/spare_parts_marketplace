import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

const noAction = (e) => e.preventDefault();
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

  setStateFromInput(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  continue(e) {
    noAction(e);
    if (this.validator.allValid()) {
      axios.post("/api/users/update-password", { method: this.props.method, identity: this.props.identity, password: this.state.password })
      .then((res) => {
        this.props.goNext();
      }).catch((err) => {
        console.log(err);
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    let { password, confirmPassword } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <h2 className="welcome">Forgot your password?</h2>
        <p className="text-center mt-3">
          {/* {t("auth_please_fill_password")} */}
          Please enter a new password to access your account.
        </p>
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
                {this.validator.message(
                  "password",
                  password,
                  `required`
                )}
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
                {messages: {in: t("auth_confirm_password_validation_error")}}
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => this.props.goPrev()}
            className="btn btn-continue  mr-2"
          >
            {t("auth_previous")}
          </button>
          <button
            type="submit"
            onClick={this.continue}
            className="btn btn-continue"
          >
            {t("auth_continue")}
          </button>
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(PasswordForm);
