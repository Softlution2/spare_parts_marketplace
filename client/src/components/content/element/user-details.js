import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { SectionTitle } from "./section-title";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { withTranslation } from 'react-i18next';

import { SetUserDetails } from "../../../Store/action/sellingAction";
import Authentication from "../../container/authentication/index";

import equal from 'fast-deep-equal'

class UserDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      location: null,
      phone: null,
    };
    // this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let { selling } = this.props;
    this.setState({...selling.userDetails})
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.selling.userDetails, this.props.selling.userDetails)) {
      console.log("The user detail is updated....");
      this.setState({ ...this.props.selling.userDetails });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(e) {
    e.preventDefault();
    let details = this.state;
    details[e.target.name] = e.target.value;
    this.setState({...details});
    this.props.setUserDetails(details);
  }

  // handleChangePhone(phone) {
  //   let details = this.state;
  //   details.phone[0] = phone;
  //   this.setState({...details});
  //   this.props.setUserDetails(details);
  // }

  render() {
    let { name, location, phone } = this.state;
    let { login } = this.props;
    const { t } = this.props;
    return (
      <Fragment>
        <SectionTitle title="User Details" />
        {
          !login ? (
            <Fragment>
              <div className="alert alert-danger" role="alert">
                {t("auth_require_login")}
              </div>
              <Authentication />
            </Fragment>
          ) : (
            <form id="user-details-form" className="form-vertical">
              <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Name" value={name || ""} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <input type="text" name="location" className="form-control" placeholder="Location" value={location || ""} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <PhoneInput
                  placeholder="Enter phone number"
                  name="Phone"
                  value={phone || ""}
                  // onChange={(phone) => this.handleChangePhone(phone)}
                />
              </div>
            </form>
          )
        }
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    selling: state.selling
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setUserDetails: (details) => dispatch(SetUserDetails(details)),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(UserDetails);