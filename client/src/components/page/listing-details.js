import React, { Fragment, Component } from "react";
import { compose } from "redux";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
// import { PageBanner } from "../content/element/page-banner";
import { BreadcrumbCategory } from "../content/element/breadcrumb";
import { ListingFetures } from "../content/element/listing-features";
import { SellerInfo } from "../content/element/widget";
// import VehicleFeatures from "../content/element/vehicle-features";
// import Gallery from "../content/element/carousel/gallery";
// import CardListingGrid from "../content/element/card/card-listing-grid-similar";
// import { SellerDescription } from "../content/element/seller-description";
// import CallbackDetails from "../content/element/modal/callback-details";

import { SetLoading } from "../../Store/action/listingActions";
import { SetActiveRoom, Initialize } from "../../Store/action/chatActions";
import { getTimeSince } from "../../utils";

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      listing_user: null,
    };
    this.validator = new SimpleReactValidator();
    this.getListing = this.getListing.bind(this);
  }

  getListingSKU() {
    const info = this.props.match.params.info.split("-");
    const sku = info[info.length - 1];
    return sku;
  }

  componentDidMount() {
    this.getListing(this.getListingSKU());
  }

  componentDidUpdate() {
    const { listing } = this.state;
    if (listing && listing.partSKU.toLowerCase() !== this.getListingSKU()) {
      this.setState({ listing: null }, () => {
        this.getListing(this.getListingSKU());
      });
    }
  }

  getListing(sku) {
    this.props.setLoading(true);
    axios
      .get(`/api/listing/get?sku=${sku}`)
      .then((res) => {
        const { listing } = res.data;
        let listing_user = listing.user;
        this.setState({ listing, listing_user }, () => {
          this.props.setLoading(false);
        });
      })
      .catch((err) => {
        this.props.setLoading(false);
        console.log(err);
      });
  }

  render() {
    const { listing, listing_user } = this.state;
    const { isLoading } = this.props.list;
    const { t } = this.props;
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text="Loading listing...">
          <PreHeader />
          <Header />
          <BreadcrumbCategory
            title={listing ? listing.partName : ""}
            category={listing ? listing.category : ""}
            subCategory={listing ? listing.subCategory : ""}
          />
          {/* <PageBanner title="Listing Details"/> */}
          <section className="directory_listiing_detail_area single_area section-bg section-padding-strict pb-5">
            {listing && (
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-5 px-5">
                      <h1>{listing.partName}</h1>
                      <h1 className="text-primary">{listing.price}AED</h1>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="atbd_content_module atbd_listing_gallery">
                      <div className="atbdb_content_module_contents">
                        <div className="gallery-wrapper">
                          <img
                            src={listing.pic}
                            width="100%"
                            alt="Listing Image"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="atbd_content_module atbd_listing_details">
                      <div className="atbd_content_module__tittle_area">
                        <div className="atbd_area_title">
                          <h4>
                            <span className="la la-file-text-o"></span>
                            Description
                          </h4>
                        </div>
                      </div>
                      <div className="atbdb_content_module_contents">
                        <div dangerouslySetInnerHTML={{ __html: listing.description }} />
                      </div>
                    </div>

                    <ListingFetures listing={listing} />
                  </div>
                  <div className="col-lg-4">
                    <div className="widget atbd_widget widget-card">
                      <div className="atbd_widget_title">
                        <button className="btn btn-primary btn-block">
                          ADD TO CART
                        </button>
                        <h4>
                          <span className="la la-user"></span>Seller Info
                        </h4>
                      </div>
                      {/* <!-- ends: .atbd_widget_title --> */}
                      <SellerInfo
                        seller={listing_user}
                        postDate={getTimeSince(moment(listing.date))}
                      />
                    </div>

                    <div className="atbd_widget_contact">
                      {listing_user.phone && (
                        <>
                          <a
                            href={`tel: ${listing_user.phone}`}
                            className="btn btn-primary btn-block"
                          >
                            <i className="la la-phone" />
                            {formatPhoneNumberIntl("+" + listing_user.phone)}
                          </a>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${listing_user.phone}`}
                            className="btn btn-success btn-block"
                            target="blank"
                          >
                            <i className="la la-whatsapp" />
                            Contact on Whatsapp
                          </a>
                        </>
                      )}
                      {this.props.login && (
                        <button
                          className="btn btn-block btn-outline-primary"
                          disabled={
                            this.props.login._id === listing_user._id
                              ? true
                              : false
                          }
                        >
                          <i className="lab la-rocketchat" />
                          Start Chat
                        </button>
                      )}
                      {this.props.login && (
                        <button
                          className="btn btn-block btn-outline-light"
                          disabled={
                            this.props.login._id === listing_user._id
                              ? true
                              : false
                          }
                          style={{ borderColor: "#7a82a6", color: "#7a82a6" }}
                        >
                          Request Seller to Call Back
                        </button>
                      )}
                    </div>
                    <div className="atbd_widget_social_icons mt-5">
                      <p className="text-center">Share it with friends</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <a
                          target="_blank"
                          href={`https://www.facebook/com/sharer/sharer.php?u=${window.location.href}`}
                          className="mr-2"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/facebook.png"
                            alt="facebook"
                          ></img>
                        </a>
                        <a target="_blank" href={``} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/linkedin.png"
                            alt="linkedin"
                          ></img>
                        </a>
                        <a target="_blank" href={``} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/messenger.png"
                            alt="messenger"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          href={`viber://pa?chatURI=${window.location.href}&text=Share`}
                          className="mr-2"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/phone.png"
                            alt="phone"
                          ></img>
                        </a>
                        <a target="_blank" href={``} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/telegram.png"
                            alt="telegram"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                          className="mr-2"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/twitter.png"
                            alt="twitter"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          href={`whatsapp://send?text=${window.location.href}`}
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/whatsapp.png"
                            alt="whatsapp"
                          ></img>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  return {
    setLoading: (data) => dispatch(SetLoading(data)),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(ListingDetails);
