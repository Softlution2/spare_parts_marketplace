import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import equal from "fast-deep-equal";

import { UpdateCart } from "../../../Store/action/listingActions";
import { getCartLength } from "../../../utils";

class ListingStickyFooter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      qty: 0,
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps) {
    if (this.props.listing && !equal(prevProps.listing, this.props.listing)) {
      this.setState({qty: getCartLength(this.props.list.itemsInCart, this.props.listing._id), listing: this.props.listing})
    }
  }

  increment(e) {
    e.preventDefault();
    this.setState({qty: this.state.qty + 1});
  }

  decrement(e) {
    e.preventDefault();
    if (this.state.qty >= 1) {
      this.setState({qty: this.state.qty - 1});
    }
  }

  addToCart(e) {
    e.preventDefault();
    const { listing, qty } = this.state;
    let items = this.props.list.itemsInCart;
    items = items.filter((e) => e !== listing._id);
    for (let i = 0 ; i < qty ; i ++) items.push(listing._id);
    this.props.updateCart(items);
  }
  
  render() {
    const { listing } = this.props;
    if (!listing) return (<></>)
    return (
      <div className="sticky-addtocart">
        <div className="left-content">
          <div className="listing-name ellipsis" style={{overflowWrap: "break-word"}}>
            {listing.partName} - {listing.partSKU}
          </div>
          <div className="listing-price sticky-price">
            AED {listing.price}
          </div>
        </div>
        <div className="right-content">
          <div className="qty-controller">
            <button className="qty-btn btn" onClick={this.increment}>+</button>
            <input type="text" className="form-control qty-value" readOnly value={this.state.qty} />
            <button className="qty-btn btn" onClick={this.decrement}>-</button>
          </div>
          <button className="btn btn-block btn-danger" onClick={this.addToCart}>
            <i className="la la-shopping-cart"></i>
            Add To Cart
          </button>
        </div>
      </div>
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
    updateCart: (data) => dispatch(UpdateCart(data)),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(ListingStickyFooter);
