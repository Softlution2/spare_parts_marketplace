import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PaymentMethodModal extends Component {
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
          <h3 className="mb-4">Pay securely online</h3>
          <small className="d-block mb-4">*indicates required fields.</small>
          <div className="payment-methods d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-outline-light btn-sm">
              <img src="assets/img/payment-icons/master-card.png" alt="MasterCard" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm">
              <img src="assets/img/payment-icons/american-express-card.png" alt="American Express Card" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm">
              <img src="assets/img/payment-icons/diners-club-international-card.png" alt="Diners Club International Card" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm">
              <img src="assets/img/payment-icons/visa-card.png" alt="Visa Card" height="24" />
            </button>
          </div>
          <div className="form-group">
            <label for="nameOnCard">Name on card*</label>
            <input type="text" className="form-control" id="nameOnCard" placeholder="Name on card" />
          </div>
          <div className="form-group">
            <label for="creditCardNumber">Debit/Credit card number*</label>
            <input type="text" className="form-control" id="creditCardNumber" placeholder="Debit/Credit card number" />
          </div>
          <div className="row">
            <div className="col">
              <label>Expiry date*</label>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input type="text" className="form-control" id="expiredMonth" placeholder="Month" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input type="text" className="form-control" id="expiredYear" placeholder="Year" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label for="securityCode">Security code*</label>
                <input type="text" className="form-control" id="securityCode" placeholder="Security Code" />
              </div>
            </div>
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
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(PaymentMethodModal);
