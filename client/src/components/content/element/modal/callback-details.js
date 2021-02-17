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

class CallbackDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callbackPhone: null,
      callbackName: null,
      typingTimeout: 0,
      phoneValid: false,
    };

    this.validator = new SimpleReactValidator();
    this.handleChangeCallName = this.handleChangeCallName.bind(this);
    this.handleChangeCallPhone = this.handleChangeCallPhone.bind(this);
    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.requestCallback = this.requestCallback.bind(this);
  }

  handleChangeCallName(e) {
    e.preventDefault();
    this.setState({callbackName: e.target.value});
  }

  requestCallback(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post(`/api/listing/add-callback`, {
          name: this.state.callbackName,
          phone: this.state.callbackPhone,
          listing: this.props.listing_id
        })
        .then((res) => {
          toast.success("Thanks, your details has been sent to the seller", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.props.closeModal();
        })
        .catch((err) => {
          console.log(err.response);
          this.props.closeModal();
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleChangeCallPhone(phone) {
    let self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({
      callbackPhone: phone,
      phoneValid: false,
      typingTimeout: setTimeout(function () {
        self.verifyPhoneNumber(phone);
      }, 1000),
    });
  }
  
  verifyPhoneNumber(number) {
    axios
      .get(
        `https://apilayer.net/api/validate?access_key=152e6b0b8550cdddaf5f2ac1435e8cc9&number=${number}`
      )
      .then((res) => {
        this.setState({ phoneValid: res.data.valid });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { callbackPhone, callbackName, phoneValid } = this.state;
    return (
      <Fragment>
        <form style={{padding: '2rem'}}>
          <div className="form-group position-relative">
            <PhoneInput
              placeholder="Enter phone number"
              name="Phone"
              value={callbackPhone || ""}
              onChange={(phone) => this.handleChangeCallPhone(phone)}
            />
            {
              phoneValid && (
                <i className="la la-check text-success" style={{position: "absolute", right: "15px", top: "calc(50% - 7px)"}}></i>
              )
            }
            <div className="text-danger">
              {this.validator.message("phone number", callbackPhone, "required|string")}
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={callbackName || ""}
              onChange={this.handleChangeCallName}
            />
            <div className="text-danger">
              {this.validator.message("name", callbackName, "required|string")}
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-primary" onClick={this.requestCallback} disabled={!phoneValid} >
              Send
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
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(CallbackDetails);
