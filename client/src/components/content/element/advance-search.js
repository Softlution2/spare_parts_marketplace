import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

import { categories, subCategories } from "../../../constants";

const noAction = (e) => e.preventDefault();

class AdvSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { t, make, category, subCategory } = this.props;
    const { search } = this.state;
    const makeStr = make ? make.replaceAll("-", " ").toString() : null;
    const catObj = category
      ? categories.filter(
          (e) => e.name.toLowerCase().replaceAll(" ", "-") === category
        )
      : null;
    const subCatObj = category && subCategory ? subCategories[catObj[0].value].filter((e) => e.value.toLowerCase().replaceAll(" ", "-") === subCategory) : null;
    return (
      <Fragment>
        <div className="directory_content_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <form action={`/all-listings`} className="search_form">
                  <input
                    type="text"
                    value={search || ""}
                    name="search"
                    onChange={this.handleChange}
                    placeholder={t("home_search_placeholder")}
                  />
                  <div className="atbd_seach_button_wrapper">
                    <button
                      type="submit"
                      className="btn btn-md btn-primary btn_search d-flex p-2"
                    >
                      <i className="las la-search" />
                    </button>
                  </div>
                </form>
                {!make && (
                  <p className="search-bottom-text">
                    Search by <NavLink to="/parts-search-vin">vehicle make and model</NavLink>, or by{" "}
                    <NavLink to="/parts-search-vin">VIN number</NavLink>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(AdvSearch);
