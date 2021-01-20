import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

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
    const { countsPerCategory, isLoading } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <div className="category-list">
          {categories.map((category, index) => {
            return (
              <div className="category-card-wrapper" key={index}>
                <div className="category-card">
                  <img src={category.img} />
                  <NavLink
                    to={`/spare-parts/${category.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {category.name}
                  </NavLink>
                  <span className="text-muted small text-center mt-3">
                    {isLoading ? (
                      <Skeleton width={150} height={15} />
                    ) : (
                      <>
                        {countsPerCategory[category.value]
                          ? countsPerCategory[category.value]
                          : 0}{" "}
                        car parts for sale
                      </>
                    )}
                  </span>
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
