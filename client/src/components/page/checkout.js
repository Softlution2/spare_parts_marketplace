import React, { Fragment, Component } from "react";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

import { connect } from "react-redux";
import axios from "axios";
import { Transection } from "../content/element/transection";
import { getCartLength } from "../../utils";

import { UpdateCart } from "../../Store/action/listingActions";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      price: 45,
    };
    this.qtyDecrement = this.qtyDecrement.bind(this);
    this.qtyIncrement = this.qtyIncrement.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
  }
  componentDidMount() {
    axios.post("/api/listing/cart-listings", {listings: this.props.list.itemsInCart} )
      .then((res) => {
        this.setState({listings: res.data});
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  qtyIncrement(e, id) {
    e.preventDefault();
    const items =  this.props.list.itemsInCart;
    items.push(id);
    this.props.updateCart(items);
  }
  qtyDecrement(e, id) {
    e.preventDefault();
    const items = this.props.list.itemsInCart;
    const index = items.indexOf(id);
    if (index >= 0)
      items.splice(index, 1);
    this.props.updateCart(items);
  }
  removeCartItem(e, id) {
    e.preventDefault();
    let items = this.props.list.itemsInCart;
    items = items.filter((e) => e !== id);
    this.props.updateCart(items);
  }
  render() {
    const { listings } = this.state;
    let totalAmount = 0;
    return (
      <Fragment>
        <PreHeader />
        <Header class="menu--light" />
        <PageBanner title={"Your Cart"} />

        <section className="checkout-wrapper section-padding-strict section-bg pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="checkout-form">
                  <form action="/">
                    <div className="checkout-table table-responsive">
                      <table
                        id="directorist-checkout-table"
                        className="table table-bordered bg-white"
                      >
                        <thead>
                          <tr>
                            <th>Details</th>
                            <th>Quantity</th>
                            <th>
                              <strong>Price</strong>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            listings.length > 0 && listings.map((listing, index) => {
                              totalAmount += listing.price * getCartLength(this.props.list.itemsInCart, listing._id);
                              if (getCartLength(this.props.list.itemsInCart, listing._id) === 0) return false;
                              return (
                                <tr key={index}>
                                  <td>
                                    <h4>{listing.partName}</h4>
                                    <p className="text-muted">{listing.partSKU}</p>
                                  </td>
                                  <td>
                                    <div className="checkout-actions">
                                      <span>
                                        {getCartLength(this.props.list.itemsInCart, listing._id)}
                                      </span>
                                      <div>
                                        <div className="d-flex align-items-center">
                                          <button className="btn checkout-qty" onClick={(e) => this.qtyIncrement(e, listing._id)}>
                                            +
                                          </button>
                                          <button className="btn checkout-qty" onClick={(e) => this.qtyDecrement(e, listing._id)}>
                                            -
                                          </button>
                                        </div>
                                        <a href="#!" onClick={(e) => this.removeCartItem(e, listing._id)}>Remove</a>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{"AED " + listing.price * getCartLength(this.props.list.itemsInCart, listing._id)}</td>
                                </tr>
                              )
                            })
                          }
                          <tr>
                            <td
                              colSpan="2"
                              className="text-right vertical-middle"
                            >
                              <strong>Total amount</strong>
                            </td>
                            <td className="vertical-middle">
                              <div id="atbdp_checkout_total_amount">
                                {"AED" + totalAmount}
                              </div>
                              {/* <!--total amount will be populated by JS--> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/*<!-- ends: .checkout-table -->*/}
                  </form>
                  <Transection price={this.state.price} />
                </div>
                {/*<!-- ends: .checkout-form -->*/}
              </div>
              {/*<!-- ends: .col-lg-12 -->*/}
            </div>
          </div>
        </section>
        {/*<!-- ends: .checkout-wrapper -->*/}

        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateCart: (data) => dispatch(UpdateCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Checkout);
