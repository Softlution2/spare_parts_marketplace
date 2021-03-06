import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { categories } from "../../../constants";

class BrowseByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      countsPerCategory: {},
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/api/listing/get-count-by-category")
      .then((res) => {
        this.setState({ isLoading: false, countsPerCategory: res.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <Fragment>
        <div className="category-list">
          {categories.map((category, index) => {
            return (
              <div className="category-card-wrapper" key={index}>
                <div className="category-card">
                  <NavLink
                    to={`/spare-parts/${category.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    <img src={category.img} alt={category.name} width="100%" />
                  </NavLink>
                  <NavLink
                    to={`/spare-parts/${category.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {category.name}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(BrowseByCategory);
