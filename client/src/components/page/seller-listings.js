import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import ListingCardGrid from "../content/element/card/card-listing-grid-seller";


class SellerListings extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sellerListings: [],
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    axios.get(`/api/listing/get-user-listings?seller_id=${this.props.match.params.id}`)
    .then((res) => {
      this.setState({sellerListings: res.data.listings, isLoading: false});
    })
    .catch((err) => {
      console.log(err.response.data);
      this.setState({isLoading: false, sellerListings: []});
    })
  }
  
  render() {
    const { isLoading, sellerListings } = this.state;
    const seller = sellerListings.length > 0 ? sellerListings[0].user_id : null;
    return (
      <Fragment>
        <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading listing...'
        >
          <PreHeader />
          <Header class="menu--light" />

          <section className="page-banner bgimage overlay overlay--dark">
            <div className="bg_image_holder">
              <img src={`${this.props.banner ? this.props.banner : "/assets/img/intro.jpg" }`} alt="banner" />
            </div>
            <div className="banner-wrapper content_above">
              <div className="container">
                <div className="row"> 
                {
                  !isLoading && seller && (
                    <div className="col-lg-8 col-md-7 text-white">
                      <ul className="list-unstyled listing-info--meta">
                        <li>{/**/}
                          <img src={seller.avatar} width="100" height="100" className="rounded-circle" alt="seller" />
                        </li>
                      </ul>
                      <h1 className="text-white">{seller.name}</h1>
                      <p className="subtitle">{seller.location}</p>
                    </div>
                  )
                }
                </div>
              </div>
            </div>
          </section>

          <section className="listing-cards mt-5">
            <div className="container">
              <div className="row">
                <div className="listing-cards-wrapper col-lg-12">
                  <div className="row">
                    {sellerListings.length ? (
                      <Fragment>
                        <ListingCardGrid size={4} list={sellerListings} />
                      </Fragment>
                    ) : (
                      <div className="col-lg-12">
                        <div className="alert alert-warning" role="alert">
                          Data Not found!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(SellerListings);
