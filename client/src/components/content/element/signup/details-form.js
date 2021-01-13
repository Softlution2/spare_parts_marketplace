import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import { SetDetails, SetSignupStep } from "../../../../Store/action/signupActions";
import SimpleReactValidator from "simple-react-validator";

const noAction = (e) => e.preventDefault();
class DetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
    };
    this.validator = new SimpleReactValidator();
    this.setStateFromInput = this.setStateFromInput.bind(this);
    this.continue = this.continue.bind(this);
  }

  componentDidMount() {
    let { name, location } = this.props.signup;
    this.setState({name: name, location: location});
  }

  setStateFromInput(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  continue(e) {
    noAction(e);
    if (this.validator.allValid()) {
      this.props.setDetails({name: this.state.name, location: this.state.location});
      this.props.setSignupStep(4);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    let { name, location } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <h2 className="welcome">{t("auth_welcome")}</h2>
        <p className="text-center mt-3">
          {t("auth_give_us_some_details")}
        </p>
        <form action="/" id="signup-form">
          <div className="form-group">
            <input 
              type="text"
              name="name"
              value={name}
              onChange={this.setStateFromInput}
              className="form-control"
              placeholder={t("auth_name_placeholder")}
              required
              />
              <div className="text-danger">
                {this.validator.message(
                  "name",
                  name,
                  `required`
                )}
              </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.setStateFromInput}
              className="form-control"
              placeholder={t("auth_location_placeholder")}
              required
            />
            <div className="text-danger">
              {this.validator.message(
                "location",
                location,
                `required`
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => this.props.setSignupStep(2)}
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
    setDetails: (data) => dispatch(SetDetails(data)),
    setSignupStep: (step) => dispatch(SetSignupStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(DetailsForm);
