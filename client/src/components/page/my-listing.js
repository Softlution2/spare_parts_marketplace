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
          <section className="listing-cards mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="atbd_listing_action_toolbar">
                    <div className="dropdown dropdown-right">
                      <a
                        className="action-btn dropdown-toggle"
                        href=" "
                        role="button"
                        id="dropdownMenuLink2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Sort by:{" "}
                        <span className="sort-name">Recommended</span>
                        <span className="caret"></span>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink2"
                      >
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="a-z"
                        >
                          Recommended
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="z-a"
                        >
                          Lowest Price
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="new"
                        >
                          Highest Price
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="old"
                        >
                          Lowest Mileage
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="low"
                        >
                          Highest Mileage
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="heigh"
                        >
                          New to Old
                        </a>
                      </div>
                    </div>

                    <div className="dropdown dropdown-right">
                      <a
                        className="action-btn dropdown-toggle"
                        href=" "
                        role="button"
                        id="dropdownMenuLink2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Location:{" "}
                        <span className="sort-name">All Cities</span>{" "}
                        <span className="caret"></span>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink2"
                      >
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="a-z"
                        >
                          A to Z ( title )
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="z-a"
                        >
                          Z to A ( title )
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="new"
                        >
                          Latest listings
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="old"
                        >
                          Oldest listings
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="low"
                        >
                          Price ( low to high )
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sorting}
                          href="heigh"
                        >
                          Price ( high to low )
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row">
                {listing.length ? (
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
