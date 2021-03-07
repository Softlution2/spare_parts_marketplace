import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";

class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.get("/api/order/get-my-order?user_id=" + this.props.login._id )
      .then((res) => {
        this.setState({orders: res.data.orders})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { isLoading } = this.props.list;
    const { t } = this.props;
    const { orders } = this.state;
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text={t("loading_listing")}>
          <PreHeader />
          <Header className="menu--light" />
          <section className="dashboard-wrapper section-bg pt-5 pb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>My Dashboard</h2>
                </div>
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
                      >Activity</a>
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
                      >Messages</a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-md-2">
                  <ul className="nav nav-pills nav-stacked">
                    <li className="active"><a href="#!">Summary</a></li>
                    <li><a href="#!">Recently viewed</a></li>
                  </ul>
                </div>
                <div className="col-md-10">
                  <div className="container-fluid">
                    <div className="dashboard-head align-items-center py-3 px-4">
                      <div className="auth-wrapper d-flex align-items-center mr-2">
                        <div className="avatar mr-2">
                          <img className="user-pic" src="/assets/img/avatar.png" alt="User" />
                        </div>
                        <h5>{this.props.login.role === "BUYER" ? this.props.login.details.owner_manager_name : this.props.login.details.company_name}</h5>
                      </div>
                      <a href="#!">My address</a>
                    </div>
                    <div className="dashboard-body p-3">
                      <p className="h5 font-weight-bold mb-2">
                        Recent orders
                      </p>
                      <div className="order-list-wrapper container">
                      {
                        orders.map((order, index) => {
                          return (
                            <div className="row order-item align-items-center border-bottom" key="index">
                              <div className="col-sm-2 order-detail-item">
                                {order.order_date}
                              </div>
                              <div className="col-sm-3 order-detail-item text-primary">
                                {order._id}
                              </div>
                              <div className="col-sm-1 order-detail-item">
                                {order.total_price}
                              </div>
                              <div className="col-sm-2 order-detail-item text-primary">
                                {order.seller.details.company_name}
                              </div>
                              <div className="col-sm-2 order-detail-item">
                                <span className="badge badge-success">{order.status}</span>
                              </div>
                              <div className="col-sm-2 order-detail-item text-primary">
                                <a href="#!">View order details</a>
                              </div>
                            </div>
                          )
                        })
                      }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </LoadingOverlay>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(MyDashboard);
