import React, { Fragment, Component } from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { compose } from "redux";
import Select from "react-select";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";

class SearchVin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Parts Search Vin" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="searh-vin-page">
                <section className="search-vin-col">
                  <h2>Find the model by VIN number</h2>
                  <p>
                    Vehicle VIN is the most reliable identifier. If you are looking for a Japanese car, enter FRAME
                  </p>
                  <div className="vin-search-wrapper">
                    <i className="la la-search"></i>
                    <input type="text" name="search" className="form-control" autoComplete="off" placeholder="VIN or FRAME" />
                  </div>
                  <p className="ex-text">For example: VIN XW8AN2NE3JH035743 or FRAME KZN185-9023353</p>
                </section>
                <div className="separator-line">
                  <span>or</span>
                </div>
                <section className="search-vin-col">
                  <h2>Select model by parameters</h2>
                  <p>
                  If you do not remember the VIN number, then fill in the parameters below
                  </p>
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <label className="control-label col-sm-2">Brand:</label>
                      <div className="col-sm-10">
                        <Select
                          className={`react-select`}
                          classNamePrefix="react-select"
                          placeholder="Choose..."
                          name="make"
                          // onChange={this.handleChangeMake}
                          options={[]}
                          // isMulti={true}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="control-label col-sm-2">Model:</label>
                      <div className="col-sm-10">
                        <Select
                          className={`react-select`}
                          classNamePrefix="react-select"
                          placeholder="Choose..."
                          name="model"
                          // onChange={this.handleChangeMake}
                          options={[]}
                          // isMulti={true}
                        />
                      </div>
                    </div>
                  </form>
                  <fieldset>
                    <button className="btn btn-primary btn-block">Show Cars</button>
                  </fieldset>
                </section>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
  };
};
export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(SearchVin);
