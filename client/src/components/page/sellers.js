import React, { Fragment } from "react";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { connect } from "react-redux";

const Sellers = (props) => {
  return (
    <Fragment>
      {/* Header section start */}
      <PreHeader />
      <Header />
      {/* Header section end */}
      <PageBanner title="Seller List" />
      <section className="seller-area section-padding-strict section-bg pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="atbd_auhor_profile_area">
                <div className="atbd_author_avatar">
                  <img src="./assets/img/author-profile.jpg" alt="AuthorImage" />
                  <div className="atbd_auth_nd">
                    <h2>Kenneth Frazier</h2>
                    <p>Joined in March 2019</p>
                  </div>
                </div>
                {/*<!-- ends: .atbd_author_avatar -->*/}
                <div className="atbd_author_meta">
                  <div className="atbd_listing_meta">
                    <span className="atbd_meta atbd_listing_rating">
                      4.5 <i className="la la-star"></i>
                    </span>
                    <p className="meta-info">
                      <span>22</span>Reviews
                    </p>
                  </div>
                  <p className="meta-info">
                    <span>15</span>Listings
                  </p>
                </div>
                {/*<!-- ends: .atbd_author_meta -->*/}
              </div>
              {/*<!-- ends: .atbd_auhor_profile_area -->*/}
            </div>
            <div className="col-md-12">
              <div className="atbd_auhor_profile_area">
                <div className="atbd_author_avatar">
                  <img src="./assets/img/author-profile.jpg" alt="AuthorImage" />
                  <div className="atbd_auth_nd">
                    <h2>Kenneth Frazier</h2>
                    <p>Joined in March 2019</p>
                  </div>
                </div>
                {/*<!-- ends: .atbd_author_avatar -->*/}
                <div className="atbd_author_meta">
                  <div className="atbd_listing_meta">
                    <span className="atbd_meta atbd_listing_rating">
                      4.5 <i className="la la-star"></i>
                    </span>
                    <p className="meta-info">
                      <span>22</span>Reviews
                    </p>
                  </div>
                  <p className="meta-info">
                    <span>15</span>Listings
                  </p>
                </div>
                {/*<!-- ends: .atbd_author_meta -->*/}
              </div>
              {/*<!-- ends: .atbd_auhor_profile_area -->*/}
            </div>
            <div className="col-md-12">
              <div className="atbd_auhor_profile_area">
                <div className="atbd_author_avatar">
                  <img src="./assets/img/author-profile.jpg" alt="AuthorImage" />
                  <div className="atbd_auth_nd">
                    <h2>Kenneth Frazier</h2>
                    <p>Joined in March 2019</p>
                  </div>
                </div>
                {/*<!-- ends: .atbd_author_avatar -->*/}
                <div className="atbd_author_meta">
                  <div className="atbd_listing_meta">
                    <span className="atbd_meta atbd_listing_rating">
                      4.5 <i className="la la-star"></i>
                    </span>
                    <p className="meta-info">
                      <span>22</span>Reviews
                    </p>
                  </div>
                  <p className="meta-info">
                    <span>15</span>Listings
                  </p>
                </div>
                {/*<!-- ends: .atbd_author_meta -->*/}
              </div>
              {/*<!-- ends: .atbd_auhor_profile_area -->*/}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};
export default connect(mapStateToProps)(Sellers);
