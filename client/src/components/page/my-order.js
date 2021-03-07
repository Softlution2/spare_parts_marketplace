import React, { Fragment, Component } from "react";
import Moment from 'react-moment';
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";

import { connect } from "react-redux";
import axios from "axios";


class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.get("/api/order/get-my-order?user_id=" + this.props.login._id )
      .then((res) => {
        console.log(res.data.orders)
        this.setState({orders: res.data.orders})
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { orders } = this.state;
    console.log(orders)
    return (
      <Fragment>
        <PreHeader />
        <Header className="menu--light" />

        <section className="order-wrapper section-padding-strict section-bg pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>Your Account <i className="las la-angle-right"></i> Your Order</p>
                <h2 className="mb-4">Your Order</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="container-fluid order-tab">
                  <ul className="nav nav-tabs" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                      className="nav-link active"
                      id="all-orders"
                      data-mdb-toggle="tab"
                      href="#all-orders"
                      role="tab"
                      aria-controls="all-orders"
                      aria-selected="true"
                      >All</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                      className="nav-link"
                      id="ex1-tab-2"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-2"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected="false"
                      >In progress</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                      className="nav-link"
                      id="ex1-tab-3"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-3"
                      role="tab"
                      aria-controls="ex1-tabs-3"
                      aria-selected="false"
                      >Delivered</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                      className="nav-link"
                      id="ex1-tab-3"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-3"
                      role="tab"
                      aria-controls="ex1-tabs-3"
                      aria-selected="false"
                      >Cancelled</a>
                    </li>
                  </ul>
                  <form className="navbar-form navbar-left">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <p className="py-4 d-flex align-items-center">
                  <b>3 Orders placed in </b>
                  <select className="ml-2 p-2 border-0">
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>All</option>
                  </select>
                </p>
              </div>
              <div className="col-lg-12">
                <div className="order-list-wrapper">
                {
                  orders.length > 0 && orders.map((order, orderIndex) => {
                    return (
                      <div className="order container-fluid" key={orderIndex}>
                        <div className="order-head row">
                          <div className="head-item">
                            <p className="head-text">
                              Order placed
                            </p>                            
                            <Moment format="YYYY/MM/DD">
                              {order.order_date}
                            </Moment>
                          </div>
                          <div className="head-item">
                            <p className="head-text">
                              Order number
                            </p>
                            {order._id}
                          </div>
                          <div className="head-item">								
                            <p className="head-text">
                              Total
                            </p>
                            {order.total_price}
                          </div>
                          <div className="head-item">
                            <p className="head-text">
                              Seller
                            </p>
                            {order.seller.details.company_name}
                          </div>
                          <div className="head-item">
                            <p className="head-text">
                              Delivery to
                            </p>
                            {order.delivery_address.address}
                          </div>							
                          <div className="head-item">
                            <button type="button" className="btn btn-outline-primary btn-sm mr-1">Contact seller</button>
                            <button type="button" className="btn btn-outline-primary btn-sm">View order details</button>
                          </div>
                        </div>
                        <div className="order-body row">
                          <div className="order-listing-item-wrapper col-lg-7 mb-2">
                          {
                            order.listings.length > 0 && order.listings.map((listing, listingIndex) => {
                              return (
                                <div className="order-listing-item p-2 border-bottom" key={listingIndex}>
                                  <div className="listing-pic">
                                    <img src={listing.pic} alt="EDGE" />
                                  </div>
                                  <div className="listing-title">
                                    <h6>{listing.partName}</h6>
                                    <p>Item SKU {listing.partSKU}</p>
                                  </div>
                                  <div className="listing-amount">
                                    1 <span className="price-per-item text-danger font-weight-bold">X {listing.price}</span>
                                  </div>
                                  <div className="listing-total-amount">
                                    {listing.price}
                                  </div>
                                </div>
                              )
                            })
                          }								
                          </div>
                          <div className="col-lg-5">
                            <div className="order-detail">
                              <span className="badge badge-success"><i className="las la-check-circle"></i> Delivered</span>
                              <span className="datetime">Delivered on 6 Dec. 2020</span>
                              <span className="detail-text">Your package was left at or near the front door</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                </div>
              </div>
            </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(MyOrder);
