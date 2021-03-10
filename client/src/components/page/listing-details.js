import React, { Fragment, Component } from "react";
import { compose } from "redux";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import Modal from "react-awesome-modal";
import { ToastContainer } from 'react-toastify';
import queryString from "query-string";
import StarRatingComponent from 'react-star-rating-component';
import { getCartLength } from "../../utils";
import { UpdateCart } from "../../Store/action/listingActions";

import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { BreadcrumbCategory } from "../content/element/breadcrumb";
import { ListingFetures } from "../content/element/listing-features";
import { SellerInfo } from "../content/element/widget";
import CallbackDetails from "../content/element/modal/callback-details";
import ListingStickyFooter from "../content/element/listing-sticky-footer";
import CardListingGridSimilar from "../content/element/card/card-listing-grid-similar";

import { SetLoading } from "../../Store/action/listingActions";
import { SetActiveRoom, Initialize } from "../../Store/action/chatActions";
import { AddToCart } from "../../Store/action/listingActions";

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      listing_user: null,
      seller_listing: 0,
      modalIsOpen: false,
      similarListings: null,
      listingDetailTabIndex: 1,
    };
    this.validator = new SimpleReactValidator();
    this.getListing = this.getListing.bind(this);
    this.startChat = this.startChat.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.qtyDecrement = this.qtyDecrement.bind(this);
    this.qtyIncrement = this.qtyIncrement.bind(this);
  }

  startChat(e) {
    e.preventDefault();
    const { listing, listing_user } = this.state;
    if (this.props.login._id === listing_user._id) return;
    axios
      .post("/api/chat-rooms/add", {
        buyer_id: this.props.login._id,
        listing_id: listing._id,
        seller_id: listing_user._id,
      })
      .then((res) => {
        const { activeRoomId } = res.data;
        this.props.chatRoomInitialize().then(() => {
          this.props.setChatRoom(activeRoomId).then(() => {
            this.props.history.push("/messages");
          })
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }

  getListingSKU() {
    const info = this.props.match.params.info.split("-");
    const sku = info[info.length - 1];
    return sku;
  }

  componentDidMount() {
      this.getListing(this.getListingSKU());
  }

  componentDidUpdate() {
    const { listing } = this.state;
    
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    
    if (listing && listing.partSKU.toLowerCase() !== this.getListingSKU() && params.api !== 'true') {
      this.setState({ listing: null }, () => {
        this.getListing(this.getListingSKU());
      });
    }
  }

  getListing(sku) {
    this.props.setLoading(true);
    
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (params.api !== 'true') {
      axios
        .get(`/api/listing/get?sku=${sku}`)
        .then((res) => {
          const { listing, sellerListingCount, similarListings } = res.data;
          let listing_user = listing.user;
          console.log(listing);
          this.setState({ listing, listing_user, seller_listing: sellerListingCount, similarListings }, () => {
            this.props.setLoading(false);
          });
        })
        .catch((err) => {
          this.props.setLoading(false);
          console.log(err);
        });
    } else {      
      const info = this.props.match.params.info.split("-");
      const carID = info[info.length - 1];
      const articleNumber = info[info.length - 2]
      axios
      .get(`/api/info/get-articles?carId=${carID}`)
      .then((res) => {
        
        const newListings = res.data.filter((d) => {
          return (d.articleNumber.toLowerCase() === articleNumber)
        });
        let newListing;
        if (newListings.length > 0) {
          newListing = {
            category: "",
            clickCollect: "",
            countryOrigin: "",
            currency: "",
            date: "",
            delivery: "",
            depthDimension: "",
            description: newListings[0].genericArticles[0].genericArticleDescription,
            fittingPosition: "",
            heightDimension: "",
            hide: "",
            makes: "",
            models: "",
            partBrand: newListings[0].mfrName,
            partHSCode: "",
            partName: `${newListings[0].mfrName} ${newListings[0].genericArticles[0].genericArticleDescription}`,
            partSKU: "",
            pic: newListings[0].images[0].imageURL800,
            price: "",
            quantity: "",
            subCategory: "",
            type: "",
            user: "",
            weight: "",
            widthDimension: "",
            __v: "",
            _id: "",
          }          
        }
        this.setState({ listing: newListing });
        this.props.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  qtyIncrement(e, id) {
    e.preventDefault();
    const items =  this.props.list.itemsInCart;
    items.push(id);
    this.props.updateCart(items);
  }
  qtyDecrement(e, id) {
    e.preventDefault();
    const items = this.props.list.itemsInCart;
    const index = items.indexOf(id);
    if (index >= 0)
      items.splice(index, 1);
    this.props.updateCart(items);
  }
  chooseTab(e, index) {
    e.preventDefault();
    this.setState({listingDetailTabIndex: index})
  }

  render() {
    const { modalIsOpen, listing, listing_user, seller_listing } = this.state;
    const { isLoading } = this.props.list;
    
    const params = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text="Loading listing...">
          <PreHeader />
          <Header />
          <BreadcrumbCategory
            title={listing ? listing.partName : ""}
            category={listing ? listing.category : ""}
            subCategory={listing ? listing.subCategory : ""}
          />
          {/* <PageBanner title="Listing Details"/> */}
          <section className="directory_listiing_detail_area single_area section-bg pt-4 pb-5">
            {listing && (
              <div className="container-fluid">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="atbd_content_module atbd_listing_gallery">
                        <div className="atbdb_content_module_contents">
                          <div className="gallery-wrapper">
                            <img
                              src={listing.pic}
                              width="100%"
                              alt="Listing"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="widget">
                        <div className="atbd_widget_title">
                          <div className="d-flex align-items-center justify-content-between mb-4 w-100">
                            <h1 className="text-primary w-75">{listing.partName}</h1>
                            <h1 className="text-primary w-25 text-right"><small style={{fontSize: '70%'}}>AED </small>{listing.price}</h1>
                          </div>
                          <div className="rating-group text-right">
                            <div className="d-flex justify-content-end">
                              <StarRatingComponent 
                                name="rate2" 
                                editing={false}
                                renderStarIcon={() => ( <i className='la la-star' /> )}
                                renderStarIconHalf={() => ( <i className="la la-star-half-alt" style={{color: "#ffb400"}} /> )}
                                starColor="#ffb400"
                                emptyStarColor={"#cecece"}
                                starCount={5}
                                value={3.5}
                              />
                              <span className="rating-value">3.5</span>
                            </div>
                            <span className="review-value text-muted">760</span>
                          </div>                 
                          {
                            params.api !== "true" ? (       
                              <div className="d-flex justify-content-between mt-4">
                                <div className="w-50 d-flex justify-content-around align-items-center p-1">
                                  <button className="btn checkout-qty border" onClick={(e) => this.qtyDecrement(e, listing._id)}>-</button>
                                  <span className="border h-100 w-100 justify-content-center d-flex align-items-center">
                                    {getCartLength(this.props.list.itemsInCart, listing._id)}
                                  </span>
                                  <button className="btn checkout-qty border" onClick={(e) => this.qtyIncrement(e, listing._id)}>+</button>
                                </div>
                                <div className="w-50 p-1">
                                  <button className="btn btn-primary btn-block" onClick={(e) => this.props.addToCart(listing._id)}>
                                    ADD TO CART
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button className="btn btn-primary btn-block mt-4">
                                On Request
                              </button>
                            )
                          }
                          <div className="seller-info d-flex mt-4 border-top pt-2">
                            <div className="seller-auth-info w-50">
                              <p className="text-primary mb-0">
                                <span className="la la-user"></span>Seller Info:
                              </p>
                              <span className="text-primary h6">{listing_user.details.company_name}</span>
                            </div>
                            <div className="seller-auth-rating w-50">
                              <span className="author-rating bg-primary">4.5<i className="la la-star"></i></span>
                            </div>
                          </div>
                        </div>
                        {/* <!-- ends: .atbd_widget_title --> */}
                      </div>

                      <div className="atbd_widget_contact">
                        {listing_user?.phone && (
                          <div className="d-flex">
                            <div className="w-50 p-1">
                              <a
                                href={`tel: ${listing_user.phone}`}
                                className="btn btn-primary btn-sm"
                              >
                                <i className="la la-phone" />
                                {formatPhoneNumberIntl("+" + listing_user.phone)}
                              </a>
                            </div>
                            <div className="w-50 p-1">
                              <a
                                href={`https://api.whatsapp.com/send?phone=${listing_user.phone}`}
                                className="btn btn-primary btn-sm"
                                target="blank"
                                rel="noopener noreferrer"
                              >
                                <i className="la la-whatsapp" />
                                Contact on Whatsapp
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5 listing-detail-navbar">
                  <div className="col-lg-12">
                    <div className="listing-detail-nav container">
                        <ul className="nav">
                          <li className={`nav-item ${this.state.listingDetailTabIndex === 1 ? "active" : ""}`}>
                            <a className="nav-link" href="#!" onClick={(e) => this.chooseTab(e, 1)} >Description</a>
                          </li>
                          <li className={`nav-item ${this.state.listingDetailTabIndex === 2 ? "active" : ""}`}>
                            <a className="nav-link" href="#!" onClick={(e) => this.chooseTab(e, 2)} >Specification</a>
                          </li>
                          <li className={`nav-item ${this.state.listingDetailTabIndex === 3 ? "active" : ""}`}>
                            <a className="nav-link" href="#!" onClick={(e) => this.chooseTab(e, 3)} >Reviews</a>
                          </li>
                        </ul>
                    </div>
                  </div>
                </div>                    
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <div className="listing-detail-content container">
                    {
                      this.state.listingDetailTabIndex === 1 ? 
                      (
                      <div className="atbd_content_module atbd_listing_details">
                        <div className="atbd_content_module__tittle_area">
                          <div className="atbd_area_title">
                            <h4>
                              <span className="la la-file-text-o"></span>
                              Description
                            </h4>
                          </div>
                        </div>
                        <div className="atbdb_content_module_contents">
                          <div dangerouslySetInnerHTML={{ __html: listing.description }} />
                        </div>
                      </div>  
                      ) :
                      this.state.listingDetailTabIndex === 2 && 
                      (
                        <ListingFetures listing={listing} /> 
                      )
                    }                    
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-12 mb-5">
                    <div className="container">
                      <h2 className="text-warning">We think you might find these products interesting</h2>
                      <CardListingGridSimilar listings={this.state.similarListings} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
          <Modal visible={modalIsOpen} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <CallbackDetails listing_id={listing ? listing._id : null} closeModal={this.closeModal} />
          </Modal>
          <Footer />
          <ListingStickyFooter listing={listing} />
        </LoadingOverlay>
        <ToastContainer />
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
    setLoading: (data) => dispatch(SetLoading(data)),
    setChatRoom: (data) => dispatch(SetActiveRoom(data)),
    chatRoomInitialize: () => dispatch(Initialize()),
    addToCart: (data) => dispatch(AddToCart(data)),
    updateCart: (data) => dispatch(UpdateCart(data)),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(ListingDetails);
