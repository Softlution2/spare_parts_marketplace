import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Select from "react-select";
import axios from "axios";
import { withTranslation } from 'react-i18next';

import { SectionTitle } from "./section-title";
import { SetCarDetails } from "../../../Store/action/sellingAction";
import InputDropdown from "./input-dropdown";
import CustomSelectInput from "../../common/CustomSelectInput";
import { cartypes } from "../../../constants";

const currencies = ["USD", "AUD", "CAD", "RMB", "INR"];
const units = ["Kilometers", "Miles"];
const transmissionOptions = [
  { label: "Automatic", value: "Automatic" },
  { label: "Manual", value: "Manual" },
  { label: "Semi Automatic", value: "Semi Automatic" }
];
const optionList = [
  "Air Condition",
  "Backup Camera",
  "Leather Seats",
  "Navigation System",
  "Bluetooth",
  "Sunroof",
  "USB",
  "Third Row Seats",
  "Rear Parking Sensor",
  "Power Windows",
];
const colorList = [
  {value: "Black", label: "Black"},
  {value: "Blue", label: "Blue"},
  {value: "Green", label: "Green"},
  {value: "Orange", label: "Orange"},
  {value: "Pink", label: "Pink"},
  {value: "Purple", label: "Purple"},
  {value: "Red", label: "Red"},
  {value: "Silver", label: "Silver"},
  {value: "White", label: "White"},
  {value: "Yellow", label: "Yellow"},
];

const colorOptionLabel = ({ value, label }) => (
  <div className="d-flex align-items-center">
    <span className="mr-2" style={{ borderRadius: '50%', backgroundColor: value.toLowerCase(), width: '20px', height: '20px' }}>
    </span>
    <div>{label}</div>
  </div>
);

class CarDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      makeList: [],
      modelList: [],
      details: {
        make: null,
        model: null,
        year: null,
        version: null,
        price: null,
        color: null,
        transmission: null,
        mileage: null,
        type: null,
        description: null,
        currency: "AUD",
        unit: "Kilometers",
        tags: [],
        options: [],
      },
      invalidDetails: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.getModelList = this.getModelList.bind(this);
    this.handleUnitOptionChange = this.handleUnitOptionChange.bind(this);
    this.handleChangeTransmission = this.handleChangeTransmission.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);

  }

  componentDidMount() {
    axios
      .get("/api/info/all-makes")
      .then((res) => {
        let makes = res.data.makes;
        let { makeList } = this.state;
        makeList = makes.map((make) => {
          return { ...make, label: make.name, value: make.name };
        });
        this.setState({ makeList });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    let { details } = this.state;
    if (prevProps.validators !== this.props.validators) {
      this.setState({invalidDetails: this.props.validators});
      this._isMounted = true;
    }
    if (prevProps.selling.carDetails !== prevState.details) {
      console.log("The car detail is updated....");
      this._isMounted = true;
      details = {
        ...details,
        ...prevProps.selling.carDetails,
      };
      this.setState({ details });
      this.getModelList(details.make);
      this.props.setCarDetails(details);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getModelList(make) {
    axios
      .get(`/api/info/get-model-by-make?make=${make}`)
      .then((res) => {
        let { modelList } = this.state;
        modelList = res.data.models.map((model) => {
          return { ...model, label: model.name, value: model.name };
        });
        if (this._isMounted) {
          this.setState({ modelList });
        }
      })
      .catch((err) => {});
  }

  handleChangeMake(option) {
    let { details, invalidDetails } = this.state;
    invalidDetails = invalidDetails.filter(e => e !== 'make');
    details["make"] = option.value;
    this.getModelList(option.value);
    this.setState({ details, invalidDetails });
    this.props.setCarDetails(details);
  }

  handleChange(e) {
    e.preventDefault(e);
    let { details, invalidDetails } = this.state;
    invalidDetails = invalidDetails.filter(x => x !== e.target.name);
    details[e.target.name] = e.target.value;
    this.setState({ details, invalidDetails });
  }

  handleChangeNumeric(name, value) {
    let { details, invalidDetails } = this.state;
    invalidDetails = invalidDetails.filter(x => x !== name);
    details[name] = value;
    this.setState({ details, invalidDetails });
  }

  handleUnitOptionChange(name, value) {
    let { details } = this.state;
    details[name] = value;
    this.setState({ details });
  }

  handleChangeTransmission(option) {
    let {details, invalidDetails} = this.state;
    invalidDetails = invalidDetails.filter(e => e !== 'transmission');
    details["transmission"] = option.value;
    this.setState({details, invalidDetails});
    this.props.setCarDetails(details);
  }

  handleChangeTags(options) {
    let {details} = this.state;
    let tags = [];
    options.map((option) => {
      tags.push(option.value);
    });
    details['tags'] = tags;
    this.setState({details});
  }

  handleOptionChange(e) {
    let {details} = this.state;
    console.log("option is changed...");
    if (e.target.checked === true) {
      details.options.push(e.target.value);
    }
    else {
      details.options = details.options.filter(function(value, index, arr) {return value !== e.target.value});
    }
    this.setState({details});
  }

  handleChangeColor(option) {
    let {details, invalidDetails} = this.state;
    invalidDetails = invalidDetails.filter(e => e !== 'color');
    details['color'] = option.value;
    this.setState({details, invalidDetails});
  }

  handleChangeModel(option) {
    let {details, invalidDetails} = this.state;
    invalidDetails = invalidDetails.filter(e => e !== 'model');
    details['model'] = option.value;
    this.setState({details, invalidDetails});
  }

  render() {
    let { makeList, modelList, details, invalidDetails } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <SectionTitle title="Car Details" />
        <form id="atbdp-contact-form" className="form-vertical">
          <h5 className="mb-3">
            {t("sell_car_details_required_info")}
          </h5>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>{t("make")}: </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className={`react-select ${invalidDetails.includes("make") ? 'error' : ''}`}
                classNamePrefix="react-select"
                value={
                  details.make
                    ? { label: details.make, value: details.make }
                    : null
                }
                name="make"
                placeholder="Choose..."
                onChange={(option) => this.handleChangeMake(option)}
                options={makeList}
              />
            </div>
            <div className="col-lg-6">
              <label>{t("model")}: </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className={`react-select ${invalidDetails.includes("model") ? 'error' : ''}`}
                classNamePrefix="react-select"
                value={
                  details.model
                    ? { label: details.model, value: details.model }
                    : null
                }
                name="model"
                placeholder="Choose..."
                onChange={option => this.handleChangeModel(option)}
                options={modelList}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>{t("price")}: </label>
              <InputDropdown
                class={`${invalidDetails.includes("price") ? 'error' : ''}`}
                options={currencies}
                m_name="price"
                o_name="currency"
                handleChangeNumeric={this.handleChangeNumeric}
                handleOptionChange={this.handleUnitOptionChange}
                defaultOption="AUD"
                value={details.price}
              />
            </div>
            <div className="col-lg-6">
              <label>{t("color")}: </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className={`react-select ${invalidDetails.includes("color") ? 'error' : ''}`}
                classNamePrefix="react-select"
                value={
                  details.color
                    ? { label: details.color, value: details.color }
                    : null
                }
                formatOptionLabel={colorOptionLabel}
                name="color"
                placeholder="Choose..."
                onChange={option => this.handleChangeColor(option)}
                options={colorList}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>{t("transmission")}: </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className={`react-select ${invalidDetails.includes("transmission") ? 'error' : ''}`}
                classNamePrefix="react-select"
                value={
                  details.transmission
                    ? { label: details.transmission, value: details.transmission }
                    : null
                }
                name="transmission"
                placeholder="Choose..."
                onChange={(option) => this.handleChangeTransmission(option)}
                options={transmissionOptions}
              />
            </div>
            <div className="col-lg-6">
              <label>{t("mileage")}: </label>
              <InputDropdown
                class={`${invalidDetails.includes("mileage") ? 'error' : ''}`}
                options={units}
                m_name="mileage"
                o_name="unit"
                handleChangeNumeric={this.handleChangeNumeric}
                handleOptionChange={this.handleUnitOptionChange}
                defaultOption="Kilometers"
                value={details.mileage}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>{t("year")}: </label>
              <input
                type="text"
                name="year"
                className={`form-control ${invalidDetails.includes("year") ? 'error' : ''}`}
                placeholder="Year"
                value={details.year || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>{t("description")}: </label>
            <textarea
              className={`form-control ${invalidDetails.includes("description") ? 'error' : ''}`}
              name="description"
              placeholder="Description Text"
              rows={5}
              value={details.description || ""}
              onChange={this.handleChange}
            />
          </div>
          <h5 className="mb-3">
            {t("sell_car_details_optional_info")}
          </h5>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>{t("version")}: </label>
              <input
                type="text"
                name="version"
                className="form-control"
                placeholder="Version"
                value={details.version || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label>{t("type")}: </label>
              <input
                type="text"
                name="type"
                className="form-control"
                placeholder="Type"
                value={details.type || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>{t("tags")}: </label>
            <Select
              className="React"
              classNamePrefix="select"
              name="tags"
              placeholder="Choose..."
              isMulti={true}
              value={details.tags.map((tag) => {return {label:tag, value: tag}} )}
              onChange={(options) => this.handleChangeTags(options)}
              options={cartypes}
            />
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <label>{t("options")}: </label>
            </div>
            {
              optionList.map((option, index) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={index}>
                    <div className="custom-control custom-checkbox checkbox-outline checkbox-outline-primary mb-2">
                      <input type="checkbox" className="custom-control-input" id={`tag${index}`} value={option} onChange={this.handleOptionChange} />
                      <label className="custom-control-label" htmlFor={`tag${index}`}>{option}</label>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selling: state.selling,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setCarDetails: (details) => dispatch(SetCarDetails(details)),
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(CarDetails);
