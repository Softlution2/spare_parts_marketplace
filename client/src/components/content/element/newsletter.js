import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

class Newsletter extends Component {

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
          <form>
            <div className="email-input">
              <input type="text" className="form-control" placeholder="Your email address" />
            </div>
            <button type="submit" className="btn btn-primary">Ok</button>
          </form>
          <p>
            By subscribing here you agree to receive our promotional offers.
          </p>
          <p>
            Please verify our <NavLink to="/privacy">privacy policy terms and conditions</NavLink>
          </p>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation()(Newsletter);