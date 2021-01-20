import React, { Fragment, Component } from "react";
import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import moment from "moment";

const SkeletonComponent = () => {
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push(
      <div className="col-md-12" key={i}>
        <div className="atbd_auhor_profile_area">
          <div className="atbd_author_avatar">
            <Skeleton circle width={120} height={120}></Skeleton>
            <div className="atbd_auth_nd">
              <h2>
                <Skeleton width={180} height={30}></Skeleton>
              </h2>
              <p>
                <Skeleton width={180} height={25}></Skeleton>
              </p>
            </div>
          </div>
          <div className="atbd_author_meta">
            <div className="atbd_listing_meta">
              <Skeleton width={150} height={50}></Skeleton>
            </div>
            <p className="meta-info">
              <Skeleton width={50} height={50}></Skeleton>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return rows;
};

class Sellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerList: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/api/users/get-seller-list")
      .then((res) => {
        this.setState({ sellerList: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
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
              {this.state.loading && <SkeletonComponent />}
              {!this.state.loading &&
                this.state.sellerList.length > 0 &&
                this.state.sellerList.map((seller, index) => {
                  return (
                    <div className="col-md-12" key={index}>
                      <div className="atbd_auhor_profile_area">
                        <div className="atbd_author_avatar">
                          <img
                            src={
                              seller.avatar || "/assets/img/author-profile.jpg"
                            }
                            alt="AuthorImage"
                          />
                          <div className="atbd_auth_nd">
                            <h2>{seller.details.company_name}</h2>
                            <p>
                              Joined in {moment(seller.date).format("MMM YYYY")}
                            </p>
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
                            <span>{seller.listings.length}</span>Listings
                          </p>
                        </div>
                        {/*<!-- ends: .atbd_author_meta -->*/}
                      </div>
                      {/*<!-- ends: .atbd_auhor_profile_area -->*/}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps)(Sellers);
