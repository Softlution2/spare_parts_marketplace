import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";

class Promise extends Component {
  render() {
    return (
      <Fragment>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/icon1.png`}
                alt="promise"
              ></img>
            </div>
            <div className="title mt-2">
              OEM AND AFTERMARKET <br />CAR SPARE PARTS
            </div>
            <div className="message">
              AT THE BEST PRICE
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/icon2.png`}
                alt="promise"
              ></img>
            </div>
            <div className="title mt-2">
              20+ CAR PARTS <br />EXPERTS
            </div>
            <div className="message">
              AT YOUR SERVICE
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/icon3.png`}
                alt="promise"
              ></img>
            </div>
            <div className="title mt-2">
              THE LARGEST PARTS<br /> CATALOG
            </div>
            <div className="message">
              IN THE UAE MARKET
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="item">
            <div className="icon-img">
              <img
                src={`/assets/img/icons/icon4.png`}
                alt="promise"
              ></img>
            </div>
            <div className="title mt-2">
              FASTEST DELIVERY <br />OPTIONS
            </div>
            <div className="message">
              ALL AROUND UAE
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(Promise);
