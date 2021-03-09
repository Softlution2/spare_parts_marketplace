import React, { Fragment, Component } from "react";
// import Moment from 'react-moment';
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";

import BuyerOrder from "../content/element/my-order/buyer-order"
import SellerOrder from "../content/element/my-order/seller-order"

import { connect } from "react-redux";


class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { login } = this.props;
    
    return (
      <Fragment>
        <PreHeader />
        <Header className="menu--light" />
          {
            login?.role === "BUYER" ? (
              <BuyerOrder />
            ) :
            login?.role === "SELLER" && (
              <SellerOrder />
            )
          }
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(MyOrder);
