import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { categories, subCategories } from "../../../constants";

class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "Service Parts",
    };
    this.handleCategoryHover = this.handleCategoryHover.bind(this);
  }

  handleCategoryHover(e, category) {
    e.preventDefault();
    this.setState({ activeCategory: category });
  }
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <ul className="navbar-nav">
          <li className="drop-mega">
            <NavLink to="/all-listings">{t("menu_buy_parts")}</NavLink>
            <div className="mega-menu fadeIn animated">
              <div className="side-menu">
                <ul>
                  {categories.map((cat, index) => {
                    return (
                      <li
                        key={index}
                        className={`${this.state.activeCategory === cat.value ? "active" : ""}`}
                        onMouseEnter={(e) =>
                          this.handleCategoryHover(e, cat.value)
                        }
                      >
                        {cat.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="sub-menu-list">
                <div className="row">
                  <div className="col-md-12">
                    <ul className="category-list">
                      {this.state.activeCategory &&
                        subCategories[this.state.activeCategory] &&
                        subCategories[this.state.activeCategory].map(
                          (item, index) => {
                            return (
                              <li key={index}>
                                <NavLink to={`/spare-parts/${this.state.activeCategory.toLowerCase().replaceAll(" ", "-")}/${item.value.toLowerCase().replaceAll(" ", "-")}`}>
                                  {item.label}
                                </NavLink>
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <NavLink to="/sell-your-parts">{t("menu_sell_parts")}</NavLink>
          </li>
          <li>
            <NavLink to="/stores">{t("menu_sellers")}</NavLink>
          </li>
          <li>
            <NavLink to="/news">{t("menu_news")}</NavLink>
          </li>

          <li className="dropdown has_dropdown">
            <a
              className="dropdown-toggle"
              href="# "
              id="drop1"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t("menu_more")}
            </a>
            <ul className="dropdown-menu" aria-labelledby="drop1">
              <li>
                <NavLink to="/how-it-works">{t("menu_how_it_works")}</NavLink>
              </li>
              <li>
                <NavLink to="/about-us">{t("menu_about")}</NavLink>
              </li>
              <li>
                <NavLink to="/become-buyer">{t("menu_become_buyer")}</NavLink>
              </li>
              <li>
                <NavLink to="/become-seller">{t("menu_become_seller")}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{t("menu_contact")}</NavLink>
              </li>
              {/* <!-- dropdowns example --> */}
            </ul>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default withTranslation()(NavItem);
