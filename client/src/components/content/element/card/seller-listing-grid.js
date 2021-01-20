import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import { GetHomeListing } from "../../../../Store/action/listingActions";

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

class SellerListingGrid extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    const { isLoading, listings } = this.props;
    return (
      <Fragment>
        {isLoading ? (
          <ListingSkeleton />
        ) : (
          listings.map((value, index) => {
            const { pic, partName, partSKU, price, _id, date } = value;
            const title = `${partName}`;
            const badge =
              moment.duration(moment().diff(moment(date))).asHours() <= 48
                ? "new listing"
                : "";
            const link =
              stringToUrl(partName) + "-" + stringToUrl(partSKU) + "-" + _id;
            return (
              <div className="col-lg-6 col-xl-3 col-sm-6 col-md-4" key={index}>
                <div className="atbd_single_listing ">
                  <article className="atbd_single_listing_wrapper">
                    <figure className="atbd_listing_thumbnail_area">
                      <div className="atbd_listing_image">
                        <NavLink to={`/buy-spare-parts/${link}`}>
                          <img src={`${pic}`} alt="Listing Image" />
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
                      <h4 className="atbd_listing_title">
                        <NavLink to={`/buy-spare-parts/${link}`}>
                          {title}
                        </NavLink>
                      </h4>
                      <div className="price-group">
                        <span className="symbol mr-1">AED</span>
                        <span className="price">{numberWithCommas(price)}</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            );
          })
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
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(SellerListingGrid);