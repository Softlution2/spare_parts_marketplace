import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import ListingCardGrid from "../content/element/card/card-listing-grid";

import { GetMyListings } from "../../Store/action/listingActions";

class MyListing extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMyListing();
  }

  render() {
    const { isLoading, listing } = this.props.list;
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
          <PageBanner title={t("my_listings_title")} />
          <section className="listing-cards mt-5 mb-5">
            <div className="container">
              <div className="row">
                {listing.length ? (
                  <Fragment>
                    <ListingCardGrid size={3} />
                  </Fragment>
                ) : (
                  <div className="col-lg-12">
                    <div className="alert alert-warning" role="alert">
                      {t("data_not_found")}
                    </div>
                  </div>
                )}
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
    getMyListing: () => dispatch(GetMyListings()),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(MyListing);
