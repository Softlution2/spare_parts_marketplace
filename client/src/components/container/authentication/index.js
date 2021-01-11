import React, { Component } from "react";
import { connect } from "react-redux";

import CheckMethod from "./check-method";
import AuthVerification from "./auth-verification";
import PasswordForm from "./password";
import DetailsForm from "./details-form";
import LogoForm from "./logo-form";

class Authentication extends Component {
  render() {
    let { authStep } = this.props.selling;
    return (
      <div className="selling-auth-form">
        {authStep === 0 && (
          <CheckMethod />
        )}
        {authStep === 1 && (
          <AuthVerification />
        )}
        {authStep === 2 && (
          <PasswordForm />
        )}
        {authStep === 3 && (
          <DetailsForm />
        )}
        {authStep === 4 && (
          <LogoForm />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selling: state.selling,
  };
};
export default connect(mapStateToProps)(Authentication);
