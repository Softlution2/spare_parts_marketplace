import React, { Fragment, Component } from "react";
import { NavLink } from 'react-router-dom';
import { compose } from "redux";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from "react-redux";
import moment from "moment";
import Modal from "react-awesome-modal";
import parsePhoneNumber from 'libphonenumber-js'
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from "simple-react-validator";

import PreHeader from "../layout/pre-header";
import Header from "../layout/header";
import Footer from "../layout/footer";
import VehicleFeatures from "../content/element/vehicle-features";
import Gallery from "../content/element/carousel/gallery";
import CardListingGrid from "../content/element/card/card-listing-grid-similar";
import { SellerDescription } from "../content/element/seller-description";
import CallbackDetails from "../content/element/modal/callback-details";

import { GetAllListing, SetLoading, SetSimilarListing, SetFavouriteListing } from "../../Store/action/listingActions";
import { SetActiveRoom, Initialize } from "../../Store/action/chatActions";
import { numberWithCommas, getTimeSince } from "../../utils";

const noAction = (e) => e.preventDefault();

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      listing_user: null,
      modalIsOpen: false,
    }
    this.validator = new SimpleReactValidator();
    this.getListing = this.getListing.bind(this);
    this.onFavourite = this.onFavourite.bind(this);
    this.startChat = this.startChat.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  getRefcode() {
    const info = this.props.match.params.info.split("-");
    const refCode = info[info.length - 1];
    return refCode;
  }

  componentDidMount() {
    this.getListing(this.getRefcode());
  }

  componentDidUpdate() {
    const { listing } = this.state;
    if (listing && (listing.reference_code !== this.getRefcode())) {
      this.setState({ listing: null }, () => {
        this.getListing(this.getRefcode());
      });
    }
  }

  getListing(refcode) {
    this.props.setLoading(true);
    axios.get(`/api/listing/get?ref_code=${refcode}`)
    .then((res) => {
      const {listing, similarListing, userListings} = res.data;
      listing['userListings'] = userListings;
      let listing_user = listing.user_id;
      if (listing_user.phone.length > 0) {
        listing_user['intl_number'] = (parsePhoneNumber('+' + listing_user.phone[0])).formatInternational();
      }
      this.setState({listing, listing_user}, () => {
        this.props.setLoading(false);
      });
      this.props.setSimilarListing(similarListing);
    })
    .catch((err) => {
      this.props.setLoading(false);
      console.log(err.response);
    });
  }

  onFavourite(e) {
    noAction(e);
    let { listing } = this.state;
    if (!this.props.login) return;
    axios
      .post("/api/listing/set-favourite", {
        listing_id: listing._id,
        user_id: this.props.login._id,
      })
      .then((res) => {
        listing.favourite_users = res.data.favourite_users;
        this.setState({listing});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startChat(e) {
    noAction(e);
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
            this.props.history.push("/chats");
          })
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {listing, listing_user,modalIsOpen, callbackName, callbackPhone} = this.state;
    const {isLoading} = this.props.list;
    const {login} = this.props;
    const { t } = this.props;
    return (
      <Fragment>
        <LoadingOverlay
          active={isLoading}
          spinner
          text='Loading listing...'
        >
          <PreHeader />
          <Header />
          <section className="directory_listiing_detail_area single_area section-bg"></section>
          <section className="directory_listiing_detail_area single_area">
            {
              listing && (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-8">
                      <Gallery photos={listing.photos} />
                      <VehicleFeatures details={listing} />
                      <SellerDescription description={listing.description} />
                      <div className="listing-cards-wrapper col-lg-12">
                        <div className="d-flex align-items-center mb-5 justify-content-between">
                          <h2 className="text-primary mr-2">Other {listing.make} Listings</h2>
                          <NavLink to={`/buy-car-${listing.make.toLowerCase().replace(" ", "-")}`} className="text-dark text-underline">
                            <u>See all {listing.make} cars for sales in Africa</u>
                            <img src={`/assets/img/make-logos/${listing.make.toLowerCase().replace(" ", "-")}.png`} alt="" width="50" className="ml-2" />
                          </NavLink>
                        </div>
                        <div className="row"><CardListingGrid size={4} /></div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="car-info">
                        <div className="car-info__body">
                          <div className="detail-info">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <div className="title">
                                {listing.make + " " + listing.model + " " + listing.year + " " + listing.version}
                              </div>
                              <div className="right">
                                <a 
                                  href="#!"
                                  className={
                                    login && listing.favourite_users.includes(login._id)
                                      ? "favorite-action active"
                                      : "favorite-action"
                                  }
                                  data-tip
                                  data-for='loginWarning'
                                  onClick={this.onFavourite}>
                                  <i className="la la-heart"></i>
                                </a>
                                {
                                  !login && (
                                    <ReactTooltip id='loginWarning' type='error' effect='solid'>
                                      <span>Please login first</span>
                                    </ReactTooltip>
                                  )
                                }
                              </div>
                            </div>
                            <div className="info">
                              <div className="mileage">
                                <div className="num window">{numberWithCommas(listing.mileage)}&nbsp;</div>
                                <div className="unit">{listing.unit} | {listing.transmission}</div>
                              </div>
                            </div>
                            <div className="money">{numberWithCommas(listing.price)}&nbsp;{listing.currency}</div>
                            <div className="seller-info">
                              <div className={`seller-avatar ${this.props.chat.onlineUsers && this.props.chat.onlineUsers[listing_user._id] ? "avatar-online" : "avatar-away"}`}>
                                <NavLink to={`/seller-listings/${listing_user._id}`}>
                                {
                                  listing_user.avatar ? (
                                    <img
                                      src={`${listing_user.avatar}`}
                                      alt="AvatarImage"
                                    />
                                  ) : (
                                    <img
                                      src={`/assets/img/avatar.png`}
                                      alt="AvatarImage"
                                    />
                                  )
                                }
                                </NavLink>
                              </div>
                              <div className="seller-name">
                                <span className="name">{listing_user.name}</span>
                                <div className="description">
                                  <p>Registered {moment(listing_user.date).format("D MMM YYYY")}</p>
                                  {
                                    (!this.props.chat.onlineUsers || !this.props.chat.onlineUsers[listing_user._id]) && (
                                      <p>Last seen {getTimeSince(moment(listing_user.last_seen))} ago</p>
                                    )
                                  }
                                  <p>{listing.userListings} listing online</p>
                                </div>
                              </div>
                            </div>
                            <div className="verification-items">
                              <div className="v--item">
                                {
                                  listing_user.email && (
                                    <>
                                      <i className="la la-envelope-open"></i>
                                      <span>Email verified</span>
                                    </>
                                  )
                                }
                              </div>
                              <div className="v--item">
                                {
                                  listing_user.phone.length > 0 && (
                                    <>
                                      <i className="la la-phone"></i>
                                      <span>Phone verified</span>
                                    </>
                                  )
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="car-info__footer">
                          {
                            listing_user.phone.length > 0 && (
                              <>
                                <a href={`tel: ${listing_user.intl_number}`} className="btn btn-primary btn-block">
                                <i className="la la-phone" />
                                  {listing_user.intl_number}
                                </a>
                                <a href={`https://api.whatsapp.com/send?phone=${listing_user.phone[0]}`} className="btn btn-success btn-block" target="blank">
                                  <i className="la la-whatsapp" />
                                  Contact on Whatsapp
                                </a>
                              </>
                            )
                          }
                          {
                            this.props.login && this.props.login._id !== listing_user._id && (
                              <button className="btn btn-block btn-outline-primary" onClick={this.startChat}>
                                <i className="lab la-rocketchat" />
                                Start Chat
                              </button>
                            )
                          }
                          {
                            this.props.login && this.props.login._id !== listing_user._id && (
                              <button className="btn btn-block btn-outline-light " onClick={this.openModal} style={{borderColor: '#7a82a6', color: '#7a82a6'}}>
                                Request Seller to Call Back
                              </button>
                            )
                          }
                          {
                            !this.props.login && (
                              <>
                                <button
                                  className="btn btn-block btn-outline-primary"
                                  data-tip
                                  data-for='loginWarning'
                                >
                                  Start Chat
                               </button>
                                <ReactTooltip id='loginWarning' type='error' effect='solid'>
                                  <span>Please login first</span>
                                </ReactTooltip>
                              </>
                            )
                          }
                        </div>
                        <div className="car-info__social mt-4">
                          <p className="text-center">Share it with friends</p>
                          <div className="d-flex align-items-center justify-content-center">
                            <a target="_blank" href={`https://www.facebook/com/sharer/sharer.php?u=${window.location.href}`} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/facebook.png" alt="facebook"></img>
                            </a>
                            <a target="_blank" href={``} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/linkedin.png" alt="linkedin"></img>
                            </a>
                            <a target="_blank" href={``} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/messenger.png" alt="messenger"></img>
                            </a>
                            <a target="_blank" href={`viber://pa?chatURI=${window.location.href}&text=Share`} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/phone.png" alt="phone"></img>
                            </a>
                            <a target="_blank" href={``} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/telegram.png" alt="telegram"></img>
                            </a>
                            <a target="_blank" href={`https://twitter.com/intent/tweet?url=${window.location.href}`} className="mr-2">
                              <img width="40" src="/assets/img/social-logos/twitter.png" alt="twitter"></img>
                            </a>
                            <a target="_blank" href={`whatsapp://send?text=${window.location.href}`}>
                              <img width="40" src="/assets/img/social-logos/whatsapp.png" alt="whatsapp"></img>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </section>
          
          <Modal visible={modalIsOpen} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <CallbackDetails />
          </Modal>
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
    chat: state.chat,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    getAllListing: () => dispatch(GetAllListing()),
    setSimilarListing: (data) => dispatch(SetSimilarListing(data)),
    setFavouriteListing: (e, id) => dispatch(SetFavouriteListing(e, id)),
    setLoading: (data) => dispatch(SetLoading(data)),
    setChatRoom: (data) => dispatch(SetActiveRoom(data)),
    chatRoomInitialize: () => dispatch(Initialize()),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(ListingDetails);
