import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next'
import CookieConsent, { Cookies } from "react-cookie-consent";

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import AdvSearch from "../content/element/advance-search";
import CardListingGrid from "../content/element/card/card-listing-grid";
import HowItWorks from "../content/element/how-it-works";
import Promise from "../content/element/promise";
import BrowseByCategory from "../content/element/browse-by-category";
import BrowseByMake from "../content/element/carousel/browse-by-make";
import Newsletter from "../content/element/newsletter";
import Footer from "../layout/footer";

import { GetAllListing } from "../../Store/action/listingActions";

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
        <section className="browse-type-wrapper section-padding mb-5">
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

        {/* Promise section start */}
        <section className="promise-wrapper">
          <div className="container">
            <div className="row">
              <Promise />
            </div>
          </div>
        </section>
        {/* Promise section end */}

        {/* Newsletter section start */}
        <section className="newsletter section-padding">
          <div className="container">
            <SectionTitle
              title="Subscribe to our news letter"
              content="And benefit from our special offers"
            />
            <div className="row">
              <Newsletter />
            </div>
          </div>
        </section>
        {/* Newsletter section end */}
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          buttonClasses="accept-btn"
          containerClasses="cookie-message"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          expires={150}
        >
          The cookie settings on this website are set to 'allow all cookies' to give you the very best experience.
          Please click Accept Cookies to continue to use the site
        </CookieConsent>
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
