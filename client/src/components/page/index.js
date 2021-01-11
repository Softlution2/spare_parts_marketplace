import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next'

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import AdvSearch from "../content/element/advance-search";
import CardListingGrid from "../content/element/card/card-listing-grid";
import HowItWorks from "../content/element/how-it-works";
import Promise from "../content/element/promise";
import BrowseByType from "../content/element/carousel/browse-by-type";
import BrowseByMake from "../content/element/carousel/browse-by-make";
import Footer from "../layout/footer";

import { GetAllListing } from "../../Store/action/listingActions";
import { getCountryCode } from "../../utils";

class Index extends Component {
  componentDidMount() {
    this.props.getAllListing();
  }
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <section className="intro-wrapper bgimage overlay overlay--dark">
          <div className="bg_image_holder">
            <img src="/assets/img/intro.jpg" alt="" />
          </div>
          <AdvSearch />
        </section>

        {/* Promise section start */}
        <section className="promise-wrapper">
          <div className="container">
            <SectionTitle title={`MYCAR.AFRICA ${t("home_promise")}`} />
            <div className="row">
              <Promise />
            </div>
          </div>
        </section>
        {/* Promise section end */}

        {/* Listing section start */}
        <section className="listing-cards section-padding">
          <div className="container">
            <SectionTitle
              title={`${t("home_latest_cars_title")} ${getCountryCode().country}`}
              content={`${t("home_latest_cars_description")} ${getCountryCode().country}`}
            />
            <div className="row">
              <div className="listing-cards-wrapper col-lg-12">
                <div className="row">
                  <CardListingGrid size={4} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Listing section end */}

        {/* How It Works section start */}
        <section className="how-it-works-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_how_it_works_title")}
              content={t("home_how_it_works_description")}
            />
            <div className="row">
              <HowItWorks />
            </div>
          </div>
        </section>
        {/* How It Works section end */}

        {/* Browse By Type section start */}
        <section className="browse-type-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_browse_by_type_title")} 
              content={t("home_browse_by_type_content")} 
            />
            <div className="row">
              <BrowseByType />
            </div>
          </div>
        </section>
        {/* Browse By Type section end */}
        
        {/* Browse By Make section start */}
        <section className="browse-type-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_browse_by_make_title")} 
              content={t("home_browse_by_make_content")} 
            />
            <div className="row">
              <BrowseByMake />
            </div>
          </div>
        </section>
        {/* Browse By Make section end */}

        <Footer />
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
    getAllListing: () => dispatch(GetAllListing()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProp), withTranslation())(Index);
