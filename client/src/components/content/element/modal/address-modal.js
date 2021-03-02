import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {} = this.state;
    return (
      <Fragment>
        <form style={{padding: '2rem'}}>
          <h3 className="mb-4">Add new address</h3>
          <small className="d-block mb-4">*indicates required fields.</small>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label for="firstName">First Name*</label>
                <input type="text" className="form-control" id="firstName" placeholder="First Name" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label for="lastName">Last Name*</label>
                <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label for="address">Address*</label>
            <input type="text" className="form-control" id="address" placeholder="Address" />
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label for="suburb">Suburb*</label>
                <input type="text" className="form-control" id="suburb" placeholder="Suburb" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label for="state">State*</label>
                <input type="text" className="form-control" id="state" placeholder="State" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label for="postcode">Postcode*</label>
                <input type="text" className="form-control" id="postcode" placeholder="Postcode" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label for="country">Country</label>
                <input type="text" className="form-control" id="country" placeholder="Country" />
              </div>
            </div>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="defaultShippingAddress" />
            <label className="custom-control-label" for="defaultShippingAddress">Use this as the default shipping address</label>
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary" >
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
