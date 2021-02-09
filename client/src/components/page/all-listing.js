import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import queryString from "query-string";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import Listing from "../container/all-listing";
import AdvSearch from "../content/element/advance-search";

import {
  Initialize,
  FilterListing,
  SetSearchQuery,
} from "../../Store/action/listingActions";

import { subCategories, categories } from "../../constants";

class AllListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPath: "",
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.setState({ locationPath: this.props.location.pathname }, () => {
      this.initialize();
    });
  }

  componentDidUpdate() {
    if (this.props.location.pathname !== this.state.locationPath) {
      this.setState({ locationPath: this.props.location.pathname });
      this.initialize();
    }
  }

  initialize() {
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    let filterQuery = { search: "" };
    if (params.search) filterQuery.search = params.search;
    if (
      this.props.match.path.includes("/spare-parts/:category") &&
      this.props.match.params.category
    ) {
      const cat = categories.filter(
        (e) =>
          e.name.toLowerCase().replaceAll(" ", "-") ===
          this.props.match.params.category
      );
      filterQuery.category = cat[0];
      if (this.props.match.params.subcategory) {
        const subCatList = subCategories[cat[0].value];
        const subCat = subCatList.filter(
          (e) =>
            e.value.toLowerCase().replaceAll(" ", "-") === this.props.match.params.subcategory
        )
        filterQuery.subcategory = subCat[0];
      }
    }

    if (
      this.props.match.path === "/car-parts/:make" &&
      this.props.match.params.make
    )
      filterQuery.make = this.props.match.params.make.replace("-", " ");
    
    this.props.initializeListing(filterQuery);
  }

  handleFilter(query) {
    this.props.filterListing(query);
  }

  render() {
    const { isLoading } = this.props.list;
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text="Loading listing...">
          <PreHeader />
          <Header class="menu--light" />
          <section className="intro-wrapper bgimage overlay overlay--dark">
            <div className="bg_image_holder">
              <img src="/assets/img/intro.jpg" alt="banner" />
            </div>
            <AdvSearch
              make={
                this.props.match.path === "/car-parts/:make" &&
                this.props.match.params.make
                  ? this.props.match.params.make
                  : null
              }
              category={
                this.props.match.path.includes("/spare-parts/:category") &&
                this.props.match.params.category
                  ? this.props.match.params.category
                  : null
              }
              subCategory={
                this.props.match.path.includes("/spare-parts/:category/:subcategory") &&
                this.props.match.params.subcategory
                  ? this.props.match.params.subcategory
                  : null
              }
            />
          </section>
          <Listing handleFilter={this.handleFilter} />
          <Footer />
        </LoadingOverlay>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    initializeListing: (data) => dispatch(Initialize(data)),
    filterListing: (query) => dispatch(FilterListing(query)),
    setSearchQuery: (query) => dispatch(SetSearchQuery(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(AllListing);
