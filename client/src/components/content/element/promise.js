import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

class Promise extends Component {
  render() {
    const { iconColor, t } = this.props;
    return (
      <Fragment>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/assured-${
                  iconColor === "blue" ? "blue-" : ""
                }1.png`}
              ></img>
            </div>
            <div className="title mt-2">
              OEM AND AFTERMARKET <br />CAR SPARE PARTS
            </div>
            <div className="message mt-2">
              AT THE BEST PRICE
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/assured-${
                  iconColor === "blue" ? "blue-" : ""
                }3.png`}
              ></img>
            </div>
            <div className="title mt-2">
              20+ CAR PARTS <br />EXPERTS
            </div>
            <div className="message mt-2">
              AT YOUR SERVICE
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/assured-${
                  iconColor === "blue" ? "blue-" : ""
                }2.png`}
              ></img>
            </div>
            <div className="title mt-2">
              THE LARGEST PARTS<br /> CATALOG
            </div>
            <div className="message mt-2">
              IN THE UAE MARKET
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/assured-${
                  iconColor === "blue" ? "blue-" : ""
                }2.png`}
              ></img>
            </div>
            <div className="title mt-2">
              FASTEST DELIVERY <br />OPTIONS
            </div>
            <div className="message mt-2">
              ALL AROUND UAE
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(Promise);
