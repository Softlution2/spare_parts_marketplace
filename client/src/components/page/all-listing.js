import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import queryString from "query-string";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import Listing from "../container/all-listing";

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
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (params.api !== 'true') {
      this.setState({ locationPath: this.props.location.pathname }, () => {
        this.initialize();
      });
    }
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
    const { make, category, subCategory } = this.props;
    const makeStr = make ? make.replaceAll("-", " ").toString() : null;
    const catObj = category
      ? categories.filter(
          (e) => e.name.toLowerCase().replaceAll(" ", "-") === category
        )
      : null;
    const subCatObj = category && subCategory ? subCategories[catObj[0].value].filter((e) => e.value.toLowerCase().replaceAll(" ", "-") === subCategory) : null;
    
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text="Loading listing...">
          <PreHeader />
          <Header class="menu--light" />
          <section className="intro-wrapper bgimage overlay overlay--dark">
            <div className="bg_image_holder">
              <img src="/assets/img/intro.jpg" alt="banner" />
            </div>
            <div className="search_title_area w-100 text-center">
              {make && (
                <img
                  src={`/assets/img/make-logos/${make}.png`}
                  alt=""
                  width={100}
                  style={{ borderRadius: "15px" }}
                />
              )}
              {catObj && (
                <img
                  src={catObj[0].img}
                  alt="Category Icon"
                  width={100}
                  style={{ borderRadius: "15px", background: "white" }}
                />
              )}
              <h2 className="title">
                {makeStr && (
                  <>
                    Find{" "}
                    {makeStr.charAt(0).toUpperCase() + makeStr.slice(1)}{" "}
                    Parts in the UAE
                  </>
                )}
                {catObj && <>Find {`${subCatObj ? subCatObj[0].label + "," : ""}`} {catObj[0].value.replace("Parts", "")} Parts in the UAE</>}
                {!makeStr && !catObj && <>Find Spare Parts in the UAE</>}
              </h2>
            </div>
            
          </section>
          <Listing handleFilter={this.handleFilter} api={params.api} />
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
