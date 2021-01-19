import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import CookieConsent from "react-cookie-consent";
import LogIn from "../../content/element/modal/signIn";

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
                <div className="col-lg-3 col-sm-6">
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
                
                <div className="col-lg-3 col-sm-6">
                  <div className="widget widget_social">
                    <h2 className="widget-title">{t("footer_connect_us")}</h2>
                    <ul className="list-unstyled social-list">
                      <li>
                        <a href="mailto:support@mycar.africa">
                          <span>
                            <img src="/assets/img/footer_social_icons/whatsapp.png" width="30" />
                          </span>
                          Whatsapp
                        </a>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/twitter">
                          <span>
                            <img src="/assets/img/footer_social_icons/facebook.png" width="30" />
                          </span>
                          Facebook
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/facebook">
                          <span>
                            <img src="/assets/img/footer_social_icons/instagram.png" width="30" />
                          </span>
                          Instagram
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/instagram">
                          <span>
                            <img src="/assets/img/footer_social_icons/twitter.png" width="30" />
                          </span>
                          Twitter
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/gplus">
                          <span>
                            <img src="/assets/img/footer_social_icons/telegram.png" width="30" />
                          </span>
                          Telegram
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={noAction} to="/gplus">
                          <span>
                            <img src="/assets/img/footer_social_icons/wechat.png" width="30" />
                          </span>
                          Wechat
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  {/* ends: .widget */}
                </div>
                
                {/* ends: .col-lg-3 */}
                <div className="col-lg-3 col-sm-6">
                <div className="widget widget_pages">
                    <h2 className="widget-title">Sections</h2>
                    <ul className="list-unstyled">
                      <li className="page-item">
                        <NavLink to="/how-it-works">How it Works</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/buy-parts">Buy Parts</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/faqs">Become a Buyer</NavLink>
                      </li>
                      <li className="page-item">
                        <NavLink to="/terms">Become a Seller</NavLink>
                      </li>
                    </ul>
                  </div>
                  {/* ends: .widget */}
                </div>
                {/* ends: .col-lg-3 */}
                
                <div className="col-lg-3 col-sm-6">
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
        
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          buttonClasses="accept-btn"
          containerClasses="cookie-message"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          expires={150}
        >
          The cookie settings on this website are set to 'allow all cookies' to give you the very best experience.
          Please click Accept Cookies to continue to use the site
        </CookieConsent>
        {/* ends: .footer */}
        <LogIn />
      </Fragment>
    );
  }
}

export default withTranslation()(Footer);
