import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import LogIn from "../../content/element/modal/signIn";
import Register from "../../content/element/modal/signUp";
const noAction = (e) => e.preventDefault();

class Footer extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <footer className="footer-three footer-grey p-top-60">
          <div className="footer-top p-bottom-25">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="widget widget_pages">
                    <h2 className="widget-title"> Spare Parts Marketplace</h2>
                    <ul className="list-unstyled">
                      <li className="page-item">
                        <NavLink to="/about-us">{t("footer_menu_about_us")}</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/contact">{t("footer_menu_contact_us")}</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/faqs">{t("footer_menu_faq")}</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/terms">{t("footer_menu_terms")}</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/privacy">
                        {t("footer_menu_privacy_policy")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* ends: .col-lg-3 */}
                
                <div className="col-lg-4 col-sm-6">
                  <div className="widget widget_social">
                    <h2 className="widget-title">{t("footer_connect_us")}</h2>
                    <ul className="list-unstyled social-list">
                      <li>
                        <a href="mailto:support@mycar.africa">
                          <span className="mail">
                            <i className="la la-envelope" />
                          </span>{" "}
                          Contact
                        </a>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/twitter">
                          <span className="twitter">
                            <i className="fab fa-twitter" />
                          </span>{" "}
                          Twitter
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/facebook">
                          <span className="facebook">
                            <i className="fab fa-facebook-f" />
                          </span>{" "}
                          Facebook
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/instagram">
                          <span className="instagram">
                            <i className="fab fa-instagram" />
                          </span>{" "}
                          Instagram
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/gplus">
                          <span className="gplus">
                            <i className="fab fa-google-plus-g" />
                          </span>{" "}
                          Google+
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  {/* ends: .widget */}
                </div>
                {/* ends: .col-lg-3 */}
                <div className="col-lg-4 col-sm-6">
                  <div className="widget widget_text">
                    <h2 className="widget-title">Spare Parts Marketplace</h2>
                    <div className="textwidget">
                      <p>
                        {t("footer_description")}
                      </p>
                    </div>
                  </div>
                  {/* ends: .widget */}
                </div>
                {/* ends: .col-lg-3 */}
              </div>
            </div>
          </div>
          {/* ends: .footer-top */}
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer-bottom--content">
                    <NavLink to="/" className="footer-logo">
                      <img
                        src="/assets/img/logo.svg"
                        alt="logoImage"
                        width="200"
                      />
                    </NavLink>
                    <p className="m-0 copy-text">
                    © 2021 Spare Parts Marketplace. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ends: .footer-bottom */}
        </footer>
        {/* ends: .footer */}
        <Register />
        <LogIn />
      </Fragment>
    );
  }
}

export default withTranslation()(Footer);
