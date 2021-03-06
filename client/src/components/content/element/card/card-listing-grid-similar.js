import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

import { AddToCart, SetFavouriteListing } from "../../../../Store/action/listingActions";
import { numberWithCommas, stringToUrl } from "../../../../utils";

class CardListingGridSimilar extends Component {
  render() {
    const { size, listings } = this.props;
    const { isLoading } = this.props.list;
    const className = size === 3 ? "col-lg-6 col-xl-3 col-sm-6 col-md-4" : "col-lg-4 col-sm-6";
    return (
      <Fragment>
        { !isLoading && listings && listings.map((value, index) => {
          const {
            pic,
            partName,
            partSKU,
            price,
            _id,
            date,
          } = value;
          const title = `${partName}`;
          const badge = moment.duration(moment().diff(moment(date))).asHours() <= 48 ? "new listing" : "";
          const link =
            stringToUrl(partName) +
            "-" +
            stringToUrl(partSKU);
          return (
            <div className={className} key={index}>
              <div className="atbd_single_listing ">
                <article className="atbd_single_listing_wrapper">
                  <figure className="atbd_listing_thumbnail_area">
                    <div className="atbd_listing_image">
                      <NavLink to={`/spare-part-details/${link}`}>
                        <img
                          src={`${pic}`}
                          alt="Listing"
                        />
                      </NavLink>
                    </div>
                    <div className="atbd_thumbnail_overlay_content">
                      <ul className="atbd_upper_badge">
                        <li>
                          <span
                            className={
                              "text-capitalize atbd_badge atbd_badge_" + badge.replace(" ", "_")
                            }
                          >
                            {badge}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </figure>
                  <div className="atbd_listing_info">
                    <h4 className="atbd_listing_title">
                      <NavLink to={`/spare-part-details/${link}`}>{title}</NavLink>
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
          );
        })}
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
    setFavouriteListing: (e, id) => dispatch(SetFavouriteListing(e, id)),
    addToCart: (data) => dispatch(AddToCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(CardListingGridSimilar);
