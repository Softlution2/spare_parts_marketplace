import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

import { SectionTitle } from "../content/element/section-title";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import Footer from "../layout/footer";
import { PageBanner } from "../content/element/page-banner";
import InputDropdown from "../content/element/input-dropdown";
import { categories, subCategories, countrList } from "../../constants";

class EditParts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeList: [],
      modelList: [],
      price: 0,
      currency: "AED",
      quantity: 0,
      pic: null,
      category: null,
      subCategory: null,
      partName: null,
      partHSCode: null,
      partBrand: null,
      partSKU: null,
      type: null,
      fittingPosition: null,
      description: null,
      submitLoading: false,
      makes: [],
      models: [],
      heightDimension: 0,
      widthDimension: 0,
      depthDimension: 0,
      weight: 0,
      countryOrigin: null,
      clickCollect: false,
      delivery: false,
    };
    this.validator = new SimpleReactValidator();
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleUnitOptionChange = this.handleUnitOptionChange.bind(this);
    this.openFileDlg = this.openFileDlg.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.getModelList = this.getModelList.bind(this);
  }

  componentDidMount() {
    axios.get("/api/listing/get-by-id?id=" + this.props.match.params.id)
    .then((res) => {
      let makeList = res.data.makeList;
      makeList = makeList.map((data) => {
        return { label: data.name, value: data.id_car_make, _id: data._id }
      });
      let modelList = res.data.modelList;
      modelList = modelList.map((data) => {
        return { label: data.name, value: data.id_car_model, _id: data._id }
      });
      this.setState({...res.data, makeList, modelList});
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getModelList(makes) {
    axios.post("/api/listing/get-models", { makes })
      .then((res) => {
        const list = res.data.map((data) => {
          return { label: data.name, value: data.id_car_model, _id: data._id }
        });
        this.setState({modelList: list});
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  handleChangeMake(options) {
    if (!options) { this.setState({makes: null}); return; }
    const make_ids = options.map((o) => {
      return o.value;
    });
    const makes = options.map((o) => o._id);
    this.setState({makes});
    this.getModelList(make_ids);
  }

  handleChangeModel(options) {
    if (!options) { this.setState({models: null}); return; }
    const models = options.map((o) => o._id);
    this.setState({models});
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

  handleChangeSelect(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleChangeCheckbox(e) {
    this.setState({[e.target.name]: e.target.checked});
  }
  
  handleChangeSubCategory(option) {
    this.setState({subCategory: option.value});
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleDescriptionChange(val) {
    this.setState({
      description: val,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setState({submitLoading: true});
      let formData = new FormData();
      formData.append("list_id", this.props.match.params.id);
      formData.append("price", this.state.price);
      formData.append("currency", this.state.currency);
      formData.append("quantity", this.state.quantity);
      formData.append("pic", this.state.pic);
      formData.append("category", this.state.category);
      formData.append("subCategory", this.state.subCategory);
      formData.append("partName", this.state.partName);
      formData.append("partHSCode", this.state.partHSCode);
      formData.append("partSKU", this.state.partSKU);
      formData.append("partBrand", this.state.partBrand);
      formData.append("type", this.state.type);
      formData.append("description", this.state.description);
      formData.append("fittingPosition", this.state.fittingPosition);
      formData.append("makes", JSON.stringify(this.state.makes));
      formData.append("models", JSON.stringify(this.state.models));
      formData.append("heightDimension", parseFloat(this.state.heightDimension));
      formData.append("widthDimension", parseFloat(this.state.widthDimension));
      formData.append("depthDimension", parseFloat(this.state.depthDimension));
      formData.append("weight", parseFloat(this.state.weight));
      formData.append("countryOrigin", this.state.countryOrigin);
      formData.append("clickCollect", this.state.clickCollect);
      formData.append("delivery", this.state.delivery);
      
      formData.append("user", this.props.login._id);
      axios.post(`/api/listing/update`, formData)
      .then((res) => {
        this.setState({submitLoading: false});
        // this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({submitLoading: false});
        // this.props.history.push("/");
        // this.setState({errMsg: err.response.data.message});
      });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <PageBanner title="Sell your spare part" />
        <section className="sell-part-wrapper section-bg">
          <div className="container">
            <SectionTitle title="Spare Parts Details & Description" />
            
            <div className="atbd_content_module">
              <div className="atbd_content_module__tittle_area">
                <div className="atbd_area_title">
                  <h4><span className="la la-user"></span>General Information</h4>
                </div>
              </div>
              <div className="atbdb_content_module_contents">
                <form className="form-vertical">
                  <div className="form-group text-center">
                      {
                        this.state.pic && (
                          <img src={typeof this.state.pic === "string" ? this.state.pic : this.state.pic.preview} onClick={this.openFileDlg}  width="300" alt="pic" />
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
                        <label htmlFor="customUpload" className="btn btn-sm btn-primary mt-3" onClick={this.openFileDlg}>Upload Picture</label>
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
                      <label>Part Name:</label>
                      <input type="text" name="partName" className="form-control" onChange={this.handleInput} value={this.state.partName || ""} />
                      <div className="text-danger">
                        {this.validator.message(
                          "partName",
                          this.state.partName,
                          `required`
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Part Brand:</label>
                      <input type="text" name="partBrand" className="form-control" onChange={this.handleInput} value={this.state.partBrand || ""} />
                      <div className="text-danger">
                        {this.validator.message(
                          "partBrand",
                          this.state.partBrand,
                          `required`
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Category</label>
                      <select className="form-control" name="category" id="category" onChange={this.handleChangeSelect} value={this.state.category || ""} >
                        <option value="" disabled>Select Category</option>
                        {
                          categories.map((cat, index) => {
                            return (
                              <option value={cat.value} key={index}>
                                {cat.value}
                              </option>
                            )
                          })
                        }
                      </select>
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
                        value={this.state.category ? subCategories[this.state.category].find(x => x.value === this.state.subCategory) : null}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Part HS Code:</label>
                      <input type="text" name="partHSCode" className="form-control" onChange={this.handleInput} value={this.state.partHSCode || ""} />
                      <div className="text-danger">
                        {this.validator.message(
                          "partHSCode",
                          this.state.partHSCode,
                          `required`
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Part SKU:</label>
                      <input type="text" name="partSKU" className="form-control" onChange={this.handleInput} value={this.state.partSKU || ""} />
                      <div className="text-danger">
                        {this.validator.message(
                          "partSKU",
                          this.state.partSKU,
                          `required`
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <select name="type" className="form-control" onChange={this.handleChangeSelect} value={this.state.type || ""}>
                      <option value="" disabled>Select Type</option>
                      <option value="Genuine">Genuine</option>
                      <option value="Alternative">Alternative</option>
                    </select>
                    <div className="text-danger">
                      {this.validator.message(
                        "type",
                        this.state.type,
                        `required`
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <ReactQuill theme="snow" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    <div className="text-danger">
                      {this.validator.message(
                        "description",
                        this.state.description,
                        `required`
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="atbd_content_module">
              <div className="atbd_content_module__tittle_area">
                <div className="atbd_area_title">
                  <h4><span className="la la-user"></span>Pricing & Availability (required)</h4>
                </div>
              </div>
              <div className="atbdb_content_module_contents">
                <form className="form-vertical">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Price:</label>
                      <InputDropdown
                        m_name="price"
                        o_name="currency"
                        handleChangeNumeric={this.handleChangeNumeric}
                        handleOptionChange={this.handleUnitOptionChange}
                        defaultOption="AED"
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
                </form>
              </div>
            </div>
            <div className="atbd_content_module">
              <div className="atbd_content_module__tittle_area">
                <div className="atbd_area_title">
                  <h4><span className="la la-user"></span>Fitting & Compatibility (optional)</h4>
                </div>
              </div>
              <div className="atbdb_content_module_contents">
                <form className="form-vertical">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Make:</label>
                      <Select
                        className={`react-select`}
                        classNamePrefix="react-select"
                        placeholder="Choose..."
                        name="make"
                        onChange={this.handleChangeMake}
                        options={this.state.makeList}
                        isMulti={true}
                        value={this.state.makeList ? this.state.makeList.filter(x => this.state.makes.includes(x._id)) : null}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Model:</label>
                      <Select
                        className={`react-select`}
                        classNamePrefix="react-select"
                        placeholder="Choose..."
                        name="model"
                        onChange={this.handleChangeModel}
                        options={this.state.modelList}
                        isMulti={true}
                        value={this.state.modelList ? this.state.modelList.filter(x => this.state.models.includes(x._id)) : null}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Fitting Position:</label>
                    <select name="fittingPosition" className="form-control" value={this.state.fittingPosition || ""} onChange={this.handleChangeSelect}>
                      <option value="" disabled>Select Fitting Position</option>
                      <option value="Front">Front</option>
                      <option value="Rear">Rear</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="atbd_content_module">
              <div className="atbd_content_module__tittle_area">
                <div className="atbd_area_title">
                  <h4><span className="la la-user"></span>Details (optional)</h4>
                </div>
              </div>
              <div className="atbdb_content_module_contents">
                <form className="form-vertical">
                  <div className="form-group">
                    <label>Country of Origin:</label>
                    <select className="form-control" name="country" value={this.state.country || ""} onChange={this.handleChangeSelect}>
                      <option value="" disabled>Select Country of Origin</option>
                      {
                        countrList.map((country, index) => {
                          return (
                            <option key={index} value={country.label}>{country.label}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Height Dimension:</label>
                      <InputDropdown
                        m_name="heightDimension"
                        o_name="unit"
                        handleChangeNumeric={this.handleChangeNumeric}
                        handleOptionChange={this.handleUnitOptionChange}
                        defaultOption="MM"
                        value={this.state.heightDimension}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Width Dimension:</label>
                      <InputDropdown
                        m_name="widthDimension"
                        o_name="unit"
                        handleChangeNumeric={this.handleChangeNumeric}
                        handleOptionChange={this.handleUnitOptionChange}
                        defaultOption="MM"
                        value={this.state.widthDimension}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label>Depth Dimension:</label>
                      <InputDropdown
                        m_name="depthDimension"
                        o_name="unit"
                        handleChangeNumeric={this.handleChangeNumeric}
                        handleOptionChange={this.handleUnitOptionChange}
                        defaultOption="MM"
                        value={this.state.depthDimension}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Weight:</label>
                      <InputDropdown
                        m_name="weight"
                        o_name="unit"
                        handleChangeNumeric={this.handleChangeNumeric}
                        handleOptionChange={this.handleUnitOptionChange}
                        defaultOption="Grams"
                        value={this.state.weight}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="atbd_content_module">
              <div className="atbd_content_module__tittle_area">
                <div className="atbd_area_title">
                  <h4><span className="la la-shopping-cart"></span>Shipping Options</h4>
                </div>
              </div>
              <div className="atbdb_content_module_contents">
                <form className="form-vertical">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <div className="custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="clickCollect"
                          value={this.state.clickCollect}
                          checked={this.state.clickCollect}
                          id="clickCollect"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label
                          htmlFor="clickCollect"
                          className="not_empty custom-control-label"
                        >
                          Click & Collect
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="custom-control custom-checkbox checkbox-outline checkbox-outline-primary">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          name="delivery"
                          value={this.state.delivery}
                          checked={this.state.delivery}
                          id="delivery"
                          onChange={this.handleChangeCheckbox}
                        />
                        <label
                          htmlFor="delivery"
                          className="not_empty custom-control-label"
                        >
                          Delivery
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-5 text-center">
                    <button
                      disabled={this.state.submitLoading === false ? false : true}
                      className="btn btn-primary btn-lg listing_submit_btn"
                      onClick={this.handleSubmit}
                    >
                      {this.state.submitLoading && <i className="las la-spinner la-spin mr-2"></i>}
                      Update your listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProp))(EditParts);
