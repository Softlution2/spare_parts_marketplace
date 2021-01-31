import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import equal from "fast-deep-equal";
import { withTranslation } from "react-i18next";

import ListingCardGrid from "../content/element/card/card-listing-grid";
import { OptionSelection } from "../content/element/filter/selection";
import { numberWithCommas } from "../../utils";
import { categories } from "../../constants";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 0,
      perPage: 4,
      data: {},
      orderText: "New To Old",
      searchQuery: {
        string: "",
        priceRange: null,
        category: null,
        make: null,
        model: null,
        year: null,
        brand: null,
        sortBy: { date: -1 },
      },
    };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSliderAfterChange = this.handleSliderAfterChange.bind(this);
    this.searchAction = this.searchAction.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    this.setState({ searchQuery: this.props.list.searchQuery });
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.list.searchQuery, this.props.list.searchQuery)) {
      this.setState({ searchQuery: this.props.list.searchQuery });
    }
  }

  searchAction(e) {
    e.preventDefault();
    this.props.handleFilter(this.state.searchQuery);
  }

  handleSearchChange(e) {
    e.preventDefault();
    let { searchQuery } = this.state;
    searchQuery.string = e.target.value;
    this.setState({ searchQuery });
  }

  handleSliderChange(values, name) {
    let { searchQuery } = this.state;
    searchQuery[name] = values;
    this.setState({ searchQuery });
  }

  handleSliderAfterChange() {
    const { searchQuery } = this.state;
    this.props.handleFilter(searchQuery);
  }

  handleSelectionChange(options, name) {
    let { searchQuery } = this.state;
    searchQuery[name] = options;
    this.setState({ searchQuery });
    this.props.handleFilter(searchQuery);
  }

  resetFilters(e) {
    e.preventDefault();
    const initQuery = {
      string: "",
      priceRange: null,
      make: null,
      model: null,
      category: null,
      sortBy: { date: -1 },
    };
    this.setState({ searchQuery: initQuery });
    this.props.handleFilter(initQuery);
  }

  render() {
    // sorting here
    const sort = [];
    Object.values(this.state.list).map((item) => {
      return sort.push(item);
    });

    const sorting = (e) => {
      e.preventDefault();

      let { searchQuery } = this.state;

      switch (e.target.getAttribute("href")) {
        case "lowest-price":
          searchQuery["sortBy"] = { price: 1 };
          this.setState({ orderText: "Lowest Price" });
          break;
        case "highest-price":
          searchQuery["sortBy"] = { price: -1 };
          this.setState({ orderText: "Highest Price" });
          break;
        case "new":
          searchQuery["sortBy"] = { date: -1 };
          this.setState({ orderText: "New To Old" });
          break;
        default:
          searchQuery["sortBy"] = { date: -1 };
          this.setState({ orderText: "New To Old" });
          break;
      }
      this.setState({ searchQuery });
      this.props.handleFilter(searchQuery);
    };
    // sorting end
    const { searchQuery, orderText } = this.state;
    const { listing } = this.props.list;
    const {
      maxPrice,
      minPrice,
      makeList,
      modelList,
      brandList,
    } = this.props.list;
    const { t } = this.props;
    return (
      <Fragment>
        <section className="all-listing-wrapper">
          <div className="container-fluid">
            <div className="row">
              {/*<!-- ends: .col-lg-12 -->*/}
              <div className="col-lg-12 listing-items">
                <div className="row">
                  <div className="col-lg-3 order-lg-0 order-0 mt-5 mt-lg-0">
                    <div className="listings-sidebar">
                      <div className="search-area default-ad-search">
                        <div className="search-area-header">
                          {t("all_listings_filters")}
                          <button
                            className="btn btn-primary"
                            onClick={this.resetFilters}
                          >
                            RESET FILTERS
                          </button>
                        </div>
                        <div
                          className="accordion"
                          id="filterAccordion"
                          role="tablist"
                          aria-multiselectable="true"
                        >
                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="headingOne6"
                            >
                              <a
                                data-toggle="collapse"
                                data-parent="#filterAccordion"
                                href="#collapseOne6"
                                aria-expanded="true"
                                aria-controls="collapseOne6"
                                className="collapsed"
                              >
                                <span className="mb-0">Category</span>
                                <i className="la la-angle-down"></i>
                              </a>
                            </div>
                            <div
                              id="collapseOne6"
                              className="collapse"
                              role="tabpanel"
                              aria-labelledby="headingOne6"
                              data-parent="#filterAccordion"
                            >
                              <div className="card-body">
                                <div className="form-group p-bottom-10">
                                  <OptionSelection
                                    options={categories}
                                    name="category"
                                    activeOptions={
                                      searchQuery.category
                                        ? searchQuery.category
                                        : []
                                    }
                                    onChange={this.handleSelectionChange}
                                  />
                                </div>
                                {/*<!-- ends: .form-group -->*/}
                              </div>
                            </div>
                          </div>
                          
                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="headingOne1"
                            >
                              <a
                                data-toggle="collapse"
                                data-parent="#filterAccordion"
                                href="#collapseOne1"
                                aria-expanded="true"
                                aria-controls="collapseOne1"
                                className="collapsed"
                              >
                                <span className="mb-0">{t("price")}</span>
                                <i className="la la-angle-down"></i>
                              </a>
                            </div>
                            <div
                              id="collapseOne1"
                              className="collapse"
                              role="tabpanel"
                              aria-labelledby="headingOne1"
                              data-parent="#filterAccordion"
                            >
                              <div className="card-body">
                                <div className="form-group p-bottom-10">
                                  <div className="price-range rs-primary">
                                    <p className="d-flex justify-content-between">
                                      <span className="amount">
                                        {searchQuery.priceRange
                                          ? `${numberWithCommas(
                                              searchQuery.priceRange[0]
                                            )}AED - ${numberWithCommas(
                                              searchQuery.priceRange[1]
                                            )}AED`
                                          : `${numberWithCommas(
                                              minPrice
                                            )}AED - ${numberWithCommas(
                                              maxPrice
                                            )}AED`}
                                      </span>
                                    </p>
                                    <Range
                                      min={minPrice}
                                      max={maxPrice}
                                      defaultValue={[minPrice, maxPrice]}
                                      value={
                                        searchQuery.priceRange
                                          ? searchQuery.priceRange
                                          : [minPrice, maxPrice]
                                      }
                                      onChange={(values) =>
                                        this.handleSliderChange(
                                          values,
                                          "priceRange"
                                        )
                                      }
                                      onAfterChange={
                                        this.handleSliderAfterChange
                                      }
                                    />
                                  </div>
                                  {/*<!-- ends: .price-range -->*/}
                                </div>
                                {/*<!-- ends: .form-group -->*/}
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="headingOne3"
                            >
                              <a
                                data-toggle="collapse"
                                data-parent="#filterAccordion"
                                href="#collapseOne3"
                                aria-expanded="true"
                                aria-controls="collapseOne3"
                                className="collapsed"
                              >
                                <span className="mb-0">{t("make")}</span>
                                <i className="la la-angle-down"></i>
                              </a>
                            </div>
                            <div
                              id="collapseOne3"
                              className="collapse"
                              role="tabpanel"
                              aria-labelledby="headingOne3"
                              data-parent="#filterAccordion"
                            >
                              <div className="card-body">
                                <div className="form-group p-bottom-10">
                                  <OptionSelection
                                    options={makeList}
                                    name="make"
                                    activeOptions={
                                      searchQuery.make ? searchQuery.make : []
                                    }
                                    onChange={this.handleSelectionChange}
                                  />
                                </div>
                                {/*<!-- ends: .form-group -->*/}
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="headingOne4"
                            >
                              <a
                                data-toggle="collapse"
                                data-parent="#filterAccordion"
                                href="#collapseOne4"
                                aria-expanded="true"
                                aria-controls="collapseOne4"
                                className="collapsed"
                              >
                                <span className="mb-0">{t("model")}</span>
                                <i className="la la-angle-down"></i>
                              </a>
                            </div>
                            <div
                              id="collapseOne4"
                              className="collapse"
                              role="tabpanel"
                              aria-labelledby="headingOne4"
                              data-parent="#filterAccordion"
                            >
                              <div className="card-body">
                                <div className="form-group p-bottom-10">
                                  <OptionSelection
                                    options={modelList}
                                    name="model"
                                    activeOptions={
                                      searchQuery.model ? searchQuery.model : []
                                    }
                                    onChange={this.handleSelectionChange}
                                  />
                                </div>
                                {/*<!-- ends: .form-group -->*/}
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="headingOne5"
                            >
                              <a
                                data-toggle="collapse"
                                data-parent="#filterAccordion"
                                href="#collapseOne5"
                                aria-expanded="true"
                                aria-controls="collapseOne5"
                                className="collapsed"
                              >
                                <span className="mb-0">Part Brands</span>
                                <i className="la la-angle-down"></i>
                              </a>
                            </div>

                            <div
                              id="collapseOne5"
                              className="collapse"
                              role="tabpanel"
                              aria-labelledby="headingOne5"
                              data-parent="#filterAccordion"
                            >
                              <div className="card-body">
                                <div className="form-group p-bottom-10">
                                  <OptionSelection
                                    options={brandList}
                                    name="brand"
                                    activeOptions={
                                      searchQuery.brand ? searchQuery.brand : []
                                    }
                                    onChange={this.handleSelectionChange}
                                  />
                                </div>
                                {/*<!-- ends: .form-group -->*/}
                              </div>
                            </div>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* wiget */}
                  <div className="col-lg-9 order-lg-1 order-1">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="atbd_listing_action_toolbar">
                          <div className="dropdown dropdown-right">
                            <a
                              className="action-btn dropdown-toggle"
                              href=" "
                              role="button"
                              id="dropdownMenuLink2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {t("all_listings_sort_by")}:{" "}
                              <span className="sort-name">{orderText}</span>
                              <span className="caret"></span>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right"
                              aria-labelledby="dropdownMenuLink2"
                            >
                              <a
                                className="dropdown-item"
                                onClick={sorting}
                                href="lowest-price"
                              >
                                Lowest Price
                              </a>
                              <a
                                className="dropdown-item"
                                onClick={sorting}
                                href="highest-price"
                              >
                                Highest Price
                              </a>
                              <a
                                className="dropdown-item"
                                onClick={sorting}
                                href="new"
                              >
                                New to Old
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {listing.length ? (
                        <Fragment>
                          <ListingCardGrid size={3} />
                        </Fragment>
                      ) : (
                        <div className="col-lg-12 text-center">
                          <p className="display-4">
                            <span className="text-primary display-3 font-weight-bolder">
                              Sorry
                            </span>
                            , we can't find <br />
                            any spare parts for your search
                          </p>
                          <img
                            src="/assets/img/no_results.jpg"
                            width="60%"
                            className="mt-4"
                            alt="empty"
                          ></img>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(Listing);
