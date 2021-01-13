import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import { SetPassword, SetSignupStep } from "../../../../Store/action/signupActions";
import SimpleReactValidator from "simple-react-validator";

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

  componentDidMount() {
    let { password } = this.props.signup;
    this.setState({password});
  }

  setStateFromInput(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  continue(e) {
    noAction(e);
    if (this.validator.allValid()) {
      const {password} = this.state;
      this.props.setPassword(password);
      this.props.setSignupStep(3);
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
        <h2 className="welcome">{t("auth_welcome")}</h2>
        <p className="text-center mt-3">
          {t("auth_please_fill_password")}
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
            onClick={(e) => this.props.setSignupStep(1)}
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
        <p className="footer-text">
          By doing this, i agree to{" "}
          <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
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
    setPassword: (data) => dispatch(SetPassword(data)),
    setSignupStep: (step) => dispatch(SetSignupStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(PasswordForm);
