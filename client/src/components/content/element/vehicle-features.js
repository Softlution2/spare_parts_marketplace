import React, { Component, Fragment } from "react";

import { numberWithCommas } from "../../../utils";

class VehicleFeatures extends Component {
  render() {
    const {details} = this.props;
    return (
      <Fragment>
        <div className="atbd_content_module atbd_listing_features">
          <div className="atbd_content_module__tittle_area">
            <div className="atbd_area_title">
              <h4>
                <span className="la la-list-alt"></span>Features
              </h4>
            </div>
          </div>
          <div className="atbdb_content_module_contents">
            <div className="vehicle-info-group">
              <div className="vehicle-info-item">
                <span className="key">BRAND</span>
                <span className="value">{details.make}</span>
              </div>
              <div className="vehicle-info-item">
                <span className="key">MODEL</span>
                <span className="value">{details.model}</span>
              </div>
              <div className="vehicle-info-item">
                <span className="key">MANUFACTURED</span>
                <span className="value">{details.year}</span>
              </div>
              <div className="vehicle-info-item">
                <span className="key">TRANSMISSION</span>
                <span className="value">{details.transmission}</span>
              </div>
              <div className="vehicle-info-item">
                <span className="key">CURRENT COLOR</span>
                <span className="value">{details.color}</span>
              </div>
              <div className="vehicle-info-item">
                <span className="key">CURRENT MILEAGE</span>
                <span className="value">{numberWithCommas(details.mileage)}&nbsp;{details.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleFeatures;
