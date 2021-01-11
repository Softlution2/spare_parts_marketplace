import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next'

import { getCountryCode } from "../../../utils";

const noAction = (e) => e.preventDefault();

class AdvSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    noAction(e);
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { t } = this.props;
    const { search } = this.state;
    return (
      <Fragment>
        <div className="directory_content_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div className="search_title_area">
                  <h2 className="title">{t("home_banner_text")} {getCountryCode().country}</h2>
                </div>
                <form action={`/all-listings`} className="search_form">
                  <input
                    type="text"
                    value={search || ""}
                    name="search"
                    onChange={this.handleChange}
                    placeholder={t("home_search_placeholder")}
                  />
                  <div className="atbd_seach_button_wrapper">
                    <button
                      type="submit"
                      className="btn btn-md btn-primary btn_search"
                    >
                      <i className="las la-search" />
                      {t("home_search_button_text")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(AdvSearch);
