import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next'

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
    const { t, make } = this.props;
    const { search } = this.state;
    const makeStr = make ? make.replaceAll("-", " ").toString() : "";
    return (
      <Fragment>
        <div className="directory_content_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div className="search_title_area">
                  {
                    make && (
                      <img src={`/assets/img/make-logos/${make}.png`} alt="" width={100} style={{borderRadius: "15px"}} />
                    )
                  }
                  <h2 className="title">
                    Find {make ? makeStr.charAt(0).toUpperCase() + makeStr.slice(1) : "Spare"} Parts in the UAE
                  </h2>
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
                {
                  !make && (
                    <p className="search-bottom-text">
                      Search by <a href="#!">vehicle make and mode</a>, or by <a href="#!">VIN number</a>
                    </p>
                  )
                }
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
