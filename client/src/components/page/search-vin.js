import React, { Fragment, Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import Select from "react-select";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import { SetListings } from "../../Store/action/listingActions";

class SearchVin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makes: [],
      models: [],
      engines: [],
      selectedMake: null,
      selectedModel: null,
      selectedEngine: null,
      isLoading: false,
      vinCode: "",
      carIdentified: false,
      makeFromVIN: null,
      modelFromVIN: null,
      engineFromVIN: null
    };
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeEngine = this.handleChangeEngine.bind(this);
    this.showCars = this.showCars.bind(this);
    this.handleChangeVINCode = this.handleChangeVINCode.bind(this);
    this.getVehiclesByVIN = this.getVehiclesByVIN.bind(this);
    this.showSpareParts = this.showSpareParts.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/api/info/get-manufacturers")
      .then((res) => {
        const makes = res.data.map((d) => {
          return { label: d.manuName, value: d.manuId, ...d };
        });
        this.setState({ makes, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err.response.data);
      });
  }

  handleChangeVINCode(e) {
    this.setState({ vinCode: e.target.value });
  }

  handleChangeMake(option) {
    this.setState({ selectedMake: option, isLoading: true });
    axios
      .get("/api/info/get-models?manuId=" + option.value)
      .then((res) => {
        const models = res.data.map((d) => {
          return { label: d.modelname, value: d.modelId, ...d };
        });
        this.setState({ models, isLoading: false });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ isLoading: false });
      });
  }

  handleChangeModel(option) {
    const { selectedMake } = this.state;
    this.setState({ selectedModel: option, isLoading: true });
    axios
      .get(
        `/api/info/get-engines?manuId=${selectedMake.value}&modId=${option.value}`
      )
      .then((res) => {
        const engines = res.data.map((d) => {
          return { label: d.carName, value: d.carId, ...d };
        });
        this.setState({ engines, isLoading: false });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ isLoading: false });
      });
  }

  handleChangeEngine(option) {
    this.setState({ selectedEngine: option });
  }

  showCars(e) {
    e.preventDefault();
    axios
      .get(`/api/info/get-articles?carId=${this.state.selectedEngine.value}`)
      .then((res) => {
        console.log(res.data)
        const newListings = res.data.map((d) => {
          return {
            partName: `${d.mfrName} ${d.genericArticles[0].genericArticleDescription}`,
            partSKU: "",
            date: new Date(),
            price: 0,
            _id: d.mfrId,
            pic: d.images[0]?.imageURL800,
          };
        });
        this.props.setListings(newListings);
        this.props.history.push("/all-listings?api=true");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showSpareParts() {
    axios
      .get(`/api/info/get-articles?carId=${this.state.engineFromVIN.carId}`)
      .then((res) => {
        const newListings = res.data.map((d) => {
          return {
            partName: `${d.mfrName} ${d.genericArticles[0].genericArticleDescription}`,
            partSKU: "",
            date: new Date(),
            price: 0,
            _id: d.mfrId,
            pic: d.images[0].imageURL800,
          };
        });
        this.props.setListings(newListings);
        this.props.history.push("/all-listings?api=true");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  getVehiclesByVIN() {    
    this.setState({ isLoading: true });
    axios
      .get(`/api/info/get-vehicles-by-vin?vinCode=${this.state.vinCode}`)
      .then((res) => {
        this.setState({ carIdentified: true });
        this.setState({ makeFromVIN: res.data.matchingManufacturers.array[0] });
        this.setState({ modelFromVIN: res.data.matchingModels.array[0] });
        this.setState({ engineFromVIN: res.data.matchingVehicles.array[0] });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err.response.data);
      });
  }

  render() {
    const { makes, models, engines, isLoading, makeFromVIN, modelFromVIN, engineFromVIN, carIdentified } = this.state;
    return (
      <Fragment>
        <LoadingOverlay active={isLoading} spinner text={`Loading...`}>
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
                      Vehicle VIN is the most reliable identifier. If you are
                      looking for a Japanese car, enter FRAME
                    </p>
                    <div className="vin-search-wrapper">
                      <i className="la la-search"></i>
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        autoComplete="off"
                        placeholder="VIN or FRAME"
                        onChange={this.handleChangeVINCode}
                      />
                    </div>
                    <p className="ex-text">
                      For example: VIN XW8AN2NE3JH035743 or FRAME KZN185-9023353
                    </p>
                    <button type="button" className="btn btn-block btn-primary" onClick={this.getVehiclesByVIN}>Find Car with VIN</button>
                    {
                      carIdentified && 
                      (
                        <div className="car-identified-wrap">
                          <div className="p-3 bg-success w-100 text-light text-center h2 my-4 border-top">
                            <i className="las la-check-square mr-1"></i>
                            Car identified!
                          </div>
                          <div className="row">
                            <div className="col-lg-3 mb-4">
                              <span className="mr-2">Make:</span>
                            </div>
                            <div className="col-lg-9 mb-4">
                              <span className="h2">{makeFromVIN?.manuName}</span>
                            </div>
                            <div className="col-lg-3 mb-4">
                              <span className="mr-2">Model:</span>
                            </div>
                            <div className="col-lg-9 mb-4">
                              <span className="h2">{modelFromVIN?.modelName}</span>
                            </div>
                            <div className="col-lg-3 mb-4">
                              <span className="mr-2">Engine:</span>
                            </div>
                            <div className="col-lg-9 mb-4">
                              <span className="h2">{engineFromVIN?.carName}</span>
                            </div>
                          </div>
                          <button type="button" className="btn btn-block btn-primary" onClick={this.showSpareParts}>Show Spare Parts</button>
                        </div>
                      )
                    }
                  </section>
                  <div className="separator-line">
                    <span>or</span>
                  </div>
                  <section className="search-vin-col">
                    <h2>Find car parts for your car</h2>
                    <p>
                      If you do not have or can't find the VIN number, please fill the
                      details below
                    </p>
                    <form className="form-horizontal">
                      <div className="form-group row">
                        <label className="control-label col-sm-2">Make:</label>
                        <div className="col-sm-10">
                          <Select
                            className={`react-select`}
                            classNamePrefix="react-select"
                            placeholder="Choose..."
                            name="make"
                            onChange={this.handleChangeMake}
                            options={makes}
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
                            onChange={this.handleChangeModel}
                            options={models}
                            // isMulti={true}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="control-label col-sm-2">
                          Engine:
                        </label>
                        <div className="col-sm-10">
                          <Select
                            className={`react-select`}
                            classNamePrefix="react-select"
                            placeholder="Choose..."
                            name="engine"
                            onChange={this.handleChangeEngine}
                            options={engines}
                            // isMulti={true}
                          />
                        </div>
                      </div>
                    </form>
                    <fieldset>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={this.showCars}
                        style={{fontSize: '1rem'}}
                      >
                        Show Spare Parts
                      </button>
                    </fieldset>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </LoadingOverlay>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProp = (dispatch) => {
  return {
    setListings: (data) => dispatch(SetListings(data)),
  };
};
export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProp)
)(SearchVin);
