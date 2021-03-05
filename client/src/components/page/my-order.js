import React, { Fragment, Component } from "react";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import Modal from "react-awesome-modal";

import { connect } from "react-redux";
import axios from "axios";
import { getCartLength } from "../../utils";
import AddressModal from "../content/element/modal/address-modal";
import PaymentMethodModal from "../content/element/modal/payment-method-modal";

import { UpdateCart } from "../../Store/action/listingActions";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.get("/api/order/get-my-order?user_id=" + this.props.login._id )
      .then((res) => {
        this.setState({orders: res.data})
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { orders } = this.state;
    
    return (
      <Fragment>
        <PreHeader />
        <Header className="menu--light" />

        <section className="order-list-wrapper section-padding-strict section-bg pb-5">
          <div className="container">

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
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateCart: (data) => dispatch(UpdateCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Checkout);
