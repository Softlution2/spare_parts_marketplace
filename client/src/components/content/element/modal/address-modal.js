import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';

import SimpleReactValidator from "simple-react-validator";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.address?._id,
      first_name: this.props.address ? this.props.address.first_name : "",
      last_name: this.props.address ? this.props.address.last_name : "",
      address: this.props.address ? this.props.address.address : "",
      suburb: this.props.address ? this.props.address.suburb : "",
      state: this.props.address ? this.props.address.state : "",
      postcode: this.props.address ? this.props.address.postcode : "",
      country: this.props.address ? this.props.address.country : "",
      default_address: this.props.address?.default_address,
      user: this.props.login._id
    };
    
    this.validator = new SimpleReactValidator();
    this.addNewAddress = this.addNewAddress.bind(this);
    this.changeDefaultAddress = this.changeDefaultAddress.bind(this);
  }
  changeInputValue(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  changeDefaultAddress(e) {
    this.setState({[e.target.name]: e.target.checked});
  }
  addNewAddress() {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    this.props.addAddress(this.state)
  }

  render() {
    // const {} = this.state;
    return (
      <Fragment>
        <form style={{padding: '2rem'}}>
          <h3 className="mb-4">Add new address</h3>
          <small className="d-block mb-4">*indicates required fields.</small>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="firstName">First Name*</label>
                <input type="text" className="required form-control" id="firstName" onChange={(e) => this.changeInputValue(e)} value={this.state.first_name} name="first_name" placeholder="First Name" />
                {this.validator.message('first_name', this.state.first_name, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="lastName">Last Name*</label>
                <input type="text" className="required form-control" id="lastName" onChange={(e) => this.changeInputValue(e)} value={this.state.last_name} name="last_name" placeholder="Last Name" />
                {this.validator.message('last_name', this.state.last_name, 'required', { className: 'text-danger' })}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address*</label>
            <input type="text" className="required form-control" id="address" onChange={(e) => this.changeInputValue(e)} value={this.state.address} name="address" placeholder="Address" />
            {this.validator.message('address', this.state.address, 'required', { className: 'text-danger' })}
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="suburb">Suburb*</label>
                <input type="text" className="required form-control" id="suburb" onChange={(e) => this.changeInputValue(e)} value={this.state.suburb} name="suburb" placeholder="Suburb" />
                {this.validator.message('suburb', this.state.suburb, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="state">State*</label>
                <input type="text" className="required form-control" id="state" onChange={(e) => this.changeInputValue(e)} value={this.state.state} name="state" placeholder="State" />
                {this.validator.message('state', this.state.state, 'required', { className: 'text-danger' })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="postcode">Postcode*</label>
                <input type="text" className="required form-control" id="postcode" onChange={(e) => this.changeInputValue(e)} value={this.state.postcode} name="postcode" placeholder="Postcode" />
                {this.validator.message('postcode', this.state.postcode, 'required', { className: 'text-danger' })}
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="country">Country*</label>
                <input type="text" className="required form-control" id="country" onChange={(e) => this.changeInputValue(e)} value={this.state.country} name="country" placeholder="Country" />
                {this.validator.message('country', this.state.country, 'required', { className: 'text-danger' })}
              </div>
            </div>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="required custom-control-input" onChange={this.changeDefaultAddress} checked={this.state.default_address?"checked":""} name="default_address" id="defaultShippingAddress" />
            <label className="custom-control-label" htmlFor="defaultShippingAddress">Use this as the default shipping address</label>
          </div>
          <div className="form-group text-right">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.addNewAddress}
              >
              Save
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(AddressModal);
