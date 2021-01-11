import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { withTranslation } from 'react-i18next';
import {
    SetSellingAuthStep,
    SetSellingAuthMethod,
} from "../../../Store/action/sellingAction";

const noAction = (e) => e.preventDefault();
class CheckMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authType: null,
    };
    this.validator = new SimpleReactValidator();
    this.setAuthType = this.setAuthType.bind(this);
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

  setAuthType = (e, value) => {
    noAction(e);
    this.setState({ authType: value });
  };

  handleContinue = (e) => {
    noAction(e);
    let { authType } = this.state;
    this.props.setAuthMethod(authType).then((res) => {
      if (this.props.selling.authMethod) {
        this.props.setAuthStep(1);
      }
    });
  };

  handleCloseModal() {
    this.closeSignupButton.click();
  }

  render() {
    let { authType } = this.state;
    const { t } = this.props;
    return (
        <React.Fragment>
        <div className="auth-types">
            <div
            className={`type-item ${
                authType === "email" ? "active" : ""
            }`}
            onClick={(e) => this.setAuthType(e, "email")}
            >
            <i className="la la-envelope" />
            {t("auth_email")}
            </div>
            <div
            className={`type-item ${
              authType === "phone" ? "active" : ""
            }`}
            onClick={(e) => this.setAuthType(e, "phone")}
            >
            <i className="la la-phone" />
            {t("auth_phone")}
            </div>
        </div>
        <button
            type="button"
            className="btn btn-continue"
            disabled={authType === null ? true : false}
            onClick={this.handleContinue}
        >
            {t("auth_continue")}
        </button>
        </React.Fragment>
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
    setAuthMethod: (method) => dispatch(SetSellingAuthMethod(method)),
    setAuthStep: (step) => dispatch(SetSellingAuthStep(step)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(CheckMethod);
