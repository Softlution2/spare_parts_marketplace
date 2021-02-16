import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import BuyerProfile from "../content/element/my-profile/buyer-profile";
import SellerProfile from "../content/element/my-profile/seller-profile";

class AuthProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="My Profile" />
        <section className="author-info-area section-padding-strict section-bg">
          <div className="container">
            {
              this.props.login.role === "BUYER" ? (
                <BuyerProfile />
              ) : (
                <SellerProfile />
              )
            }
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(AuthProfile);
