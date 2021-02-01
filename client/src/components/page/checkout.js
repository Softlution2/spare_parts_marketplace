import React, { Fragment, Component } from "react";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

import { connect } from "react-redux";
import axios from "axios";
import { Transection } from "../content/element/transection";
import { getCartLength } from "../../utils";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      price: 45,
    };
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
  render() {
    const {listings} = this.state;
    let totalAmount = 0;
    return (
      <Fragment>
        <PreHeader />
        <Header class="menu--light" />
        <PageBanner title={"Checkout"} />

        <section className="checkout-wrapper section-padding-strict section-bg pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="checkout-form">
                  <form action="/">
                    <div className="checkout-table table-responsive">
                      <table
                        id="directorist-checkout-table"
                        className="table table-bordered"
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
                              return (
                                <tr key={index}>
                                  <td>
                                    <h4>{listing.partName}</h4>
                                    <p className="text-muted">{listing.partSKU}</p>
                                  </td>
                                  <td>
                                    <span>
                                      {getCartLength(this.props.list.itemsInCart, listing._id)}
                                    </span>
                                    <div>
                                      <button className="btn checkout-qty">
                                        +
                                      </button>
                                      <button className="btn checkout-qty">
                                        -
                                      </button>
                                    </div>
                                    
                                  </td>
                                  <td>{"AED " + listing.price}</td>
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

export default connect(mapStateToProps)(Checkout);