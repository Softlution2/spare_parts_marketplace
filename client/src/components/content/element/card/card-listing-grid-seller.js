import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

import { SetFavouriteListing } from "../../../../Store/action/listingActions";
import { numberWithCommas, stringToUrl, getTimeSince } from "../../../../utils";

import equal from 'fast-deep-equal'

class ListingCardGrid extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    }
  }

  componentDidMount() {
    this.setState({listings: this.props.list});
  }

  componentDidUpdate() {
    if (!equal(this.props.list, this.state.listings)) {
      this.setState({listings: this.props.list});
    }
  }

  setFavouriteListing(e, id) {
    e.preventDefault();
    axios
      .post("/api/listing/set-favourite", {
        listing_id: id,
        user_id: this.props.login._id,
      })
      .then((res) => {
        const { listings } = this.state;
        let foundIndex = listings.findIndex((v) => v._id === id);
        if (foundIndex !== -1) {
          listings[foundIndex].favourite_users = res.data.favourite_users;
        }
        this.setState({listings});
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const { login, size } = this.props;
    const { listings } = this.state;
    const className = size === 3 ? "col-lg-6 col-xl-3 col-sm-6 col-md-4" : "col-lg-4 col-sm-6";
    return (
      <Fragment>
        {listings.map((value, index) => {
          const {
            featured_photo,
            make,
            model,
            year,
            version,
            mileage,
            unit,
            price,
            currency,
            transmission,
            _id,
            reference_code,
            user_id,
            favourite_users,
            date,
          } = value;
          const title = make + " " + model + " " + year + " " + version;
          const badge = moment.duration(moment().diff(moment(date))).asHours() <= 48 ? "new listing" : "";
          const link =
            "buy-parts-" +
            stringToUrl(make) +
            "-" +
            stringToUrl(model) +
            "-" +
            stringToUrl(year) +
            "-" +
            stringToUrl(version) +
            "-" +
            // stringToUrl(user_id.location) +
            // "-" +
            reference_code;
          
          return (
            <div className={className} key={index}>
              <div className="atbd_single_listing ">
                <article className="atbd_single_listing_wrapper">
                  <figure className="atbd_listing_thumbnail_area">
                    <div className="atbd_listing_image">
                      <NavLink to={`/listing-details/${link}`}>
                        <img
                          src={`${featured_photo}`}
                          alt="listingimage"
                        />
                      </NavLink>
                    </div>
                    <div className="atbd_author atbd_author--thumb">
                      <a
                        href=" "
                        onClick={(e) => this.setFavouriteListing(e, _id)}
                        className={
                          login && favourite_users.includes(login._id)
                            ? "active"
                            : ""
                        }
                        data-tip
                        data-for='loginWarning'
                      >
                        <i className="la-heart la"></i>
                      </a>
                      {
                        !login && (
                          <ReactTooltip id='loginWarning' type='error' effect='solid'>
                            <span>Please login first</span>
                          </ReactTooltip>
                        )
                      }
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
                      <NavLink to={`/listing-details/${link}`}>{title}</NavLink>
                    </h4>
                    <div className="price-group">
                      <span className="price">{numberWithCommas(price)}</span>
                      <span className="symbol mr-1">{currency}</span>
                    </div>
                    <div className="vehicle-group">
                      <span className="mileage">
                        {numberWithCommas(mileage)}{unit === 'Kilometers' ? 'Km' : "M"}
                      </span>
                      <span className="transmission">{transmission}</span>
                    </div>
                    <div className="listing-meta">
                      <p>
                        <i className="la la-map-marker"></i>
                        {/* {user_id.location} */}
                      </p>
                      <p>
                        <i className="la la-calendar"></i>
                        {getTimeSince(new Date(date))} ago
                      </p>
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
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setFavouriteListing: (e, id) => dispatch(SetFavouriteListing(e, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ListingCardGrid);
