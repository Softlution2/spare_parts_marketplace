import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { categories } from "../../../constants";

class BrowseByCategory extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className="category-list">
        {
          categories.map((category, index) => {
            return (
              <div className="category-card-wrapper" key={index}>
                <div className="category-card">
                  <img src={category.img} />
                  <NavLink to="/">{category.label}</NavLink>
                  <span className="text-muted small text-center mt-3 font-weight-bold">12,543 car parts for sale</span>
                </div>
              </div>
            )
          })
        }
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(BrowseByCategory);