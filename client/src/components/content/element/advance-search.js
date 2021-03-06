import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

const noAction = (e) => e.preventDefault();

class AdvSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    noAction(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { t } = this.props;
    const { search } = this.state;
    return (
      <Fragment>
        <div className="directory_content_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 d-none d-lg-block">
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
                      className="btn btn-md btn-primary btn_search d-flex p-2"
                    >
                      <i className="las la-search" />
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
  return {};
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(AdvSearch);
