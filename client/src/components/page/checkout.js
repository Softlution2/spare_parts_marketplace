import React, { Fragment, Component } from "react";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import Modal from "react-awesome-modal";

import { connect } from "react-redux";
import axios from "axios";
import { getCartLength } from "../../utils";
import AddressModal from "../content/element/modal/address-modal";
import PaymentMethodModal from "../content/element/modal/payment-method-modal";

import { UpdateCart } from "../../Store/action/listingActions";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      price: 45,
      step: 1,
      deliveryItem: 0,      
      modalIsOpen: false,
      addresses: [],
      deliveryAddress: null,
      payOnCard: 0,
    };
    this.qtyDecrement = this.qtyDecrement.bind(this);
    this.qtyIncrement = this.qtyIncrement.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    axios.post("/api/listing/cart-listings", {listings: this.props.list.itemsInCart} )
      .then((res) => {
        let newListings = new Array([]);
        let ind = 0;
        res.data.map((listing, index) => {
          if (newListings.length > 1)
          {
            if (newListings[ind].user._id === listing.user_id) {
              newListings[ind].listings.push(listing);
            } else {
              ind++;
              newListings[ind] = {
                user: listing.user,
                listings: []
              }
              newListings[ind].listings.push(listing);
            }
          } else {
            newListings[ind] = {
              user: listing.user,
              listings: []
            }
            newListings[ind].listings.push(listing);
          }
          return true;
        })
        console.log(newListings);
        this.setState({listings: newListings});
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetchAddress()
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
  removeCartItem(e, id) {
    e.preventDefault();
    let items = this.props.list.itemsInCart;
    items = items.filter((e) => e !== id);
    this.props.updateCart(items);
  }
  stepForward(e, i) {
    this.setState({step: i})
  }
  fetchAddress() {
    axios.get("/api/address/get-user-address?user_id=" + this.props.login._id)
    .then((res) => {
      this.setState({addresses: res.data.addresses});
    })
    .catch((err) => {
      console.log(err);
    });
  }
  setDeliveryAddress(address) {
    this.setState({deliveryAddress: address});
    this.setState({deliveryItem: 1})
  }
  changeDeliveryAddress() {
    this.setState({deliveryAddress: null});
    this.setState({deliveryItem: 0})
  }
  chooseDeliveryItem(i) {
    this.setState({deliveryItem: i})
  }
  setPayment(pay_on_card) {
    this.setState({payOnCard: pay_on_card})
  }
  placeOrder(e) {
    let order = [];
    this.state.listings.map((userListings, listingIndex) => {
      let listingIDs = [];
      userListings.listings.map((listing, index) => {
          listingIDs.push(listing._id)
      });
      order.push({
        status: "PENDING",
        seller: userListings.user._id,
        currency: "AED",
        listings: listingIDs,
        delivery_option: this.state.deliveryItem,
        delivery_address: this.state.deliveryAddress._id,
        pay_on_card: this.state.payOnCard,
        payment: this.state.payOnCard ? this.state.payment._id : null,
        total_price: this.state.price,
        user: this.props.login._id
      });
      return true;
    })
    console.log(order)
    axios.post("/api/order/place-an-order", order )
    .then((res) => {
      console.log(res)
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
    const { listings, step, deliveryItem, modalIsOpen, addresses, deliveryAddress } = this.state;
    let totalAmount = 0;
    return (
      <Fragment>
        <PreHeader />
        <Header className="menu--light" />

        <section className="checkout-wrapper section-padding-strict section-bg pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="link-to-shopping mb-2">
                  <a href="/listing">
                    <i className="las la-angle-left"></i>
                    Continue shopping
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="checkout-order-steps">
                  <div className={"order-step-item " + ((step > 0) ? "active" : "")}>
                    <div className="order-step-item-container">
                      <div className="order-step-item-icon" onClick={(e) => this.stepForward(e, 1)}>
                        <i className="las la-shopping-cart"></i>
                      </div>
                      <div className="order-step-item-content">
                        Review Order
                      </div>
                    </div>
                  </div>

                  <div className={"order-step-item " + ((step > 1) ? "active" : "")}>
                    <div className="order-step-item-container">
                      <div className="order-step-item-icon" onClick={(e) => this.stepForward(e, 2)}>
                        <i className="las la-truck"></i>
                      </div>
                      <div className="order-step-item-content">
                        Shipping
                      </div>
                    </div>
                  </div>

                  <div className={"order-step-item " + ((step > 2) ? "active" : "")}>
                    <div className="order-step-item-container">
                      <div className="order-step-item-icon" onClick={(e) => this.stepForward(e, 3)}>
                        <i className="las la-credit-card"></i>
                      </div>
                      <div className="order-step-item-content">
                        Payment
                      </div>
                    </div>
                  </div>

                  <div className={"order-step-item " + ((step > 3) ? "active" : "")}>
                    <div className="order-step-item-container">
                      <div className="order-step-item-icon" onClick={(e) => this.stepForward(e, 4)}>
                        <i className="las la-check"></i>
                      </div>
                      <div className="order-step-item-content">
                        confirmation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
                <div className="checkout-form">
                  <form action="/">
                  {
                    step === 1 &&
                    (
                      <div className="checkout-table table-responsive order-review-step">
                        <h3 className="mb-4">Cart</h3>
                        {
                          listings.length > 0 && listings.map((userListings, sellerIndex) => {
                            return (
                              <table
                                id="directorist-checkout-table"
                                className="table bg-transparent"
                                key={sellerIndex}
                              >
                                <thead>
                                  <tr>
                                    <th colSpan="6" className="p-0 transparent border-0 pb-2 pl-2">
                                      <i className="las la-store-alt mr-2"></i>
                                      Seller: {userListings.user.details?.company_name} 
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {
                                    userListings.listings.length > 0 && userListings.listings.map((listing, index) => {
                                      totalAmount += listing.price * getCartLength(this.props.list.itemsInCart, listing._id);
                                      if (getCartLength(this.props.list.itemsInCart, listing._id) === 0) return false;

                                      return (
                                        <tr key={index}>
                                          <td width="75">
                                            <img src={listing.pic} className="item-image" alt={listing.partName} />
                                          </td>
                                          <td>
                                            <h4>{listing.partName}</h4>
                                            <p className="text-muted"><span>item SKU</span> {listing.partSKU}</p>
                                          </td>
                                          <td>
                                            <div className="d-flex justify-content-between">
                                              <button className="btn checkout-qty" onClick={(e) => this.qtyDecrement(e, listing._id)}>-</button>
                                              <span>
                                                {getCartLength(this.props.list.itemsInCart, listing._id)}
                                              </span>
                                              <button className="btn checkout-qty" onClick={(e) => this.qtyIncrement(e, listing._id)}>+</button>
                                              <span className="text-danger">X {listing.price}</span>
                                            </div>
                                          </td>
                                          <td>{"AED " + listing.price * getCartLength(this.props.list.itemsInCart, listing._id)}</td>
                                          <td>
                                              <a href="#!" onClick={(e) => this.removeCartItem(e, listing._id)}>
                                                <i className="las la-times mr-1"></i>
                                                Remove
                                              </a>
                                          </td>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
                            )
                          })
                        }
                      </div>
                    )
                  }
                  {
                    step === 2 &&
                    (
                      <div className="shipping-step">
                        <h3>Shipping</h3>
                        <p>*indicates required fields.</p>
                        {
                          deliveryItem === 0 &&
                          (
                            <div className="shipping-container bg-white p-3">
                              <h4 className="mb-4">Choose delivery or collection method</h4>
                              <div className="shipping-content d-flex justify-content-between">
                                <div className="shipping-box collect-box border w-50 mr-1 p-3">
                                  <h5 className="mb-4">
                                    <i className="las la-map-marker"></i>
                                    Click & Collect
                                  </h5>
                                  {
                                    listings.length > 0 && listings.map((userListings, sellerIndex) => {
                                      return (
                                        <div
                                          className="collect-item d-flex justify-content-between border-bottom pb-1"
                                          key={sellerIndex}
                                        >
                                          <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="collectCheckbox" />
                                            <label className="custom-control-label" htmlFor="collectCheckbox">
                                              <h6>{userListings.user.details?.company_address}</h6>
                                            <p className="m-0">{userListings.user.details?.company_name}</p>
                                            </label>
                                          </div>
                                          <div className="stock-status text-right text-success">
                                            <span className="d-block w-100">Instock</span>
                                            <i className="las la-check"></i>
                                          </div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <div className="shipping-box address-box border w-50 ml-1 p-3">
                                  <h5 className="mb-2">
                                    <i className="las la-truck"></i>
                                    Delivery
                                  </h5>
                                  <div className="address-list d-flex">
                                  {
                                    addresses.length > 0 && addresses.map((address, addressIndex) => {
                                      return (
                                        <div
                                          className="address-item border p-3 w-50 mr-2"
                                          key={addressIndex}
                                        >
                                          <span className="default-badge badge badge-light">{address.default_address && "Default"}</span>
                                          <div className="address-row">
                                            <div className="custom-control custom-checkbox">
                                              <input type="checkbox" className="custom-control-input" id="deliveryAddress" onClick={(e) => this.setDeliveryAddress(address)} />
                                              <label className="custom-control-label" htmlFor="deliveryAddress">
                                                <p className="m-0"><small>{address.address}</small></p>
                                                <p className="m-0"><small>{address.suburb}</small></p>
                                                <p className="m-0"><small>{address.state} {address.postcode}</small></p>
                                                <p className="m-0"><small>{address.country}</small></p>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="address-row text-right">
                                            <a href="#!">Edit</a>
                                          </div>
                                        </div>
                                      )
                                    })
                                  }			 	
                                  </div>
                                  <div className="address-actions mt-3">
                                    <button 
                                      type="button" 
                                      className="btn btn-outline-primary btn-sm" 
                                      onClick={this.openModal}>
                                      + Add new address
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        {
                          deliveryItem !== 0 &&
                          (
                            <div className="confirm-delivery">
                              <div className="selected-delivery-method bg-white mb-3 p-4">
                                <h4 className="mb-4">Collection or delivery method</h4>
                                <div className="delivery-item d-flex align-items-center">
                                  <div className="delivery-item-content mr-5">
                                    <h4>Delivery to:</h4>
                                    <p className="m-0"><small>{deliveryAddress && deliveryAddress.address}</small></p>
                                    <p className="m-0"><small>{deliveryAddress && deliveryAddress.suburb}</small></p>
                                    <p className="m-0"><small>{deliveryAddress && deliveryAddress.state} {deliveryAddress && deliveryAddress.postcode}</small></p>
                                    <p className="m-0"><small>{deliveryAddress && deliveryAddress.country}</small></p>
                                  </div>
                                  <button type="button" className="btn btn-outline-primary btn-sm h-25" onClick={this.changeDeliveryAddress}>Change</button>
                                </div> 
                              </div>
                              <div className="delivery-options bg-white p-4">
                                <h4>Collection or delivery method</h4>
                                <div className="delivery-option py-3 border-bottom d-flex" onClick={(e) => this.chooseDeliveryItem(1)}>
                                  <div className="delivery-price w-25">$12.99</div>
                                  <div className="delivery-content w-75">
                                    <div className="d-flex justify-content-between">
                                      <label htmlFor="delivery-today-option">
                                      Deliver today
                                      </label>
                                      <input type="radio" name="delivery-option" id="delivery-today-option" className="mr-4" value={deliveryItem} />
                                    </div>
                                  </div>
                                </div>
                                <div className="delivery-option py-3 border-bottom d-flex" onClick={(e) => this.chooseDeliveryItem(2)}>
                                  <div className="delivery-price w-25">$7.99</div>
                                  <div className="delivery-content w-75">
                                    <div className="d-flex justify-content-between">
                                      <label htmlFor="delivery-next-day-option">
                                      Deliver next day
                                      </label>
                                      <input type="radio" name="delivery-option" id="delivery-next-day-option" className="mr-4" value={deliveryItem} />
                                    </div>
                                  </div>
                                </div>
                                <div className="delivery-option py-3 d-flex" onClick={(e) => this.chooseDeliveryItem(3)}>
                                  <div className="delivery-price w-25">$5.99</div>
                                  <div className="delivery-content w-75">
                                    <div className="d-flex justify-content-between">
                                      <label htmlFor="delivery-regular-option">
                                        <h5>Regular Shipping</h5>
                                        <p className="mb-1">Delivered on or before Monday, 8 March 2021</p>
                                        <p className="mb-0"><i className="las la-info-circle mr-1"></i>No shipping on Public holiday</p>
                                      </label>
                                      <input type="radio" name="delivery-option" id="delivery-regular-option" className="mr-4" value={deliveryItem} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>                          
                          )
                        }
                      </div>
                    )
                  }
                  {
                    step === 3 &&
                    (
                      <div className="payment-step">
                        <h3 className="mb-4">Payment</h3>
                        <div className="payment-container bg-white p-3">
                          <h4 className="mb-4">How would you like to pay? </h4>
                          <div className="shipping-content d-flex justify-content-between">
                            <div className="payment-method d-flex flex-column justify-content-between text-center border w-50 mr-1 p-3" onClick={(e) => this.setPayment(0)}>
                              <div className="d-flex align-items-center justify-content-center">                          
                                <img
                                  src="/assets/img/payment-icons/cash-on-delivery.png"
                                  alt="Cash on delivery"
                                  className="img-fluid"
                                />
                              </div>
                              <span>Cash on delivery</span>
                            </div>
                            <div className="payment-method d-flex flex-column justify-content-between text-center border w-50 mr-1 p-3" onClick={this.openModal}>                          
                              <div className="d-flex align-items-center justify-content-center">
                                <img
                                  src="/assets/img/payment-icons/pay-securely-online.png"
                                  alt="Pay securely online"
                                  className="img-fluid"
                                />
                              </div>
                              <span>Pay securely online</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                    {/*<!-- ends: .checkout-table -->*/}
                  </form>
                  {/* <Transection price={this.state.price} /> */}
                </div>
                {/*<!-- ends: .checkout-form -->*/}
              </div>
              {/*<!-- ends: .col-lg-12 -->*/}
              
              {
                step !== 4 && 
                (
                <div className="col-lg-3">
                <div className="order-summary-part mt-5">
                  <h3 className="mb-4">Order Summary</h3>
                  <div className="subtotal-row d-flex justify-content-between mb-3">
                    <span className="font-weight-bold">Subtotal</span>
                    <span>$76.98</span>
                  </div>
                  <div className="discount-row d-flex justify-content-between mb-3">
                    <span className="font-weight-bold">Discount</span>
                    <span className="text-danger">-$36.00</span>	
                  </div>
                  <div className="tax-row d-flex justify-content-between mb-3">
                    <span className="font-weight-bold">Tax</span>
                    <span className="text-secondary">$1.52</span>	
                  </div>
                  <div className="shopping d-flex flex-column pb-3 border-bottom">
                    <span className="font-weight-bold mb-3">Shipping</span>
                    <span>Tommy A Car Parts</span>
                    <span>Tommy B Car Parts</span>
                  </div>
                  <div className="input-group input-group-sm py-3 border-bottom">
                    <input type="text" className="form-control" placeholder="Gift card/Discount code" />
                    <div className="input-group-append">
                      <button className="btn btn-primary btn-sm" type="button">Apply</button>
                    </div>
                  </div>
                  <div className="total-row d-flex justify-content-between h4 py-4">
                    <span className="font-weight-bold">Total</span>
                    <span>{"AED" + totalAmount}</span>
                  </div>
                  {
                    step === 1 && 
                    ( <button className="btn btn-primary w-100 text-center mt-2" type="button" onClick={(e) => this.stepForward(e, 2)}>Enter shipping details</button> )
                  }
                  {
                    step === 2 && 
                    ( <button className="btn btn-primary w-100 text-center mt-2" type="button" onClick={(e) => this.stepForward(e, 3)}>Make a payment</button> )
                  }
                  {
                    step === 3 &&
                    ( <button className="btn btn-primary w-100 text-center mt-2" type="button" onClick={(e) => this.placeOrder(e)}>Place an order</button> )
                  }
                </div>
                <div className="free-shipping-info d-flex justify-content-between p-2">
                  <i className="las la-info-circle pt-2 pr-1"></i>
                  <p className="m-0">
                    Free standard shipping to U.A.E. when you spend over $100.00
                  </p>
                </div>
              </div>
                )
              }
            </div>
            {
              step === 4 && 
              (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="confirmation-step bg-white p-4">
                      <div className="confirmation-message text-center border-bottom">
                        <i className="las la-check-circle text-primary"></i>
                        <h3 className="w-100 text-center">Order placed successfully</h3>
                        <p className="mb-4"><small>We’ll also send a confirmation email once your order has shipped.</small></p>
                      </div>
                      <div className="d-flex order-detail border-bottom p-4">
                        <div className="order-detail-box w-25">
                          <h5>Order Number</h5>
                          <p>700194246651-1</p>
                          <p>700194246651-2</p>
                        </div>
                        <div className="order-detail-box w-25">
                          <h5>Order Date</h5>
                          <p>202-02-24</p>
                        </div>
                        <div className="order-detail-box w-25">
                          <h5>Shipping details Details</h5>
                          <p>Mary McDonald</p>
                          <p>101/90 Mary St, Surry Hills </p>
                          <p>New South Wales 2000</p>
                          <p>Australia </p>
                          <p>Deliver today</p>
                        </div>
                        <div className="order-detail-box w-25">
                          <h5>Payment Type</h5>
                          <p>VISA</p>
                          <p>XXXXXXXXXXXX0206</p>
                        </div>
                      </div>
                      <div className="order-summary border-bottom p-4">
                        <h5 className="mb-4">Order summary</h5>                    
                        <div className="checkout-form">
                          <form action="/">
                            <div className="checkout-table table-responsive order-review-step">
                              <table
                                id="directorist-checkout-table"
                                className="table bg-transparent"
                              >
                                <thead>
                                  <tr>
                                    <th colSpan="6" className="p-0 transparent border-0 pb-2 pl-2">
                                      <i className="las la-store-alt mr-2"></i>
                                      Shop: Tommy A Car Parts 
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {
                                    listings.length > 0 && listings.map((listing, index) => {
                                      totalAmount += listing.price * getCartLength(this.props.list.itemsInCart, listing._id);
                                      if (getCartLength(this.props.list.itemsInCart, listing._id) === 0) return false;
                                      console.log(listing)
                                      return (
                                        <tr key={index}>
                                          <td width="75">
                                            <img src={listing.pic} className="item-image" alt={listing.partName} />
                                          </td>
                                          <td>
                                            <h4>{listing.partName}</h4>
                                            <p className="text-muted"><span>item SKU</span> {listing.partSKU}</p>
                                          </td>
                                          <td>
                                            <div className="d-flex justify-content-between">
                                              <span>
                                                {getCartLength(this.props.list.itemsInCart, listing._id)}
                                              </span>
                                              <span className="text-danger">X {listing.price}</span>
                                            </div>
                                          </td>
                                          <td>{"AED " + listing.price * getCartLength(this.props.list.itemsInCart, listing._id)}</td>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </form>
                          {/* <Transection price={this.state.price} /> */}
                        </div>
                      </div>
                      <div className="order-total-price d-flex justify-content-between p-2">
                        <div className="price-detail w-50">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Subtotal: </h6>
                            <p>$76.98</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Discount: </h6>
                            <p>-$36.00</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Tax: </h6>
                            <p>$1.98</p>
                          </div>
                          <div className="d-flex flex-column">
                            <h6>Shipping: </h6>
                            <div className="d-flex justify-content-between">
                              <p>Tommy A Car Parts</p>
                              <p>$12.99</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Tommy B Car Parts</p>
                              <p>$12.99</p>
                            </div>
                          </div>
                        </div>
                        <div className="total-price w-50 d-flex justify-content-center align-items-center">
                          <span className="h4">Total: $52.98</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>            
              )
            }
           </div>
        </section>
        {/*<!-- ends: .checkout-wrapper -->*/}
        <Modal visible={modalIsOpen} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          {
            step === 2 ?
            ( <AddressModal closeModal={this.closeModal} /> ) :
            ( <PaymentMethodModal closeModal={this.closeModal} />  )
          }
        </Modal>
        <Footer />
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
  return {
    updateCart: (data) => dispatch(UpdateCart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Checkout);
