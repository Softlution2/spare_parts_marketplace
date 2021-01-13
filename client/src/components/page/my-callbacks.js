import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink } from "react-router-dom";
import axios from "axios";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import {formatPhoneNumberIntl} from 'react-phone-number-input'
import { stringToUrl } from "../../utils";

class MyCallbacks extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        callbackList: [],
    }
  }

  componentDidMount() {
    axios.get("/api/listing/get-callbacks?user_id=" + this.props.login._id)
    .then((res) => {
        this.setState({callbackList: res.data.list});
    })
    .catch((err) => {
        console.log(err);
    });
  }
  
  render() {
    const { isLoading, callbackList } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <LoadingOverlay
          active={isLoading}
          spinner
          text={t("loading_listing")}
        >
          <PreHeader />
          <Header class="menu--light" />
          <PageBanner title="My Callbacks" />
          <section className="listing-cards mt-5">
            <div className="container">
              <div className="row">
                <div className="listing-cards-wrapper col-lg-12">
                  <div className="row">
                    {callbackList.length > 0 ? (
                        callbackList.map((call, index) => {
                            const link =
                              "buy-parts-" +
                              stringToUrl(call.listing.make) +
                              "-" +
                              stringToUrl(call.listing.model) +
                              "-" +
                              stringToUrl(call.listing.year) +
                              "-" +
                              stringToUrl(call.listing.version) +
                              "-" +
                              stringToUrl(call.listing.user_id.location) +
                              "-" +
                              call.listing.reference_code;
                            return (
                                <div className="col-lg-3 col-sm-6" key={index}>
                                    <div className="atbd_single_listing">
                                        <article className="atbd_single_listing_wrapper">
                                            <figure className="atbd_listing_thumbnail_area">
                                                <div className="atbd_listing_image">
                                                <NavLink to={`/listing-details/${link}`}>
                                                    <img
                                                    src={`${call.listing.featured_photo}`}
                                                    alt="listingimage"
                                                    />
                                                </NavLink>
                                                </div>
                                            </figure>
                                            <div className="atbd_listing_info">
                                                <h4 className="atbd_listing_title">
                                                    <a href="/listing-details/buy-car-bmw-x3-2003-i-(e83)-russia-federation-moscow-45962fd5">
                                                        {`${call.listing.make} ${call.listing.model} ${call.listing.year}`}
                                                    </a>
                                                </h4>
                                                <div className="listing-meta mt-3">
                                                    <p className="w-100">
                                                      <span className="font-weight-bolder text-primary mr-2">Name:</span>{call.name}
                                                    </p>
                                                    <p className="w-100">
                                                      <span className="font-weight-bolder text-primary mr-2">Phone:</span>
                                                      {formatPhoneNumberIntl("+" + call.phone)}
                                                      <a href={`tel: ${formatPhoneNumberIntl("+" + call.phone)}`} className="text-primary ml-2"><i className="la la-phone"></i></a>
                                                      <a href={`https://api.whatsapp.com/send?phone=${call.phone}`} className="text-success ml-1"><i className="la la-whatsapp"></i></a>
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                      <div className="col-lg-12">
                        <div className="alert alert-warning" role="alert">
                        {t("data_not_found")}
                        </div>
                      </div>
                    )}
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
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(MyCallbacks);
