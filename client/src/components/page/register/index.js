import React, { Fragment, Component } from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { compose } from "redux";

import Header from "../../layout/header";
import PreHeader from "../../layout/pre-header";
import Footer from "../../layout/footer";
import { PageBanner } from "../../content/element/page-banner";
import { SetAccountType } from "../../../Store/action/signupActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setAccountType = this.setAccountType.bind(this);
  }

  setAccountType(e, type) {
    e.preventDefault();
    this.props.setAccountType(type);
    this.props.history.push("/register/verify-email");
  }

  render() {
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="CREATE AN ACCOUNT" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="registration-page">
                <section className="register-by-seller">
                  <h2>REGISTER AS A BUYER</h2>
                  <p>
                    You are looking for car spare parts to purchase. Please continue and create a buyer account below. You will then be able to make your orders online. 
                  </p>
                  <button onClick={(e) => this.setAccountType(e, "BUYER")} className="btn btn-primary">BUYER REGISTRATION</button>
                </section>
                <div className="separator-line">
                  <span>or</span>
                </div>
                <section className="register-by-buyer">
                  <h2>REGISTER AS A SELLER</h2>
                  <p>
                  You are looking to sell car spare parts and get new buyers? Please follow the steps after. One of our agent will get in contact with you to process your registration. 
                  </p>
                  <button onClick={(e) => this.setAccountType(e, "SELLER")} className="btn btn-outline-primary">SELLER REGISTRATION</button>
                </section>
              </div>
            </div>
          </div>
        </div>
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
    setAccountType: (data) => dispatch(SetAccountType(data)),
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(Register);
