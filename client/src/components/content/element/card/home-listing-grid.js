import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import StarRatingComponent from 'react-star-rating-component';

import { GetHomeListing, AddToCart } from "../../../../Store/action/listingActions";

import { numberWithCommas, stringToUrl } from "../../../../utils";
const skeletonNumbers = [1, 2, 3, 4];

const ListingSkeleton = () => {
  return skeletonNumbers.map((val) => {
    return (
      <div className="col-lg-6 col-xl-3 col-sm-6 col-md-4" key={val}>
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
  });
};

class HomeListingGrid extends Component {
  componentDidMount() {
    this.props.getHomeListing();
  }
  render() {
    const setting = {
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    const listings = this.props.list.homeListing;
    const { isLoading } = this.props.list;
    return (
      <Fragment>
        {isLoading ? (
          <ListingSkeleton />
        ) : (
          <Slider {...setting}>
          {
          listings.map((value, index) => {
            const { pic, partName, partSKU, price, _id, date } = value;
            const title = `${partName}`;
            const badge =
              moment.duration(moment().diff(moment(date))).asHours() <= 48
                ? "new listing"
                : "";
            const link =
              stringToUrl(partName) + "-" + stringToUrl(partSKU);
            return (
              <div key={index}>
                <div className="listing-card-grid">
                  <div className="atbd_single_listing ">
                    <article className="atbd_single_listing_wrapper">
                      <figure className="atbd_listing_thumbnail_area">
                        <div className="atbd_listing_image">
                          <NavLink to={`/spare-part-details/${link}`}>
                            <img src={`${pic}`} alt="Listing" />
                          </NavLink>
                        </div>
                        <div className="atbd_thumbnail_overlay_content">
                          <ul className="atbd_upper_badge">
                            <li>
                              <span
                                className={
                                  "text-capitalize atbd_badge atbd_badge_" +
                                  badge.replace(" ", "_")
                                }
                              >
                                {badge}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </figure>
                      <div className="atbd_listing_info">
                        <h4 className="atbd_listing_title mb-2">
                          <NavLink to={`/spare-part-details/${link}`}>
                            {title}
                          </NavLink>
                        </h4>
                        <div className="rating-group">
                          <div className="d-flex">
                            <StarRatingComponent 
                              name="rate2" 
                              editing={false}
                              renderStarIcon={() => ( <i className='la la-star' /> )}
                              renderStarIconHalf={() => ( <i className="la la-star-half-alt" style={{color: "#ffb400"}} /> )}
                              starColor="#ffb400"
                              emptyStarColor={"#cecece"}
                              starCount={5}
                              value={3.5}
                            />
                            <span className="rating-value">3.5</span>
                          </div>
                          <span className="review-value text-muted">760</span>
                        </div>
                        <div className="price-group">
                          <p className="symbol mr-1">
                            AED<span className="price">{numberWithCommas(price)}</span>
                          </p>
                          <button className="btn cart-btn" onClick={(e) => this.props.addToCart(_id)}>
                            Add
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            );
          })
          }
          </Slider>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getHomeListing: () => dispatch(GetHomeListing()),
    addToCart: (data) => dispatch(AddToCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(HomeListingGrid);
