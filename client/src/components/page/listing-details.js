import React, { Fragment, Component } from "react";
import { compose } from "redux";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from "simple-react-validator";

import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import { ListingFetures } from '../content/element/listing-features';
import { SellerInfo } from '../content/element/widget';
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
    }
    this.validator = new SimpleReactValidator();
    this.getListing = this.getListing.bind(this);
  }

  getListingId() {
    const info = this.props.match.params.info.split("-");
    const refCode = info[info.length - 1];
    return refCode;
  }

  componentDidMount() {
    this.getListing(this.getListingId());
  }

  componentDidUpdate() {
    const { listing } = this.state;
    if (listing && (listing._id !== this.getListingId())) {
      this.setState({ listing: null }, () => {
        this.getListing(this.getListingId());
      });
    }
  }

  getListing(id) {
    this.props.setLoading(true);
    axios.get(`/api/listing/get?_id=${id}`)
    .then((res) => {
      const { listing } = res.data;
      let listing_user = listing.user;
      this.setState({listing, listing_user}, () => {
        this.props.setLoading(false);
      });
    })
    .catch((err) => {
      this.props.setLoading(false);
      console.log(err.response);
    });
  }

  render() {
    const { listing, listing_user } = this.state;
    const { isLoading } = this.props.list;
    const { login } = this.props;
    const { t } = this.props;
    return (
      <Fragment>
        <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading listing...'
        >
          <PreHeader />
          <Header />
          <PageBanner title="Listing Details"/>
          <section className="directory_listiing_detail_area single_area section-bg section-padding-strict pb-5">
            {
              listing && (
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">

                      <ListingFetures listing={listing} />

                      <div className="atbd_content_module atbd_listing_gallery">
                        <div className="atbd_content_module__tittle_area">
                          <div className="atbd_area_title">
                            <h4><span className="la la-image"></span>Gallery</h4>
                          </div>
                        </div>
                        <div className="atbdb_content_module_contents">
                          <div className="gallery-wrapper">
                            <img src={listing.pic} width="100%" alt="Listing Image" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="atbd_content_module atbd_listing_details">
                        <div className="atbd_content_module__tittle_area">
                          <div className="atbd_area_title">
                            <h4><span className="la la-file-text-o"></span>Description</h4>
                          </div>
                        </div>
                        <div className="atbdb_content_module_contents">
                          <p>{listing.description}</p>
                        </div>
                      </div>

                    </div>
                    <div className="col-lg-4">
                      <div className="widget atbd_widget widget-card">
                        <div className="atbd_widget_title">
                            <h4><span className="la la-user"></span>Seller Info</h4>
                        </div>
                        {/* <!-- ends: .atbd_widget_title --> */}
                        <SellerInfo seller={listing_user} postDate={getTimeSince(moment(listing.date))} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
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

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(ListingDetails);
