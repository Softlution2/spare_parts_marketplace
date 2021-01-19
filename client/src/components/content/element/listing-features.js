import React, { Component, Fragment } from "react";

export class ListingFetures extends Component {
  render() {
    const { listing } = this.props;
    return (
      <Fragment>
        <div className="atbd_content_module atbd_listing_features">
          <div className="atbd_content_module__tittle_area">
            <div className="atbd_area_title">
              <h4>
                <span className="la la-list-alt"></span>Details
              </h4>
            </div>
          </div>
          <div className="atbdb_content_module_contents">
            <ul className="atbd_custom_fields features-table">
              {/* <!--  get data from custom field--> */}
              <li>
                <div className="atbd_custom_field_title">
                  <p>Name: </p>
                </div>
                <div className="atbd_custom_field_content">
                  <p>{listing.partName}</p>
                </div>
              </li>
              <li>
                <div className="atbd_custom_field_title">
                  <p>Price:</p>
                </div>
                <div className="atbd_custom_field_content">
                  <p>{listing.price} AED</p>
                </div>
              </li>
              <li>
                <div className="atbd_custom_field_title">
                  <p>Brand:</p>
                </div>
                <div className="atbd_custom_field_content">
                  <p>{listing.partBrand}</p>
                </div>
              </li>
              <li>
                <div className="atbd_custom_field_title">
                  <p>Category:</p>
                </div>
                <div className="atbd_custom_field_content">
                  <p>{listing.category}</p>
                </div>
              </li>
              <li>
                <div className="atbd_custom_field_title">
                  <p>Sub Category:</p>
                </div>
                <div className="atbd_custom_field_content">
                  <p>{listing.subCategory}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
