import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';

import SimpleReactValidator from "simple-react-validator";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PaymentMethodModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_name: ''
    };
    this.validator = new SimpleReactValidator();
    this.saveNewPayment = this.saveNewPayment.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
  }
  setPaymentMethod(paymentMethod) {
    this.setState({card_name: paymentMethod})
  }
  changeInputValue(e) {
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }
  saveNewPayment() {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    let payment = {
      card_name: this.state.card_name,
      card_number: this.state.card_number,
      expired_month: this.state.expired_month,
      expired_year: this.state.expired_year,
      security_code: this.state.security_code,
      user: this.props.login._id
    };
    this.props.savePayment(payment)
  }

  render() {
    const { card_name } = this.state;
    return (
      <Fragment>
        <form style={{padding: '2rem'}}>
          <h3 className="mb-4">Pay securely online</h3>
          <small className="d-block mb-4">*indicates required fields.</small>
          <div className="payment-methods d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-outline-light btn-sm" onClick={(e) => this.setPaymentMethod('MasterCard')}>
              <img src="assets/img/payment-icons/master-card.png" alt="MasterCard" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={(e) => this.setPaymentMethod('American Express Card')}>
              <img src="assets/img/payment-icons/american-express-card.png" alt="American Express Card" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={(e) => this.setPaymentMethod('Diners Club International Card')}>
              <img src="assets/img/payment-icons/diners-club-international-card.png" alt="Diners Club International Card" height="24" />
            </button>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={(e) => this.setPaymentMethod('Visa Card')}>
              <img src="assets/img/payment-icons/visa-card.png" alt="Visa Card" height="24" />
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="nameOnCard">Name on card*</label>
            <input type="text" className="form-control" id="nameOnCard" placeholder="Name on card" value={card_name} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="creditCardNumber">Debit/Credit card number*</label>
            <input type="text" className="form-control" id="creditCardNumber" name="card_number" placeholder="Debit/Credit card number" onChange={this.changeInputValue} />
            {this.validator.message('card_number', this.state.card_number, 'required|card_num', { className: 'text-danger' })}
          </div>
          <div className="row">
            <div className="col">
              <label>Expiry date*</label>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input type="text" className="form-control" id="expiredMonth" name="expired_month" placeholder="Month" onChange={this.changeInputValue} />
                    {this.validator.message('expired_month', this.state.expired_month, 'required|integer', { className: 'text-danger' })}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input type="text" className="form-control" id="expiredYear" name="expired_year" placeholder="Year" onChange={this.changeInputValue} />
                    {this.validator.message('expired_year', this.state.expired_year, 'required|integer', { className: 'text-danger' })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="securityCode">Security code*</label>
                <input type="text" className="form-control" id="securityCode" name="security_code" placeholder="Security Code" onChange={this.changeInputValue} />
                {this.validator.message('security_code', this.state.security_code, 'required|integer', { className: 'text-danger' })}
              </div>
            </div>
          </div>
          <div className="form-group text-right">
            <button className="btn btn-primary" type="button" onClick={this.saveNewPayment} >
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
