import React, { Fragment, Component } from "react";
import { withTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

class Finance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        price: 250,
        interestRate: 6,
        period: 48,
        downPayment: 0,
    };
    this.getMonthlyPayment = this.getMonthlyPayment.bind(this);
    this.stateFromInput = this.stateFromInput.bind(this);
    this.getTotalInterest = this.getTotalInterest.bind(this);
  }
  getMonthlyPayment() {
    const i = parseInt(this.state.interestRate) / 12 / 100;
    const price = parseInt(this.state.price) - parseInt(this.state.downPayment);
    const value = ( price / i ) * ( 1 - (1 / (Math.pow(1 + i, parseInt(this.state.period)))) );
    return value.toFixed(2);
  }
  getTotalInterest() {
    const value = parseInt(this.state.period) * this.getMonthlyPayment() - (this.state.price - this.state.downPayment);
    return value.toFixed(2);
  }

  stateFromInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { t } = this.props;
    const monthlyPayment = this.getMonthlyPayment();
    const totalInterest = this.getTotalInterest();
    const totalPayments = (this.getMonthlyPayment() * parseInt(this.state.period)).toFixed();
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Finance" />
        <section className="car-finance-page">
            <div className="container">
                <div className="vehicle-loan-calculator">
                    <h2 className="mb-4 text-center">Loan Calculator</h2>
                    <p className="sub-title mb-5">Use our loan calculator to calculate payments over the life of your loan.
                        Enter your information to see how much your monthly payments could be.
                        You can adjust length of loan, down payment and interest rate to see how those changes raise or lower your payments.
                    </p>
                    <form className="mb-5">
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Price</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="la la-tag"></i>
                                        </span>
                                    </div>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control"
                                        value={this.state.price}
                                        onValueChange={val => this.setState({price: val.floatValue})}
                                    />
                                    
                                    {/* <input type="text" className="form-control" name="price" onChange={this.stateFromInput} value={this.state.price || 0} /> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>Interest Rate</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="la la-percent"></i>
                                        </span>
                                    </div>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control"
                                        value={this.state.interestRate}
                                        onValueChange={val => this.setState({interestRate: val.floatValue})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label>Period (months)</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="la la-calendar"></i></span>
                                    </div>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control"
                                        value={this.state.period}
                                        onValueChange={val => this.setState({period: val.floatValue})}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>Down Payment</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="la la-dollar-sign"></i>
                                        </span>
                                    </div>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control"
                                        value={this.state.downPayment}
                                        onValueChange={val => this.setState({downPayment: val.floatValue})}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="vehicle-loan-calculator-results mb-3">
                        <div className="result-col">
                            <h3>Montly Payment</h3>
                            <h4>{monthlyPayment}</h4>
                        </div>
                        <div className="result-col">
                            <h3>Total Interest</h3>
                            <h4>{totalInterest}</h4>
                        </div>
                        <div className="result-col">
                            <h3>Total Payment</h3>
                            <h4>{totalPayments}</h4>
                        </div>
                    </div>
                    <p className="sub-title">Title and other fees and incentives are not included in this calculation, which is an estimate only.
                        Monthly payment estimates are for informational purpose and do not represent a financing offer from the seller of this vehicle.
                        Other taxes may apply.
                    </p>
                </div>
            </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default withTranslation()(Finance);
