import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import ListingCardGrid from "../content/element/card/card-listing-grid-fav";

import { GetMyFavorites } from "../../Store/action/listingActions";

class MyFavorites extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMyFavorites();
  }
  
  render() {
    const { isLoading, favoriteListing } = this.props.list;
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
          <PageBanner title={t("my_favorites_title")} />
          <section className="listing-cards mt-5">
            <div className="container">
              <div className="row">
                <div className="listing-cards-wrapper col-lg-12">
                  <div className="row">
                    {favoriteListing.length ? (
                      <Fragment>
                        <ListingCardGrid size={4} />
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
    getMyFavorites: () => dispatch(GetMyFavorites()),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(MyFavorites);
