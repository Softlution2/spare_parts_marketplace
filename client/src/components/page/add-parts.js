import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import InputDropdown from "../content/element/input-dropdown";
import { categories, subCategories } from "../../constants";

const currencies = ["USD", "AUD", "CAD", "RMB", "INR"];

class AddParts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      currency: "AUD",
      quantity: 0,
      pic: null,
      category: null,
      subCategory: null,
      partName: null,
      shortDescription: null,
      partBrand: null,
      partSKU: null,
      description: null,
      submitLoading: false
    };
    this.validator = new SimpleReactValidator();
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleUnitOptionChange = this.handleUnitOptionChange.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleChangeNumeric(name, value) {
    this.setState({[name]: value});
  }

  handleUnitOptionChange(name, value) {
    this.setState({[name]: value});
  }

  openFileDlg(e) {
    e.preventDefault();
    this.upload.click();
  }

  uploadPic(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let pic = Object.assign(file, {
      preview: URL.createObjectURL(file)
    });
    this.setState({pic});
  }

  handleChangeCategory(option) {
    this.setState({category: option.value});
  }

  handleChangeSubCategory(option) {
    this.setState({subCategory: option.value});
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    if (this.validator.allValid()) {
      this.setState({submitLoading: true});
      let formData = new FormData();
      formData.append("price", this.state.price);
      formData.append("currency", this.state.currency);
      formData.append("quantity", this.state.quantity);
      formData.append("pic", this.state.pic);
      formData.append("category", this.state.category);
      formData.append("subCategory", this.state.subCategory);
      formData.append("partName", this.state.partName);
      formData.append("shortDescription", this.state.shortDescription);
      formData.append("partSKU", this.state.partSKU);
      formData.append("partBrand", this.state.partBrand);
      formData.append("description", this.state.description);
      formData.append("user", this.props.login._id);
      axios.post(`/api/listing/new`, formData)
      .then((res) => {
        this.setState({submitLoading: false});
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({submitLoading: false});
        this.props.history.push("/");
        // this.setState({errMsg: err.response.data.message});
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Sell your spare part" />
        <section className="sell-part-wrapper">
          <div className="container">
            <SectionTitle title="Spare Parts Details & Description" />
            <form className="form-vertical">
              <div className="form-group text-center">
                  {
                    this.state.pic && (
                      <img src={this.state.pic.preview} onClick={this.openFileDlg}  width="300" />
                    )
                  }
                  <div className="custom-file-upload">
                    <input
                      id="customUpload"
                      type="file"
                      ref={(ref) => (this.upload = ref)}
                      style={{ display: "none" }}
                      onChange={this.uploadPic}
                    />
                    <label htmlFor="customUpload" className="btn btn-sm btn-secondary mt-3" onClick={this.openFileDlg}>Upload Picture</label>
                  </div>
                  <div className="text-danger">
                    {this.validator.message(
                      "pic",
                      this.state.pic,
                      `required`
                    )}
                  </div>
              </div>

              <div className="form-group row">
                <div className="col-md-6">
                  <label>Category</label>
                  <Select
                    className={`react-select`}
                    classNamePrefix="react-select"
                    name="make"
                    placeholder="Choose..."
                    onChange={(option) => this.handleChangeCategory(option)}
                    options={categories}
                  />
                  <div className="text-danger">
                    {this.validator.message(
                      "category",
                      this.state.category,
                      `required`
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>SubCategory</label>
                  <Select
                    className={`react-select`}
                    classNamePrefix="react-select"
                    name="make"
                    placeholder="Choose..."
                    onChange={(option) => this.handleChangeSubCategory(option)}
                    options={this.state.category && subCategories[this.state.category] ? subCategories[this.state.category] : []}
                  />
                  <div className="text-danger">
                    {this.validator.message(
                      "subCategory",
                      this.state.subCategory,
                      `required`
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Part Name:</label>
                  <input type="text" name="partName" className="form-control" onChange={this.handleInput} />
                  <div className="text-danger">
                    {this.validator.message(
                      "partName",
                      this.state.partName,
                      `required`
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Short Description:</label>
                  <input type="text" name="shortDescription" className="form-control" onChange={this.handleInput} />
                  <div className="text-danger">
                    {this.validator.message(
                      "shortDescription",
                      this.state.shortDescription,
                      `required`
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Part Brand:</label>
                  <input type="text" name="partBrand" className="form-control" onChange={this.handleInput} />
                  <div className="text-danger">
                    {this.validator.message(
                      "partBrand",
                      this.state.partBrand,
                      `required`
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Part SKU:</label>
                  <input type="text" name="partSKU" className="form-control" onChange={this.handleInput} />
                  <div className="text-danger">
                    {this.validator.message(
                      "partSKU",
                      this.state.partSKU,
                      `required`
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Price:</label>
                  <InputDropdown
                    options={currencies}
                    m_name="price"
                    o_name="currency"
                    handleChangeNumeric={this.handleChangeNumeric}
                    handleOptionChange={this.handleUnitOptionChange}
                    defaultOption="AUD"
                    value={this.state.price}
                  />
                  <div className="text-danger">
                    {this.validator.message(
                      "price",
                      this.state.price,
                      `required`
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Quantity Available:</label>
                  <NumberFormat 
                    value={this.state.quantity}
                    className={`form-control`}
                    thousandSeparator={true}
                    onValueChange={(values) => this.setState({quantity: values.floatValue}) }
                  />
                  <div className="text-danger">
                    {this.validator.message(
                      "quantity",
                      this.state.quantity,
                      `required`
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className="form-control" name="description" rows={5} onChange={this.handleInput}></textarea>
                  <div className="text-danger">
                    {this.validator.message(
                      "description",
                      this.state.description,
                      `required`
                    )}
                  </div>
              </div>
              <div className="form-group mt-5 text-center">
                <button
                  className="btn btn-primary" 
                  disabled={this.state.submitLoading === false ? false : true}
                  className="btn btn-primary btn-lg listing_submit_btn"
                  onClick={this.handleSubmit}
                >
                  {this.state.submitLoading && <i className="las la-spinner la-spin mr-2"></i>}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selling: state.selling,
    login: state.login,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
  };
};

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(AddParts);
