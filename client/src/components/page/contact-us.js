import React, { Fragment, Component } from "react";
import { withTranslation } from 'react-i18next';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title={t("contact_title")} />
        <section className="section-padding-strict contact-cards">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <i className="la la-map-marker"></i>
                    <h3 className="mb-4">Visit US</h3>
                    <p>BuyParts24</p>
                    <p>Dubai</p>
                    <p>United Arab Emirates</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <i className="la la-phone"></i>
                    <h3 className="mb-4 mt-2">Contact Us</h3>
                    <p>Office: +971 24 24 24 24</p>
                    <p>Email: sparepartsmarketplace email</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <i className="la la-laptop"></i>
                    <h3 className="mb-4">Opening Hours</h3>
                    <p>Monday to Friday: 9am to 6pm</p>
                    <p>Saturday & Sunday: 10am to 6pm</p>
                    <p>Excluding Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding-strict">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form className="contact-form">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>{t("contact_form_your_name")}*</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="col-md-6">
                      <label>{t("contact_form_your_email")}*</label>
                      <input className="form-control" type="email" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>{t("contact_form_your_mobile")}*</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="col-md-6">
                      <label>{t("contact_form_contact_mode")}*</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="mobileMode" value="Mobile Number" />
                          <label className="form-check-label" htmlFor="mobileMode">{t("contact_form_mobile_number")}</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="emailMode" value="Email Address" />
                          <label className="form-check-label" htmlFor="emailMode">{t("contact_form_email_address")}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>REASON OF ENQUIRY</label>
                      <select className="form-control">
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Complaint">Complaint</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t("contact_form_your_message")}</label>
                    <textarea className="form-control" rows="5"></textarea>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-primary btn-md btn-block" type="submit">{t("contact_form_send")}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default withTranslation()(ContactUs);
