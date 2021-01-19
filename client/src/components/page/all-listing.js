import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';
import queryString from 'query-string';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import Listing from "../container/all-listing";

import { Initialize, FilterListing, SetSearchQuery } from "../../Store/action/listingActions";

class AllListing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      locationPath: "",
    }
    this.handleFilter = this.handleFilter.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.setState({locationPath: this.props.location.pathname});
    this.initialize();
  }

  componentDidUpdate() {
    if (this.props.location.pathname !== this.state.locationPath) {
      this.setState({locationPath: this.props.location.pathname});
      this.initialize();
    }
  }

  initialize() {
    const params = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let searchQuery = {
      string: "",
      priceRange: null,
      make: [],
      model: [],
      sortBy: {date: -1}
    };
    let customQuery = { search: "" };
    if (params.search) {
      customQuery.search = params.search;
      searchQuery.string = params.search;
    }
    if (this.props.match.params.make) {
      customQuery.make = this.props.match.params.make;
      searchQuery.make = [this.props.match.params.make.replace("-", " ")];
    }
    this.props.setSearchQuery(searchQuery);
    this.props.initializeListing(customQuery);
  }

  handleFilter(query) {
    this.props.filterListing(query);
  }

  render() {
    const {isLoading} = this.props.list;
    return (
      <Fragment>
        <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading listing...'
        >
          <PreHeader />
          <Header class="menu--light" />
          <Listing
            handleFilter={this.handleFilter}
          />
          <Footer />
        </LoadingOverlay>
      </Fragment>
    );
  }
};

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
    setSearchQuery: (query) => dispatch(SetSearchQuery(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(AllListing);
