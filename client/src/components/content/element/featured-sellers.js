import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ListingSkeleton = () => {
  const rows = [];
  for (let i = 0 ; i < 4 ; i ++) {
    rows.push(
      <div className="col-lg-6 col-xl-3 col-sm-6 col-md-4" key={i}>
        <div className="atbd_single_listing ">
          <article className="atbd_single_listing_wrapper">
            <figure className="atbd_listing_thumbnail_area">
              <div className="atbd_listing_image">
                <Skeleton height={200} />
              </div>
              <div className="atbd_thumbnail_overlay_content">
                <ul className="atbd_upper_badge">
                  <li>
                    <Skeleton />
                  </li>
                </ul>
              </div>
            </figure>
            <div className="atbd_listing_info">
              <h4 className="atbd_listing_title">
                <Skeleton />
              </h4>
              <div className="price-group">
                <Skeleton />
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
  return rows;
};

class FeaturedSellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      featuredSellers: {},
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/api/listing/get-featured-sellers")
      .then((res) => {
        // console.log(res.data);return;
        this.setState({ isLoading: false, featuredSellers: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { featuredSellers, isLoading } = this.state;
    const { t } = this.props;
    if (isLoading) {
      return ( <ListingSkeleton /> );
    }
    return (
      <Fragment>
        {featuredSellers.length > 0 && featuredSellers.map((seller, index) => {
          return (
            <div className="col-lg-6 col-xl-3 col-sm-6 col-md-4" key={index}>
              <div className="atbd_single_listing ">
                <article className="atbd_single_listing_wrapper">
                  <figure className="atbd_listing_thumbnail_area" style={{height: "150px", padding: "1rem 1rem 0 1rem"}}>
                    <div className="atbd_listing_image text-center" style={{height: '100%'}}>
                      <NavLink to={``}>
                        <img src={seller.avatar || "/assets/img/avatar.png"} alt="Seller Image" style={{height: "100%", objectFit: "contain"}} />
                      </NavLink>
                    </div>
                  </figure>
                  <div className="atbd_listing_info text-center" style={{border: 0}}>
                    <h4 className="atbd_listing_title mb-2" style={{fontSize: "1.2rem"}}>
                      <NavLink to="">{seller.details.company_name}</NavLink>
                    </h4>
                    <p className="my-0 font-weight-bold">
                      <i className="la la-map-marker"></i>
                      { seller.details.emirate }
                    </p>
                    <p className="text-muted small my-0 font-weight-bold">
                      {seller.listings.length} spare parts for sale
                    </p>
                    <div className="d-flex justify-content-center mt-2">
                      <span className="author-rating mr-0">
                        4.5<i className="la la-star"></i>
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default withTranslation()(FeaturedSellers);
