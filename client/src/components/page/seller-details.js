import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import moment from "moment";

import { PageBanner } from "../content/element/page-banner";
import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import SellerListingGrid from "../content/element/card/seller-listing-grid";


const noAction = e => e.preventDefault();

class SellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      seller: null,
      sellerListings: [],
    };
  }
  
  componentDidMount() {
    this.setState({loading: true});
    axios.get("/api/users/get-seller?id=" + this.props.match.params.id)
      .then((res) => {
        const { seller, sellerListings } = res.data;
        this.setState({ seller, sellerListings }, () => {
          this.setState({ loading: false });
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <Fragment>
        {/* Header section start */}
        <PreHeader />
        <Header />
        {/* Header section end */}
        <PageBanner title="Seller Details" />
        <section className="author-info-area section-padding-strict section-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="atbd_auhor_profile_area">
                  <div className="atbd_author_avatar">
                    {
                      !this.state.seller ? ( <Skeleton circle={true} width={120} height={120} /> )
                        : (
                          <img
                            src={this.state.seller.avatar || "/assets/img/avatar.png"}
                            width={120}
                            height={120}
                            alt="AuthorImage"
                          />
                        )
                    }
                    
                    {/*  */}
                    <div className="atbd_auth_nd">
                      <h2>{this.state.seller ? this.state.seller.details.company_name : <Skeleton width={150} height={30} /> }</h2>
                      <p>{this.state.seller ? `Registered in ${moment(this.state.seller.date).format("MMM YYYY")}` : <Skeleton width={150} height={30} /> }</p>
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
                      { this.state.seller ? <><span>{this.state.sellerListings.length}</span> Listings</> : <Skeleton width={50} height={30} /> }
                    </p>
                  </div>
                  {/*<!-- ends: .atbd_author_meta -->*/}
                </div>
                {/*<!-- ends: .atbd_auhor_profile_area -->*/}
              </div>
  
              {/* <!-- ends: .col-lg-12 --> */}
              <div className="col-lg-8 col-md-7 m-bottom-30">
                <div className="atbd_author_module">
                  <div className="atbd_content_module">
                    <div className="atbd_content_module__tittle_area">
                      <div className="atbd_area_title">
                        <h4>
                          <span className="la la-user"></span>About Seller
                        </h4>
                      </div>
                    </div>
                    <div className="atbdb_content_module_contents">
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa kequi officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusan tium doloremque laudantium, totam rem
                        aperiam the eaque ipsa quae abillo was inventore veritatis
                        keret quasi aperiam architecto beatae vitae dicta sunt
                        explicabo. Nemo ucxqui officia voluptatem accusantium
                        doloremque laudan tium, totam rem ape dicta sunt
                        explicabo. Nemo enim ipsam voluptatem quia voluptas.
                        <br /> <br />
                        Nemo enim ipsam voluptatem quia voluptas cupidatat non
                        proident, sunt culpa qui officia dese runt mollit anim id
                        est laborum. Sedu perspi sunt explicabo. Nemo ucxqui
                        officia voluptatem hscia unde omnis proident.
                      </p>
                    </div>
                  </div>
                </div>
                {/*<!-- ends: .atbd_author_module -->*/}
              </div>
              {/*<!-- ends: .col-md-8 -->*/}
              <div className="col-lg-4 col-md-5 m-bottom-30">
                <div className="widget atbd_widget widget-card">
                  <div className="atbd_widget_title">
                    <h4>
                      <span className="la la-phone"></span>Contact Info
                    </h4>
                  </div>
                  {/*<!-- ends: .atbd_widget_title -->*/}
                  <div className="widget-body atbd_author_info_widget">
                    <div className="atbd_widget_contact_info">
                      {
                        !this.state.seller ? (
                          <Skeleton count={4} height={30}></Skeleton>
                        ) : (
                        <ul>
                          <li>
                            <span className="la la-map-marker"></span>
                            <span className="atbd_info">
                              { this.state.seller.details.company_address }
                            </span>
                          </li>
                          <li>
                            <span className="la la-phone"></span>
                            <span className="atbd_info">{formatPhoneNumberIntl("+" + this.state.seller.phone)}</span>
                          </li>
                          <li>
                            <span className="la la-envelope"></span>
                            <span className="atbd_info">{this.state.seller.email}</span>
                          </li>
                        </ul>
                        )
                      }
                    </div>
                    {/*<!-- ends: .atbd_widget_contact_info -->*/}
                    <div className="atbd_social_wrap">
                      <p>
                        <NavLink to="/at_demo" onClick={noAction}>
                          <span className="fab fa-facebook-f"></span>
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="/at_demo" onClick={noAction}>
                          <span className="fab fa-twitter"></span>
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="/at_demo" onClick={noAction}>
                          <span className="fab fa-google-plus-g"></span>
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="/at_demo" onClick={noAction}>
                          <span className="fab fa-linkedin-in"></span>
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="/at_demo" onClick={noAction}>
                          <span className="fab fa-dribbble"></span>
                        </NavLink>
                      </p>
                    </div>
                    {/*<!-- ends: .atbd_social_wrap -->*/}
                  </div>
                  {/*<!-- ends: .widget-body -->*/}
                </div>
                {/*<!-- ends: .widget -->*/}
              </div>
              {/*<!-- ends: .col-lg-4 -->*/}
  
              <div className="col-lg-12">
                <div className="atbd_author_listings_area m-bottom-30">
                  <h1>Author Listings</h1>
                </div>
                <div className="row">
                  <SellerListingGrid
                    isLoading={this.state.loading}
                    listings={this.state.sellerListings}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
  
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};
export default connect(mapStateToProps)(SellerDetails);
