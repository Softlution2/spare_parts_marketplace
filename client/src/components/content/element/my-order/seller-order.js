import React, { Fragment, Component } from "react";

import { connect } from "react-redux";
import axios from "axios";


class SellerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.get("/api/order/get-seller-order?user_id=" + this.props.login._id )
      .then((res) => {
        this.setState({orders: res.data.orders})
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { orders } = this.state;
    const { login } = this.props
    return (
      <Fragment>

        <section className="order-wrapper section-padding-strict section-bg pb-5">
          <div className="container seller-container">
            <div className="row">
              <div className="col-lg-12">
                <p>Your Account <i className="las la-angle-right"></i> Your Order</p>
                <h2 className="mb-4">Your Order</h2>
              </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                     <p>You have 1 pending orders.</p>
                </div>
                <div className="col-lg-4">
                    <div className="order-item">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title d-flex align-items-center">
                                    <div className="atbd_author_avatar mr-1">
                                        <img src="assets/img/avatar.png" alt={login.details.company_name} width={37} height={37} />
                                    </div>
                                    <div className="company-name w-75">{login.details.company_name}</div>
                                    <div className="price">$25.99</div>
                                </h5>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="order-listing-item d-inline-block p-2 border">
                                            <img src="assets/img/avatar.png" alt="Test" width={75} height={75} />
                                            <span className="badge rounded-circle badge-pill badge-info p-0">x2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end p-2 border-top">
                                <a href="#!" className="btn btn-outline-primary btn-sm mr-1">View order</a>
                                <a href="#!" className="btn btn-primary btn-sm">Mark as 'Preparing'</a>
                            </div>
                        </div>
                    </div>
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
                      >Pending</a>
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
                      >Preparing</a>
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
                      >In transit</a>
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
                    <li className="nav-item" role="presentation">
                      <a
                      className="nav-link"
                      id="ex1-tab-3"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-3"
                      role="tab"
                      aria-controls="ex1-tabs-3"
                      aria-selected="false"
                      >Issue</a>
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
                <div className="order-list-wrapper">
                    <table className="table bg-white">
                        <thead className="thead-light">
                            <tr className="order-list-head">
                                <th className="head-item">
                                    ID
                                </th>
                                <th className="head-item">
                                    Order by
                                </th>
                                <th className="head-item">
                                    Pick up or delivery
                                </th>
                                <th className="head-item">
                                    Collection or shipping details
                                </th>
                                <th className="head-item">
                                    Order date
                                </th>
                                <th className="head-item">
                                    Item
                                </th>
                                <th className="head-item">
                                    Cost
                                </th>
                                <th className="head-item">
                                    Status
                                </th>
                                <th className="head-item">
                                    Action
                                </th>
                            </tr>                        
                        </thead>
                        <tbody>
                        {
                            orders.length > 0 && orders.map((order, orderIndex) => {
                                return (
                                    <tr key={orderIndex}>
                                        <td>
                                            {order._id}
                                        </td>
                                        <td>
                                            {order.user.owner_manager_name}
                                        </td>
                                        <td>
                                            {order.delivery_option ? "Delivery" : "Pickup"}
                                        </td>
                                        <td>
                                            {order.delivery_address.address}
                                        </td>
                                        <td>
                                            {order.order_date}
                                        </td>
                                        <td className="d-flex order-listings-wrapper">
                                        {
                                            order.listings.map((listing, listingIndex) => {
                                                if (listingIndex < 1)
                                                    return (
                                                        <div className="listing-item d-inline-block p-1 border rounded-circle" key={listingIndex}>
                                                            <img src={listing.pic} width={17} height={17} alt={listing.partName} />
                                                        </div>
                                                    )
                                                if (order.listings.length > 1)
                                                    return (
                                                        <span className="badge badge-light rounded-circle border p-1" key={listingIndex}>
                                                            +{order.listings.length}
                                                        </span>
                                                    )
                                            })

                                        }
                                        </td>                                        
                                        <td>
                                            {order.total_price}
                                        </td>
                                        <td>
                                            {order.status}
                                        </td>
                                        <td>
                                            <a href="#!">View</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }	
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </section>

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

export default connect(mapStateToProps, mapDispatchToProp)(SellerOrder);
