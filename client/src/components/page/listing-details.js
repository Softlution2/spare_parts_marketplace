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
    };
    this.validator = new SimpleReactValidator();
    this.getListing = this.getListing.bind(this);
    this.startChat = this.startChat.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
          return (d.articleNumber === articleNumber)
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
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h1>{listing.partName}</h1>
                      <h1 className="text-warning"><small style={{fontSize: '70%'}}>AED </small>{listing.price}</h1>
                    </div>
                  </div>
                  <div className="col-lg-8">
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

                    <ListingFetures listing={listing} />
                  </div>
                  <div className="col-lg-4">
                    <div className="widget atbd_widget widget-card">
                      <div className="atbd_widget_title">
                      {
                        params.api !== "true" ? (
                          <button className="btn btn-primary btn-block" onClick={(e) => this.props.addToCart(listing._id)}>
                            ADD TO CART
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-block">
                            On Request
                          </button>
                        )
                      }
                        <h4>
                          <span className="la la-user"></span>Seller Info
                        </h4>
                      </div>
                      {/* <!-- ends: .atbd_widget_title --> */}
                      <SellerInfo
                        seller={listing_user}
                        listingCount={seller_listing}
                      />
                    </div>

                    <div className="atbd_widget_contact">
                      {listing_user?.phone && (
                        <>
                          <a
                            href={`tel: ${listing_user.phone}`}
                            className="btn btn-primary btn-block"
                          >
                            <i className="la la-phone" />
                            {formatPhoneNumberIntl("+" + listing_user.phone)}
                          </a>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${listing_user.phone}`}
                            className="btn btn-success btn-block"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            <i className="la la-whatsapp" />
                            Contact on Whatsapp
                          </a>
                        </>
                      )}
                      {this.props.login && (
                        <button
                          className="btn btn-block btn-outline-primary"
                          disabled={
                            this.props.login._id === listing_user?._id
                              ? true
                              : false
                          }
                          onClick={this.startChat}
                        >
                          <i className="lab la-rocketchat" />
                          Start Chat
                        </button>
                      )}
                      {this.props.login && (
                        <button
                          className="btn btn-block btn-outline-light"
                          disabled={
                            this.props.login._id === listing_user?._id
                              ? true
                              : false
                          }
                          style={{ borderColor: "#7a82a6", color: "#7a82a6" }}
                          onClick={this.openModal}
                        >
                          Request Seller to Call Back
                        </button>
                      )}
                    </div>
                    <div className="atbd_widget_social_icons mt-5">
                      <p className="text-center">Share it with friends</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.facebook/com/sharer/sharer.php?u=${window.location.href}`}
                          className="mr-2"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/facebook.png"
                            alt="facebook"
                          ></img>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`#!`} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/linkedin.png"
                            alt="linkedin"
                          ></img>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`#!`} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/messenger.png"
                            alt="messenger"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`viber://pa?chatURI=${window.location.href}&text=Share`}
                          className="mr-2"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/phone.png"
                            alt="phone"
                          ></img>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href={`#!`} className="mr-2">
                          <img
                            width="40"
                            src="/assets/img/social-logos/telegram.png"
                            alt="telegram"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                          className="mr-2"
                          rel="noopener noreferrer"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/twitter.png"
                            alt="twitter"
                          ></img>
                        </a>
                        <a
                          target="_blank"
                          href={`whatsapp://send?text=${window.location.href}`}
                          rel="noopener noreferrer"
                        >
                          <img
                            width="40"
                            src="/assets/img/social-logos/whatsapp.png"
                            alt="whatsapp"
                          ></img>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-12 mb-5">
                    <h2 className="text-warning">We think you might find these products interesting</h2>
                  </div>
                  <CardListingGridSimilar listings={this.state.similarListings} />
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
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(ListingDetails);
