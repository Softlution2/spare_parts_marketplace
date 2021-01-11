import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

class Thankyou extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Thank you!"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">

            </div>
            <div className="col-lg-8">
              <img src="/assets/img/thankyou.jpg" width="100%" />
              <div className="thankyou-text text-center mt-5">
                <h2>YOUR CAR IS NOW LISTED ON MYCAR.AFRICA.</h2>
                <p>Share your listing with your friends on social medias to sell it faster!</p>
              </div>
              <div className="text-center">
                <NavLink to="/my-listing" className="btn btn-outline-primary">
                  See My Listing
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Thankyou;
