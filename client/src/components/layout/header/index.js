import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import NavItem from "../navbar/navItem";

import { LogOut } from "../../../Store/action/logoutAction";
import { LogInAc } from "../../../Store/action/loginActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const logOut = (e) => {
      e.preventDefault();
      this.props.logOutdata(null);
      window.location.href = "/";
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
                            src="/assets/img/logo.svg"
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
                      {window.location.pathname !== "/" && (
                        <div className="search-wrapper">
                          <div className="nav_right_module search_module">
                            <span className="icon-left" id="basic-addon9">
                              <i className="la la-search"></i>
                            </span>
                            <div className="search_area">
                              <form action="/all-listings">
                                <div className="input-group input-group-light">
                                  <input
                                    type="text"
                                    name="search"
                                    className="form-control search_field top-search-field"
                                    placeholder="What are you looking for?"
                                    autoComplete="off"
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                      {this.props.login === null && (
                        <div className="author-area">
                          <div className="author__access_area">
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
                                <NavLink to="/register" className="access-link">
                                  {t("register")}
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {this.props.login !== null && (
                        <div className={"offcanvas-menu"}>
                          <a href="#!" className="offcanvas-menu__user">
                            {this.props.chat.unreadMsgCnt > 0 && (
                              <span className="badge unread-msg">
                                {this.props.chat.unreadMsgCnt}
                              </span>
                            )}
                            <i className="la la-bars"></i>
                            {this.props.login.avatar ? (
                              <img
                                src={`${this.props.login.avatar}`}
                                alt="AvatarImage"
                                className="rounded-circle"
                                width="50"
                                height="50"
                              />
                            ) : (
                              <i className="la la-user"></i>
                            )}
                          </a>
                          {
                            this.props.list.itemsInCart && this.props.list.itemsInCart.length > 0 && (
                              <NavLink to="/checkout" className="offcanvas-menu__cart">
                                <img src="/assets/img/cart-icon.svg"  alt="Cart"/> {this.props.list.itemsInCart.length}
                              </NavLink>
                            )
                          }
                          <div className="offcanvas-menu__contents">
                            <a href=" " className="offcanvas-menu__close">
                              <i className="la la-times-circle"></i>
                            </a>
                            <div className="author-avatar">
                              {this.props.login.avatar ? (
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
                              )}
                              <span className="d-inline-block w-100 font-weight-bold mb-1">
                                <i className="la la-map-marker"></i>{" "}
                                { this.props.login && this.props.login.details.emirate }
                              </span>
                              {
                                this.props.login.role === "SELLER" && (
                                  <p className="font-weight-bold">
                                    {this.props.login.listing_count} spare parts
                                  </p>
                                )
                              }
                              <span className="author-rating">
                                4.5<i className="la la-star"></i>
                              </span>
                            </div>
                            <ul className="list-unstyled">
                              <li className="group-title">Your Account</li>
                              <li>
                                <NavLink to="/">Dashboard</NavLink>
                              </li>
                              <li>
                                <NavLink to="/my-profile">Profile</NavLink>
                              </li>
                              <li>
                                <NavLink to="/settings">Settings</NavLink>
                              </li>
                              <li>
                                <NavLink to="/faq">Help</NavLink>
                              </li>
                              <li className="group-title">Your Inventory</li>
                              <li>
                                <NavLink to="/my-listings">Listings</NavLink>
                              </li>
                              <li>
                                <NavLink to="/sell-your-parts">Add New</NavLink>
                              </li>
                              <li>
                                <NavLink to="/discussion">Discussion</NavLink>
                              </li>
                              <li>
                                <NavLink to="/my-callbacks">Callbacks</NavLink>
                              </li>
                              <li className="group-title">Your Orders</li>
                              <li>
                                <NavLink to="/orders">Orders</NavLink>
                              </li>
                              <li>
                                <NavLink to="/deliveries">Deliveries</NavLink>
                              </li>
                              <li>
                                <NavLink to="/payments">Payments</NavLink>
                              </li>
                              <li className="log-out">
                                <NavLink to=" " onClick={logOut}>
                                  <i className="la la-power-off mr-2"></i>
                                  {t("menu_signout")}
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          {/*<!-- ends: .author-info -->*/}
                        </div>
                      )}
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
    list: state.list,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    logOutdata: (login) => dispatch(LogOut(login)),
    loginAction: (login) => dispatch(LogInAc(login)),
  };
};
export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(Header);
