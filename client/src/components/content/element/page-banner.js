import React, { Component, Fragment } from "react";
export class PageBanner extends Component {
  render() {
    return (
      <Fragment>
        <section className="page-banner bgimage overlay overlay--dark">
          <div className="bg_image_holder">
            <img src={`${this.props.banner ? this.props.banner : "/assets/img/intro.jpg" }`} alt="" />
          </div>
          <div className="banner-wrapper content_above">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h1 className="page-title">{this.props.title}</h1>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
