import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import {
  SetSellingAuthStep,
  SetSellingAuthPassword,
} from "../../../Store/action/sellingAction";
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
    let { password } = this.props.selling;
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
      this.props.setAuthStep(3);
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
        <form action="/">
          <div className="form-group">
            <input 
              type="password"
              name="password"
              value={password || ""}
              onChange={this.setStateFromInput}
              className="form-control"
              placeholder={t("auth_pasword_placeholder")}
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
              value={confirmPassword || ""}
              onChange={this.setStateFromInput}
              className="form-control"
              placeholder={t("auth_confirm_pasword_placeholder")}
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
            onClick={(e) => this.props.setAuthStep(1)}
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
    selling: state.selling,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    setPassword: (data) => dispatch(SetSellingAuthPassword(data)),
    setAuthStep: (step) => dispatch(SetSellingAuthStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(PasswordForm);
