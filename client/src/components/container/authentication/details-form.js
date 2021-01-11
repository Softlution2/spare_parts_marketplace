import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { withTranslation } from 'react-i18next';
import {
  SetSellingAuthStep,
  SetSellingAuthDetails,
} from "../../../Store/action/sellingAction";

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
    let { authDetails } = this.props.selling;
    this.setState({name: authDetails.name, location: authDetails.location});
  }

  setStateFromInput(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  continue(e) {
    noAction(e);
    if (this.validator.allValid()) {
      this.props.setSellingAuthDetails({name: this.state.name, location: this.state.location});
      this.props.setAuthStep(4);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    let {name, location} = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <form action="/">
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
    setSellingAuthDetails: (data) => dispatch(SetSellingAuthDetails(data)),
    setAuthStep: (step) => dispatch(SetSellingAuthStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(DetailsForm);
