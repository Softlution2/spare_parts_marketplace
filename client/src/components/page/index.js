import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next'

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import AdvSearch from "../content/element/advance-search";
import HomeListingGrid from "../content/element/card/home-listing-grid";
import Promise from "../content/element/promise";
import BrowseByCategory from "../content/element/browse-by-category";
import BrowseByMake from "../content/element/browse-by-make";
import Newsletter from "../content/element/newsletter";
import Footer from "../layout/footer";

class Index extends Component {
  componentDidMount() {
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
              title={`${t("home_spare_parts_best_sellers_title")}`}
              content={`${t("home_spare_parts_best_sellers_desc")}`}
            />
            <div className="row">
              <div className="listing-cards-wrapper col-lg-12">
                <div className="row">
                  <HomeListingGrid size={3} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Listing section end */}

        {/* Browse By Type section start */}
        <section className="browse-category-wrapper section-padding">
          <div className="container">
            <SectionTitle
              title={t("home_browse_by_category_title")} 
              content={t("home_browse_by_category_content")} 
            />
            <BrowseByCategory />
          </div>
        </section>
        {/* Browse By Type section end */}
        
        {/* Browse By Make section start */}
        <section className="browse-category-wrapper section-padding">
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

        {/* Newsletter section start */}
        <section className="newsletter section-padding">
          <div className="container">
            <SectionTitle
              title="NEWSLETTER"
              content="And benefit from our special offers"
            />
            <div className="row">
              <Newsletter />
            </div>
          </div>
        </section>
        {/* Newsletter section end */}
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
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProp), withTranslation())(Index);
