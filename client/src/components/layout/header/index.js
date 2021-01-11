import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { CrossStorageClient } from "cross-storage";
import { withTranslation } from 'react-i18next'
import equal from 'fast-deep-equal'
import NavItem from "../navbar/navItem";

import { LogOut } from "../../../Store/action/logoutAction";
import { LogInAc } from "../../../Store/action/loginActions";
import { getDomain } from "../../../utils";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const logOut = (e) => {
      e.preventDefault();
      this.props.logOutdata(null);
      window.location.href= "/";
    };
    const { t } = this.props;

    return (
      <section className="mainmenu-wrapper">
        <div className="menu-area menu--light">
          <div className="top-menu-area">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="menu-fullwidth">
                    <div className="logo-wrapper order-lg-0 order-sm-1">
                      <div className="logo logo-top">
                        <NavLink to="/">
                          <img
                            src="/assets/img/logo.png"
                            alt="logoImage"
                            className="img-fluid"
                            width="200"
                          />
                        </NavLink>
                      </div>
                    </div>
                    {/*<!-- ends: .logo-wrapper -->*/}
                    <div className="menu-container order-lg-1 order-sm-0">
                      <div className="d_menu">
                        <nav className="navbar navbar-expand-lg mainmenu__menu">
                          <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#direo-navbar-collapse"
                            aria-controls="direo-navbar-collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <span className="navbar-toggler-icon icon-menu">
                              <i className="la la-reorder"></i>
                            </span>
                          </button>
                          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                          <div
                            className="collapse navbar-collapse"
                            id="direo-navbar-collapse"
                          >
                            <NavItem />
                          </div>
                          {/*<!-- /.navbar-collapse -->*/}
                        </nav>
                      </div>
                    </div>
                    <div className="menu-right order-lg-2 order-sm-2">
                      {/*<!-- start .author-area -->*/}
                      <div className="author-area">
                        <div className="author__access_area">
                          {this.props.login === null && (
                            <ul className="d-flex list-unstyled align-items-center">
                              <li>
                                <a
                                  href=" "
                                  className="access-link"
                                  data-toggle="modal"
                                  data-target="#login_modal"
                                >
                                  {t("login")}
                                </a>
                                <span>{t("or")}</span>
                                <a
                                  href=" "
                                  className="access-link"
                                  data-toggle="modal"
                                  data-target="#signup_modal"
                                >
                                  {t("register")}
                                </a>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                      {/*<!-- end .author-area -->*/}
                      {
                        this.props.login !== null && (
                          <div className={"offcanvas-menu"}>
                            <a href="#!" className="offcanvas-menu__user">
                              { this.props.chat.unreadMsgCnt > 0 && ( <span className="badge unread-msg">{this.props.chat.unreadMsgCnt}</span> ) }
                              <i className="la la-bars"></i>
                              { 
                                this.props.login.avatar ? (
                                  <img
                                    src={`${this.props.login.avatar}`}
                                    alt="AvatarImage"
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                  />
                                ) : (
                                  <i className="la la-user"></i>
                                )
                              }
                            </a>
                            <div className="offcanvas-menu__contents">
                              <a href=" " className="offcanvas-menu__close">
                                <i className="la la-times-circle"></i>
                              </a>
                              <div className="author-avatar">
                              {
                                this.props.login.avatar ? (
                                  <img
                                    src={`${this.props.login.avatar}`}
                                    alt="AvatarImage"
                                    className="rounded-circle"
                                  />
                                ) : (
                                  <img
                                    className="rounded-circle"
                                    src={`/assets/img/avatar.png`}
                                    alt="AvatarImage"
                                  />
                                )
                              }
                              <span className="text-primary font-weight-bold d-inline-block w-100">{this.props.login.name}</span>
                              </div>
                              <ul className="list-unstyled">
                                <li>
                                  <NavLink to="/my-profile">{t("menu_my_profile")}</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/my-listing">{t("menu_my_listings")}</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/chats" className="d-flex align-items-center">{t("menu_my_messages")}
                                    { this.props.chat.unreadMsgCnt > 0 && ( <span className="badge unread-msg badge-primary ml-2">{this.props.chat.unreadMsgCnt}</span> ) }
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/my-favorites">{t("menu_my_favorites")}</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/my-callbacks">{t("menu_my_callbacks")}</NavLink>
                                </li>
                                <li>
                                  <NavLink to="/sell-your-car">{t("menu_add_listing")}</NavLink>
                                </li>
                                <li>
                                  <NavLink to=" " onClick={logOut}>{t("menu_signout")}</NavLink>
                                </li>
                              </ul>
                            </div>
                            {/*<!-- ends: .author-info -->*/}
                          </div>
                        )
                      }
                    </div>
                    {/*<!-- ends: .menu-right -->*/}
                  </div>
                </div>
              </div>
              {/* <!-- end /.row --> */}
            </div>
            {/* <!-- end /.container --> */}
          </div>
          {/* <!-- end  --> */}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    chat: state.chat,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    logOutdata: (login) => dispatch(LogOut(login)),
    loginAction: (login) => dispatch(LogInAc(login))
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(Header);
